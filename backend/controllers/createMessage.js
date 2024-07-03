import { Message } from "../models/Message.js";

export const createMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const post = await Message.create({ message });
    res.status(200).json(post);
  } catch (error) {
    next(e);
  }
};
