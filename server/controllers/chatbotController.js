import axios from "axios";

export const chatWithAI = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ success: false, message: "Question is required" });
  }

  try {
    const prompt = `
You are a legal assistant trained on Indian law.
Answer the following question in 4-6 clear bullet points only.
Be short, precise, and easy to understand.

Q: ${question}
A:
`;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 300,
        temperature: 0.6,
        n: 1,
        stop: null,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.choices[0].text.trim();
    res.status(200).json({ success: true, answer: aiText });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ success: false, message: "AI failed to respond" });
  }
};
