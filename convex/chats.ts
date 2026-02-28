import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveChat = mutation({
  args: {
    id: v.string(),
    messages: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { id, messages, userId }) => {
    const existing = await ctx.db
      .query("chats")
      .withIndex("by_chatId", (q) => q.eq("chatId", id))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, { messages });
    }

    return await ctx.db.insert("chats", {
      chatId: id,
      createdAt: Date.now(),
      messages,
      userId,
    });
  },
});

export const deleteChatById = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const chat = await ctx.db
      .query("chats")
      .withIndex("by_chatId", (q) => q.eq("chatId", id))
      .first();
    if (chat) await ctx.db.delete(chat._id);
  },
});

export const getChatsByUserId = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_userId", (q) => q.eq("userId", id))
      .order("desc")
      .collect();
  },
});

export const getChatById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_chatId", (q) => q.eq("chatId", id))
      .first();
  },
});
