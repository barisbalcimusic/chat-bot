import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
});

export const Message = model("Message", messageSchema);
