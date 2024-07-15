import sanitizeHtml from "sanitize-html";
import { Conversation } from "../../models/Conversation.js";

export const createMessage = async (req, res, next) => {
  try {
    const { userId, message, type } = req.body;
    //SANITIZE MESSAGE
    let sanitizedMessage = sanitizeHtml(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
    if (!sanitizedMessage) {
      sanitizedMessage =
        " ### This message has been removed for security reasons ###";
    }
    //FIND THE CONVERSATION WITH USER ID
    const conversation = await Conversation.findOne({ userId });
    //ADD MESSAGE TO THIS CONVERSATION
    conversation.messages.push({ message: sanitizedMessage, type });
    await conversation.save();
    //FIND THE CREATED MESSAGE
    const allMessages = await Conversation.find();
    const createdMessage = allMessages[0].messages.slice(-1)[0];
    res.status(201).json(createdMessage);
  } catch (e) {
    next(e);
  }
};
