import OpenAI from "openai";

const apiKey = process.env.API_KEY;

export const getAnswerFromGPT = async (req, res, next) => {
  try {
    let { question } = req.body;
    question = question + " Keep it short, under 5 words.";

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-3.5-turbo",
      max_tokens: 20,
    });

    const answer = completion.choices[0].message.content + " ( ... )";
    res.status(200).json({ answer });
  } catch (e) {
    next(e);
  }
};
