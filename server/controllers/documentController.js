import fs from 'fs';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'openai';


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔍 Read PDF content and extract text
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

export const interpretCharges = async (req, res) => {
  try {
    const filePath = req.file.path;
    const rawText = await extractTextFromPDF(filePath);

    const systemPrompt = `
You are a legal AI. Based on the document below:
- Identify charges filed against the user.
- For each charge, explain what it means.
- Give the reason why it might apply.
- Format it step-by-step in bullet points.
- Use simple, clear language.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawText },
      ],
    });

    const summary = completion.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Document Interpretation Error:", error.message);
    res.status(500).json({ error: "Failed to interpret legal document" });
  }
};
