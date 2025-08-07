import React from "react";
import SectionWrapper from "./SectionWrapper";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-16 px-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section - Admin Info */}
        <SectionWrapper>
          <div className="space-y-4">
            <h2 className="text-blue-500 text-2xl font-bold">About The Admin:</h2>
            <img
              src="/assets/admin_profile.png"
              alt="Admin Profile"
              className="w-[200px] rounded-lg shadow-xl border border-gray-700"
            />
            <div className="space-y-1 text-sm">
              <p><strong className="text-blue-400">Name:</strong> <span className="hover:text-blue-300 cursor-pointer transition">Prakash Ranjan</span></p>
              <p><strong className="text-blue-400">From:</strong> NIT Patna</p>
              <p><strong className="text-blue-400">Email:</strong> prakashranjan8454@gmail.com</p>
              <p><strong className="text-blue-400">Phone:</strong> 9576409209</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/imprakash_7_p.r" target="_blank" rel="noreferrer" className="text-pink-400 hover:underline">Instagram</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-blue-200 hover:underline">Facebook</a>
            </div>
          </div>
        </SectionWrapper>

        {/* Right Section - LoGic & Nav */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-2">About <span className="text-blue-500">LoGic</span></h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong className="text-white">LoGic</strong> is your one-stop platform to <strong className="text-blue-400">connect with verified lawyers</strong>, 
              <strong className="text-blue-400"> track legal cases</strong>, and use <strong className="text-blue-400">AI-powered tools</strong> for document interpretation and legal advice.
            </p>
          </div>

          {/* Navigation Buttons and Descriptions */}
          <div className="space-y-6">
            <SectionWrapper>
              <Link to="/" className="text-blue-500 font-semibold hover:underline">
                Home
              </Link>
              <p className="text-gray-400 text-sm mt-1">Navigate back to homepage and explore all features.</p>
            </SectionWrapper>

            <SectionWrapper>
              <Link to="/lawyers" className="text-blue-500 font-semibold hover:underline">
                Find Lawyers
              </Link>
              <p className="text-gray-400 text-sm mt-1">Search and connect with verified lawyers near you.</p>
            </SectionWrapper>

            <SectionWrapper>
              <Link to="/case-tracker" className="text-blue-500 font-semibold hover:underline">
                Case Tracker
              </Link>
              <p className="text-gray-400 text-sm mt-1">Track your ongoing cases and get updates in one place.</p>
            </SectionWrapper>

            <SectionWrapper>
              <Link to="/interpreter" className="text-blue-500 font-semibold hover:underline">
                Document Interpreter
              </Link>
              <p className="text-gray-400 text-sm mt-1">Upload legal documents and get AI-based summaries. (Coming Soon)</p>
            </SectionWrapper>

            <SectionWrapper>
              <Link to="/chatbot" className="text-blue-500 font-semibold hover:underline">
                Chatbot
              </Link>
              <p className="text-gray-400 text-sm mt-1">Ask your legal questions and get AI responses instantly.</p>
            </SectionWrapper>

            <SectionWrapper>
              <Link to="/dashboard" className="text-blue-500 font-semibold hover:underline">
                Dashboard
              </Link>
              <p className="text-gray-400 text-sm mt-1">Your personal dashboard for managing legal activity.</p>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
