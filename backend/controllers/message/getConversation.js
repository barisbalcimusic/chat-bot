import { Conversation } from "../../models/Conversation.js";

export const getConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findOne({ userId: id });
    if (!conversation) {
      return res.status(400).json({ message: "Couldnt get conversation" });
    }
    res.status(200).json(conversation);
  } catch (e) {
    next(e);
  }
};
