import mongoose, { set } from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      //SANITIZATION: CLEAR SPACES
      set: (value) => value.trim(),
    },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const conversationSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      //REFERENCE TO USER COLLECTION
      ref: "User",
    },
    messages: [messageSchema],
  },
  {
    versionKey: false,
  }
);

export const Conversation = model("Conversation", conversationSchema);
