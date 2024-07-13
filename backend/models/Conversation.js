import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const conversationSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    messages: [messageSchema],
  },
  {
    versionKey: false,
  }
);

export const Conversation = model("Conversation", conversationSchema);
