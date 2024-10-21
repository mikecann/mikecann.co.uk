import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ensureFP } from "../essentials/misc/ensure";
import { hoursInMs } from "../essentials/misc/time";
import { internal } from "./_generated/api";



export const findThreadForUser = query({
  args: {
    threadId: v.id("threads"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) return null;

    if (thread.owningUserId !== args.userId)
      throw new ConvexError(`Thread ${args.threadId} does not belong to user ${args.userId}`);

    return thread;
  },
});

export const getThreadForUser = query({
  args: {
    threadId: v.id("threads"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return findThreadForUser(ctx, args).then(ensureFP(`Thread ${args.threadId} not found`));
  },
});

export const setOpenAIThreadId = internalMutation({
  args: {
    threadId: v.id("threads"),
    openAIThreadId: v.string(),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new ConvexError(`Thread ${args.threadId} not found`);

    if (thread.openAIThreadId)
      throw new ConvexError(`Thread ${args.threadId} already has a OpenAI thread id`);

    return ctx.db.patch(args.threadId, {
      openAIThreadId: args.openAIThreadId,
    });
  },
});

export const createThreadForUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("threads", {
      owningUserId: args.userId,
      completionTokensUsed: 0,
      promptTokensUsed: 0,
      totalTokensUsed: 0,
    });
  },
});

export const updateThreadTokensUsed = internalMutation({
  args: {
    threadId: v.id("threads"),
    completionTokensUsed: v.number(),
    promptTokensUsed: v.number(),
    totalTokensUsed: v.number(),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new ConvexError(`Thread ${args.threadId} not found`);

    return ctx.db.patch(args.threadId, {
      completionTokensUsed: thread.completionTokensUsed + args.completionTokensUsed,
      promptTokensUsed: thread.promptTokensUsed + args.promptTokensUsed,
      totalTokensUsed: thread.totalTokensUsed + args.totalTokensUsed,
    });
  },
});

export const scheduleThreadUpdatedNotification = internalMutation({
  args: {
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new ConvexError(`Thread ${args.threadId} not found`);

    if (thread.threadUpdatedNoticationFunctionId)
      await ctx.scheduler.cancel(thread.threadUpdatedNoticationFunctionId);

    await ctx.db.patch(args.threadId, {
      threadUpdatedNoticationFunctionId: await ctx.scheduler.runAfter(
        hoursInMs(24),
        internal.resend.resend.sendThreadUpdatedNotification,
        { threadId: args.threadId }
      ),
    });
  },
});
