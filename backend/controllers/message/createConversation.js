import { Conversation } from "../../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const conversation = await Conversation.create({ userId, messages: [] });

    res.status(201).json(conversation);
  } catch (e) {
    next(e);
  }
};
