import React from "react";

const lawyers = [
  {
    name: "Adv. Riya Sharma",
    specialty: "Criminal Law",
    location: "New Delhi",
    rating: "4.9",
    image: "/assets/lawyer1.jpg",
  },
  {
    name: "Adv. Aman Verma",
    specialty: "Family & Divorce",
    location: "Mumbai",
    rating: "4.8",
    image: "/assets/lawyer2.jpg",
  },
  {
    name: "Adv. Priya Nair",
    specialty: "Corporate Law",
    location: "Bangalore",
    rating: "4.7",
    image: "/assets/lawyer3.jpg",
  },
];

const TopLawyersSection = () => {
  return (
    <div className="bg-gray-900 text-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Top Rated <span className="text-blue-500">Lawyers</span> in Your Area
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {lawyers.map((lawyer, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-blue-600"
              />
              <h3 className="text-xl font-semibold">{lawyer.name}</h3>
              <p className="text-blue-400">{lawyer.specialty}</p>
              <p className="text-sm text-gray-300">{lawyer.location}</p>
              <p className="text-yellow-400 font-bold mt-2">⭐ {lawyer.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopLawyersSection;
