import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const createAnonymousUser = mutation({
  args: {},
  handler: async (ctx) => {
    return ctx.db.insert("users", {
      kind: "anonymous",
    });
  },
});

export const findUser = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, { id }) => {
    return ctx.db.get(id);
  },
});
