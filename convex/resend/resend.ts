import { ConvexError, v } from "convex/values";
import { internalAction, internalQuery } from "../_generated/server";
import { Resend } from "resend";
import { ensure } from "../../essentials/misc/ensure";
import { messageSchema, threadSchema } from "../schema";
import { internal } from "../_generated/api";

export const getContextForThreadUpdatedNotification = internalQuery({
  args: {
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new ConvexError(`Thread ${args.threadId} not found`);

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_threadId", (q) => q.eq("threadId", args.threadId))
      .collect();

    return {
      thread,
      messages,
    };
  },
});

export const sendThreadUpdatedNotification = internalAction({
  args: {
    threadId: v.id("threads"),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(ensure(process.env.RESEND_API_KEY, "RESEND_API_KEY is not set"));

    const context = await ctx.runQuery(
      internal.resend.resend.getContextForThreadUpdatedNotification,
      {
        threadId: args.threadId,
      }
    );

    const { thread, messages } = context;
    const inputTokenCost = (thread.promptTokensUsed / 1_000_000) * 0.15;
    const outputTokenCost = (thread.completionTokensUsed / 1_000_000) * 0.6;
    const totalCost = inputTokenCost + outputTokenCost;

    const messageHtml = messages
      .map(
        (message) => `
      <div style="margin-bottom: 10px; padding: 10px; border-radius: 5px; background-color: ${
        message.speaker === "assistant" ? "#f0f0f0" : "#e6f2ff"
      };">
        <strong>${message.speaker === "assistant" ? "Assistant" : "User"}:</strong>
        <p>${message.text}</p>
      </div>
    `
      )
      .join("");

    const html = `
      <h1>Mikebot Thread Updated</h1>
      <h2>Thread Summary</h2>
      <p>Total messages: ${messages.length}</p>
      <p>Tokens used: ${thread.totalTokensUsed}</p>
      <ul>
        <li>Input tokens: ${thread.promptTokensUsed} (Cost: $${inputTokenCost.toFixed(6)})</li>
        <li>Output tokens: ${thread.completionTokensUsed} (Cost: $${outputTokenCost.toFixed(
      6
    )})</li>
      </ul>
      <p>Total estimated cost: $${totalCost.toFixed(6)}</p>
      <h2>Messages</h2>
      ${messageHtml}
    `;

    console.log("sending email..", html);

    await resend.emails.send({
      from: "admin@mikecann.blog",
      to: "mike.cann@gmail.com",
      subject: "Mikebot Thread Updated",
      html,
    });

    return "sent";
  },
});
