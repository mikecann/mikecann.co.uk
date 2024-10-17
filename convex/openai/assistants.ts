import { v } from "convex/values";
import { internalAction, internalMutation } from "../_generated/server";
import OpenAI from "openai";
import { ensure } from "../../essentials/misc/ensure";
import { getThreadForUser } from "../threads";
import { api, internal } from "../_generated/api";

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

    let accumulatedDelta = "";
    let lastUpdateTime = 0;

    const updateMessage = async (force = false) => {
      const now = Date.now();
      if (force || now - lastUpdateTime >= 500) {
        if (accumulatedDelta) {
          await ctx.runMutation(internal.messages.updateMessageTextFromAssistantDelta, {
            messageId: args.assistantMessageId,
            textDelta: accumulatedDelta,
          });
          accumulatedDelta = "";
          lastUpdateTime = now;
        }
      }
    };

    await new Promise((resolve) => {
      const run = openai.beta.threads.runs
        .stream(ensure(thread.openAIThreadId, "Missing thread.openAIThreadId"), {
          assistant_id: assistantId,
        })
        .on("textCreated", (text) => console.log("textCreated", text))
        .on("textDelta", async (textDelta, snapshot) => {
          console.log("textDelta", textDelta, snapshot);
          accumulatedDelta += textDelta.value ?? "";
          await updateMessage();
        })
        .on("toolCallCreated", (toolCall) => console.log("toolCallCrated", toolCall))
        .on("toolCallDelta", (toolCallDelta, snapshot) => {
          console.log("toolCallDelta", toolCallDelta);
        })
        .on("end", async () => {
          console.log("end");
          await updateMessage(true);
          resolve(null);
        })
        .on("error", async (error) => {
          console.log("error", error);
          await updateMessage(true);
          resolve(null);
        });
    });
  },
});
