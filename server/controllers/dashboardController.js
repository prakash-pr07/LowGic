// server/controllers/dashboardController.js
import Case from "../models/Case.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // from isAuthenticated middleware

    // Fetch user info
    const user = await User.findById(userId).select("-password");

    // Fetch cases based on role
    let cases = [];
    if (user.role === "Client") {
      cases = await Case.find({ clientId: userId });
    } else if (user.role === "Lawyer") {
      cases = await Case.find({ lawyerId: userId });
    }

    const totalCases = cases.length;
    const resolvedCases = cases.filter((c) => c.status === "Resolved").length;
    const pendingCases = totalCases - resolvedCases;

    res.status(200).json({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      city: user.city,
      role: user.role,
      totalCases,
      resolvedCases,
      pendingCases,
      recentCases: cases.slice(-5).reverse(), // last 5 cases
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
