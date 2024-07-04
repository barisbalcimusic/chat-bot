import { Message } from "../models/Message.js";

export const getAllMessages = async (req, res, next) => {
  try {
    //GET MESSAGE HISTORY FROM DB
    const messageHistory = await Message.find();

    if (!messageHistory) {
      return res.status(400).json({ message: "Couldn't get messages" });
    }
    res.status(200).json(messageHistory);
  } catch (e) {
    next(e);
  }
};
