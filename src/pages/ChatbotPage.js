import React, { useState } from "react";
import axios from "axios";
import SectionWrapper from "../components/SectionWrapper";

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chatbot/ai", {
        question: input,
      });

      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, errorReply]);
    }

    setLoading(false);
  };

  const handleRefresh = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <SectionWrapper id="chatbot">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
          AI Legal Chat Assistant
        </h1>

        <div className="bg-gray-800 w-full max-w-7xl rounded-xl shadow-xl flex flex-col h-[450px]">
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap break-words ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-700 text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-3 rounded-lg bg-gray-700 text-white max-w-[80%] self-start animate-pulse">
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input and Send button */}
          <div className="flex items-center p-4 border-t border-gray-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask legal questions related to Indian law..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg font-bold"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {/* Refresh button */}
          <div className="flex justify-center p-3 border-t border-gray-700">
            <button
              onClick={handleRefresh}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold"
            >
              Refresh Chat
            </button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ChatbotPage;
