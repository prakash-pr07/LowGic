import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Amit Raj",
    role: "Client from Delhi",
    quote:
      "LoGic helped me find a lawyer for my property case in minutes. Super smooth experience!",
  },
  {
    name: "Priya Sharma",
    role: "Family Case Client",
    quote:
      "I was struggling to track my case — this platform made it easy and stress-free. Highly recommend!",
  },
  {
    name: "Manisha K.",
    role: "Startup Founder",
    quote:
      "Found a corporate lawyer in Bangalore who guided me perfectly. Amazing AI support too!",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-xl px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What Our <span className="text-blue-500">Clients Say</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-700"
          >
            <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />
            <p className="text-gray-300 italic mb-4\">{item.quote}</p>
            <h4 className="font-bold text-lg text-white">{item.name}</h4>
            <p className="text-sm text-blue-400">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
