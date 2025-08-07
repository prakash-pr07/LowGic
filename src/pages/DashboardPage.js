import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/dashboard/user", {
        withCredentials: true,
      });

        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return <div className="text-white text-center mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Dashboard</h1>

        {/* User Info */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">User Details</h2>
          <p><strong>Name:</strong> {dashboardData.name}</p>
          <p><strong>Email:</strong> {dashboardData.email}</p>
          <p><strong>Phone:</strong> {dashboardData.phone}</p>
          <p><strong>City:</strong> {dashboardData.city}</p>
          <p><strong>Role:</strong> {dashboardData.role}</p>
        </div>

        {/* Case Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 p-6 rounded-xl text-center shadow-lg">
            <p className="text-lg font-bold">Total Cases</p>
            <p className="text-3xl">{dashboardData.totalCases}</p>
          </div>
          <div className="bg-green-600 p-6 rounded-xl text-center shadow-lg">
            <p className="text-lg font-bold">Resolved</p>
            <p className="text-3xl">{dashboardData.resolvedCases}</p>
          </div>
          <div className="bg-yellow-500 p-6 rounded-xl text-center shadow-lg">
            <p className="text-lg font-bold">Pending</p>
            <p className="text-3xl">{dashboardData.pendingCases}</p>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Recent Cases</h2>
          {dashboardData.recentCases.length === 0 ? (
            <p className="text-gray-400">No recent cases available.</p>
          ) : (
            <ul className="space-y-3">
              {dashboardData.recentCases.map((c, idx) => (
                <li key={idx} className="border-b border-gray-600 pb-2">
                  <p><strong>Title:</strong> {c.title}</p>
                  <p><strong>Status:</strong> {c.status}</p>
                  <p><strong>Filed On:</strong> {new Date(c.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
