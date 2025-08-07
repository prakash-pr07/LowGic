import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <div className="w-full bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[60vh]">
      {/* Left Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/assets/features.png"
          alt="Lady Justice"
          className="rounded-xl shadow-2xl w-full max-h-[500px] object-contain"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Choose <span className="text-blue-500">LoGic</span>?
        </h2>

        <ul className="space-y-5 text-sm sm:text-base">
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />
            <span><strong>Find Verified Lawyers</strong> near your location instantly.</span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />
            <span><strong>Legal AI Chatbot</strong> for quick advice on Indian laws.</span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />
            <span><strong>Document Interpreter</strong> to summarize case files. <em>(Coming Soon)</em></span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />
            <span><strong>Case Tracker</strong> to view status and history anytime.</span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />
            <span><strong>One-Time Premium Access</strong> to contact any lawyer.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturesSection;

