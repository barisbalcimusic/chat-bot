import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: { type: String },
});

export const Message = model("Message", messageSchema);
