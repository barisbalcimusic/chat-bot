import { Conversation } from "../../models/Conversation.js";

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await Conversation.find({ type: "question" });
    if (!questions) {
      return res.status(400).json({ message: "Couldn't get questions" });
    }
    res.status(200).json(questions);
  } catch (e) {
    next(e);
  }
};
