import { Conversation } from "../../models/Conversation.js";

export const createMessage = async (req, res, next) => {
  try {
    const { userId, message, type } = req.body;
    //FIND THE CONVERSATION WITH USER ID
    const conversation = await Conversation.findOne({ userId });
    //ADD MESSAGE TO THIS CONVERSATION
    conversation.messages.push({ message, type });
    await conversation.save();

    res.status(201).json(message);
  } catch (e) {
    next(e);
  }
};
