import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
});

const conversationSchema = new Schema({
  userId: { type: String, required: true },
  messages: [messageSchema],
});

export const Conversation = model("Conversation", conversationSchema);
