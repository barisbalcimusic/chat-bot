import { Message } from "../../models/Message.js";

export const getQuestions = async (req, res, next) => {
  try {
    //GET QUESTIONS FROM DB
    const questions = await Message.find({ type: "question" });

    if (!questions) {
      return res.status(400).json({ message: "Couldn't get questions" });
    }
    res.status(200).json(questions);
  } catch (e) {
    next(e);
  }
};
