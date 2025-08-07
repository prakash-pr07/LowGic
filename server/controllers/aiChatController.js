import { OpenAI } from "openai";

import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    const systemPrompt = `
You are a helpful and knowledgeable Indian Legal Assistant AI.
- Always answer in simple and clear English.
- If asked for law references, refer Indian laws like IPC, CrPC, etc.
- Do not provide illegal advice.
- Always respect ethical boundaries.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("AI Chat Error:", err.message);
    res.status(500).json({ error: "AI Chatbot failed to respond" });
  }
};

