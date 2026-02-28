import "server-only";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../convex/_generated/api";

export async function getUser(email: string) {
  try {
    return await fetchQuery(api.users.getUser, { email });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);
  try {
    return await fetchMutation(api.users.createUser, { email, password: hash });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function saveChat({ id, messages, userId }: { id: string; messages: any; userId: string; }) {
  try {
    return await fetchMutation(api.chats.saveChat, { id, messages: JSON.stringify(messages), userId });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await fetchMutation(api.chats.deleteChatById, { id });
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    const chats = await fetchQuery(api.chats.getChatsByUserId, { id });
    return chats.map((chat: any) => ({ ...chat, messages: JSON.parse(chat.messages) }));
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const chat = await fetchQuery(api.chats.getChatById, { id });
    if (!chat) return null;
    return { ...chat, messages: JSON.parse(chat.messages) };
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function createReservation({ id, userId, details }: { id: string; userId: string; details: any; }) {
  return await fetchMutation(api.reservations.createReservation, { id, userId, details: JSON.stringify(details) });
}

export async function getReservationById({ id }: { id: string }) {
  const reservation = await fetchQuery(api.reservations.getReservationById, { id });
  if (!reservation) return null;
  return { ...reservation, details: JSON.parse(reservation.details) };
}

export async function updateReservation({ id, hasCompletedPayment }: { id: string; hasCompletedPayment: boolean; }) {
  return await fetchMutation(api.reservations.updateReservation, { id, hasCompletedPayment });
}