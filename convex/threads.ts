import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ensureFP } from "../essentials/misc/ensure";

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

// export const findCurrentThreadForUser = query({
//   args: {
//     userId: v.id("users"),
//   },
//   handler: async (ctx, args) => {
//     return ctx.db
//       .query("threads")
//       .withIndex("by_owningUserId", (q) => q.eq("owningUserId", args.userId))
//       .first();
//   },
// });

// export const findOrCreateCurrentThreadForUser = mutation({
//   args: {
//     userId: v.id("users"),
//   },
//   handler: async (ctx, args) => {
//     const thread = await findCurrentThreadForUser(ctx, { userId: args.userId });
//     if (thread) return thread;

//     const threadId = await ctx.db.insert("threads", {
//       owningUserId: args.userId,
//     });

//     return ctx.db.get(threadId).then(ensureFP(`Thread ${threadId} not found`));
//   },
// });

export const createThreadForUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("threads", {
      owningUserId: args.userId,
    });
  },
});

// export const list = query({
//   args: {
//     sessionId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db
//       .query("messages")
//       .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
//       .collect();
//   },
// });

// export const createMessageForSession = mutation({
//   args: {
//     message: v.string(),
//     sessionId: v.string(),
//   },
//   handler: async (ctx, { message, sessionId }) => {
//     await ctx.db.insert("messages", {
//       text: message,
//       sessionId,
//     });
//     await ctx.scheduler.runAfter(0, internal.serve.answer, {
//       sessionId,
//       message,
//     });
//   },
// });

// export const clear = mutation({
//   args: {
//     sessionId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const messages = await ctx.db
//       .query("messages")
//       .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
//       .collect();
//     await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
//   },
// });
