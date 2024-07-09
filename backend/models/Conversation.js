import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
});

const conversationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: { messageSchema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Conversation = model("Conversation", conversationSchema);
