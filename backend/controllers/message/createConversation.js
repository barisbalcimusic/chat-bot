import { Conversation } from "../../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  try {
    const { userId } = req.body;

    //CREATE EMPTY CONVERSATION WITH USER ID
    const conversation = await Conversation.create({ userId, messages: [] });

    //CHECK FOR ANY ERRORS DURING CREATION OF NEW CONVERSATION
    if (!conversation) {
      throw new Error("Error on creating new conversation");
    }

    //RETURN THE CONVERSATION
    res.status(201).json(conversation);
  } catch (e) {
    next(e);
  }
};
