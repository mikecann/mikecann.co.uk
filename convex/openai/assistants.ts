import { v } from "convex/values";
import { internalAction, internalMutation } from "../_generated/server";
import OpenAI from "openai";
import { ensure } from "../../essentials/misc/ensure";
import { getThreadForUser } from "../threads";
import { api, internal } from "../_generated/api";
import { Signal } from "../../essentials/Signal";
import { Annotation } from "../schema";
import { isNotNullOrUndefined } from "../../essentials/misc/filter";

export const addUserMessageAndRequestAnswer = internalAction({
  args: {
    userMessageText: v.string(),
    userId: v.id("users"),
    assistantMessageId: v.id("messages"),
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: ensure(
        process.env.OPEN_AI_API_KEY,
        `Missing env OPEN_AI_API_KEY, have you added it to the Convex environment?`
      ),
    });

    const assistantId = ensure(
      process.env.OPENAI_MIKEBOT_ASSISTANT_ID,
      `Missing env OPENAI_MIKEBOT_ASSISTANT_ID, have you added it to the Convex environment?`
    );

    // Get the thread
    const thread = await ctx.runQuery(api.threads.getThreadForUser, {
      threadId: args.threadId,
      userId: args.userId,
    });

    // If the openAI thread id is not set, we need to create a new thread
    if (!thread.openAIThreadId) {
      const openAIThreadId = await openai.beta.threads.create();
      await ctx.runMutation(internal.threads.setOpenAIThreadId, {
        threadId: thread._id,
        openAIThreadId: openAIThreadId.id,
      });
      thread.openAIThreadId = openAIThreadId.id;
    }

    // Lets insert the user's message into the thread
    const userMessage = await openai.beta.threads.messages.create(thread.openAIThreadId, {
      role: "user",
      content: args.userMessageText,
    });

    // And now update the message with the openai id
    await ctx.runMutation(internal.messages.setOpenAIMessageId, {
      messageId: args.assistantMessageId,
      openAIMessageId: userMessage.id,
    });

    let updateTimeout: NodeJS.Timeout | null = null;
    let latestSnapshot: OpenAI.Beta.Threads.Messages.Text | null = null;
    const onTimeoutFinished = new Signal();

    const updateMessage = async (snapshot: OpenAI.Beta.Threads.Messages.Text) => {
      latestSnapshot = snapshot;
      if (updateTimeout) return;

      updateTimeout = setTimeout(async () => {
        if (!latestSnapshot) return;
        try {
          await ctx.runMutation(internal.messages.updateMessageTextFromAssistant, {
            messageId: args.assistantMessageId,
            text: latestSnapshot.value ?? "",
            annotations: convertOpenAIAnnotationsToSchemaAnnotations(
              latestSnapshot.annotations ?? []
            ),
          });
        } catch (e) {
          console.error(e);
        }
        updateTimeout = null;
        onTimeoutFinished.dispatch();
      }, 250);
    };

    await new Promise((resolve) => {
      openai.beta.threads.runs
        .stream(ensure(thread.openAIThreadId, "Missing thread.openAIThreadId"), {
          assistant_id: assistantId,
        })
        .on("textCreated", (text) => console.log("textCreated", text))
        .on("textDelta", async (textDelta, snapshot) => {
          console.log("textDelta", textDelta, snapshot);
          await updateMessage(snapshot);
        })
        .on("toolCallCreated", (toolCall) => console.log("toolCallCrated", toolCall))
        .on("toolCallDelta", (toolCallDelta, snapshot) => {
          console.log("toolCallDelta", toolCallDelta);
        })
        .on("end", async () => {
          console.log("end");
          if (updateTimeout) onTimeoutFinished.addOnce(() => resolve(null));
          else resolve(null);
        })
        .on("error", async (error) => {
          console.log("error", error);
          if (updateTimeout) onTimeoutFinished.addOnce(() => resolve(null));
          else resolve(null);
        });
    });

    console.log("done");
  },
});

function convertOpenAIAnnotationsToSchemaAnnotations(
  openAIAnnotations: OpenAI.Beta.Threads.Messages.Annotation[]
): Annotation[] {
  return openAIAnnotations
    .map((annotation) => {
      if (annotation.type === "file_citation")
        return {
          kind: "page_citation",
          startIndex: annotation.start_index,
          endIndex: annotation.end_index,
          openAIFileId: annotation.file_citation.file_id,
          pageId: "about",
        } as const;

      return null;
    })
    .filter(isNotNullOrUndefined);
}
