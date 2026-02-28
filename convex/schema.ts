import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.optional(v.string()),
  }).index("by_email", ["email"]),

  chats: defineTable({
    chatId: v.string(),
    createdAt: v.number(),
    messages: v.string(),
    userId: v.string(),
  }).index("by_userId", ["userId"]).index("by_chatId", ["chatId"]),

  reservations: defineTable({
    reservationId: v.string(),
    createdAt: v.number(),
    details: v.string(),
    hasCompletedPayment: v.boolean(),
    userId: v.string(),
  }).index("by_reservationId", ["reservationId"]),
});
