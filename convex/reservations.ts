import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createReservation = mutation({
  args: {
    id: v.string(),
    userId: v.string(),
    details: v.string(),
  },
  handler: async (ctx, { id, userId, details }) => {
    return await ctx.db.insert("reservations", {
      reservationId: id,
      createdAt: Date.now(),
      userId,
      details,
      hasCompletedPayment: false,
    });
  },
});

export const getReservationById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("reservations")
      .withIndex("by_reservationId", (q) => q.eq("reservationId", id))
      .first();
  },
});

export const updateReservation = mutation({
  args: { id: v.string(), hasCompletedPayment: v.boolean() },
  handler: async (ctx, { id, hasCompletedPayment }) => {
    const reservation = await ctx.db
      .query("reservations")
      .withIndex("by_reservationId", (q) => q.eq("reservationId", id))
      .first();
    if (reservation) {
      await ctx.db.patch(reservation._id, { hasCompletedPayment });
    }
  },
});
