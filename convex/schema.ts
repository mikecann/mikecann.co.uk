import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    kind: v.literal("anonymous"),
  }),

  messages: defineTable({
    speaker: v.union(v.literal("assistant"), v.literal("user")),
    threadId: v.id("threads"),
    openAIMessageId: v.optional(v.string()),
    text: v.string(),
    status: v.union(
      v.object({ kind: v.literal("created") }),
      v.object({
        kind: v.literal("message_completion_requested"),
        at: v.number(),
        scheduledFunctionId: v.id("_scheduled_functions"),
        scheduledApiCallTime: v.number(),
      }),
      v.object({
        kind: v.literal("message_completion_errored"),
        at: v.number(),
        error: v.string(),
      }),
      v.object({ kind: v.literal("finished") })
    ),
  }).index("by_threadId", ["threadId"]),

  threads: defineTable({
    owningUserId: v.id("users"),
    openAIThreadId: v.optional(v.string()),
  }).index("by_owningUserId", ["owningUserId"]),
});
