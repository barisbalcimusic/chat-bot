import { Message } from "../models/Message.js";

export const createMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    //SAVE MESSAGE INTO MESSAGE HISTORY IN DB
    const post = await Message.create({ message });

    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};
