import React from "react";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/FeaturesSection";
import SectionWrapper from "../components/SectionWrapper";
import TopLawyersSection from "../components/TopLawyersSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

function PublicHomePage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <SectionWrapper id="hero">
        <div className="max-w-7xl w-full bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[70vh]">
          {/* Left: Text Section */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connecting Clients <br />
              <span className="text-blue-500">with the Right Legal Help</span>
            </h1>
            <p className="text-lg text-gray-300">
              Get expert legal advice, connect with top lawyers, and track your case easily.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/signup"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right: Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/law_hero.png"
              alt="Law Hero"
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Features Section - flipped layout */}
      <SectionWrapper id="features">
        <div className="max-w-7xl w-full bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-8 flex flex-col md:flex-row-reverse items-center justify-between gap-8 min-h-[70vh]">
          <FeaturesSection />
        </div>
      </SectionWrapper>

      {/* Top Lawyers Section */}
      <SectionWrapper id="top-lawyers">
        <TopLawyersSection />
      </SectionWrapper>

      {/* Review Section */}
      <SectionWrapper id="testimonials">
        <TestimonialsSection />
      </SectionWrapper>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PublicHomePage;


