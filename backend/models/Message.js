import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
});

export const Message = model("Message", messageSchema);
