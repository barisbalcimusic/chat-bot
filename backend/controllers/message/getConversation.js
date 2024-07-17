import { Conversation } from "../../models/Conversation.js";

export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // FIND CONVERSATION VIA USER ID AND FILL USER ID FIELD WITH REFERENCED DATA IN SCHEMA
    const conversation = await Conversation.findOne({ userId }).populate(
      "userId"
    );

    // CHECK FOR ERRORS
    if (!conversation) {
      return res.status(400).json({ message: "Couldnt get conversation" });
    }

    //RETURN THE CONVERSATION
    res.status(200).json(conversation);
  } catch (e) {
    next(e);
  }
};
