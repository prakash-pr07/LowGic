import React, { useState } from "react";
import { fetchLawyersByCity } from "../services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FindLawyersPage = () => {
  const [city, setCity] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleSearch = async () => {
    if (!user) {
      toast.warning("Please login to search for lawyers.");
      return;
    }

    if (!city.trim()) {
      toast.error("Please enter a city.");
      return;
    }

    try {
      const data = await fetchLawyersByCity(city);
      if (data.length === 0) {
        toast.info("No lawyers found in this city.");
      }
      setLawyers(data);
    } catch (error) {
      toast.error("Failed to fetch lawyers.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Find Lawyers in Your City
      </h2>

      <div className="flex gap-4 justify-center mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <div key={lawyer._id} className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold">
              {lawyer.firstName} {lawyer.lastName}
            </h3>
            <p>Email: {lawyer.email}</p>
            <p>City: {lawyer.city}</p>
            <p>Phone: {lawyer.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindLawyersPage;
