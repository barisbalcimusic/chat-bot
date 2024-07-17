import OpenAI from "openai";

const apiKey = process.env.API_KEY;

export const getAnswerFromGPT = async (req, res, next) => {
  try {
    const { question } = req.body;

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-3.5-turbo",
    });

    const answer = completion.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (e) {
    next(e);
  }
};
