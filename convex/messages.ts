import { v } from "convex/values";
import { mutationWithUser, queryWithUser } from "./functions";
import { getThreadForUser } from "./threads";
import { internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { annotationSchema, messageStatusSchema } from "./schema";

export const listMessagesForUserThread = query({
  args: {
    userId: v.id("users"),
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const thread = await getThreadForUser(ctx, { userId: args.userId, threadId: args.threadId });
    return await ctx.db
      .query("messages")
      .withIndex("by_threadId", (q) => q.eq("threadId", thread._id))
      .collect();
  },
});

export const sendMessageToThreadFromUser = mutationWithUser({
  args: {
    message: v.string(),
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    if (args.message.length === 0) return;

    // We first should check if there is an existing message that is not finished
    // and if so we should not proceed

    const thread = await getThreadForUser(ctx, { userId: ctx.user._id, threadId: args.threadId });

    // Insert my message
    await ctx.db.insert("messages", {
      speaker: "user",
      text: args.message,
      threadId: thread._id,
      status: { kind: "finished" },
    });

    // Now insert a placeholder one for the assistant
    const itemChatMessageId = await ctx.db.insert("messages", {
      threadId: args.threadId,
      speaker: "assistant",
      text: "",
      status: { kind: "created" },
    });

    // Now schedule the request for the assistant
    const scheduledApiCallTime = Date.now() + 100;
    const scheduledFunctionId = await ctx.scheduler.runAt(
      scheduledApiCallTime,
      internal.openai.assistants.addUserMessageAndRequestAnswer,
      {
        userMessageText: args.message,
        assistantMessageId: itemChatMessageId,
        threadId: thread._id,
        userId: ctx.user._id,
      }
    );

    // Update the message with the scheduled function id
    await ctx.db.patch(itemChatMessageId, {
      status: {
        kind: "message_completion_requested",
        scheduledFunctionId,
        scheduledApiCallTime,
        at: Date.now(),
      },
    });
  },
});

export const setOpenAIMessageId = internalMutation({
  args: {
    messageId: v.id("messages"),
    openAIMessageId: v.string(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error(`Message ${args.messageId} not found`);

    if (message.openAIMessageId)
      throw new Error(`Message ${args.messageId} already has a OpenAI message id`);

    return ctx.db.patch(args.messageId, {
      openAIMessageId: args.openAIMessageId,
    });
  },
});

export const updateMessageTextFromAssistant = internalMutation({
  args: {
    messageId: v.id("messages"),
    text: v.string(),
    annotations: v.array(annotationSchema),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error(`Message ${args.messageId} not found`);

    return ctx.db.patch(args.messageId, {
      text: args.text,
      annotations: args.annotations,
    });
  },
});

export const updateMessageStatus = internalMutation({
  args: {
    messageId: v.id("messages"),
    status: messageStatusSchema,
  },
  handler: async (ctx, args) => {
    return ctx.db.patch(args.messageId, { status: args.status });
  },
});
