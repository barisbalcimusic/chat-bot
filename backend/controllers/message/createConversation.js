import { Conversation } from "../../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const conversation = await Conversation.create({ userId, messages: [] });

    if (!conversion) {
      return res
        .status(400)
        .json({
          error: "ConversationError",
          message: "Error on creating new conversation",
        });
    }

    res.status(201).json(conversation);
  } catch (e) {
    next(e);
  }
};
