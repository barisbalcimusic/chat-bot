import OpenAI from "openai";

const apiKey = process.env.API_KEY;

export const getAnswerFromGPT = async (req, res, next) => {
  try {
    let { question } = req.body;
    //ADD TO QUESTION SOME PROMPT
    question = question + "Answer under 5 words";

    //CONFIG OPENAI AUTHORIZATION
    const openai = new OpenAI({ apiKey });

    //SEND THE QUESTION TO CHAT
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-3.5-turbo",
      max_tokens: 20,
    });

    //GET THE ANSWER OF CHATGPT
    let answer;
    if (completion.choices[0].message.content.slice(-1)[0] === ".") {
      answer = completion.choices[0].message.content;
    } else {
      answer = completion.choices[0].message.content + " ...";
    }

    //RETURN THE ANSWER
    res.status(200).json({ answer });
  } catch (e) {
    next(e);
  }
};
