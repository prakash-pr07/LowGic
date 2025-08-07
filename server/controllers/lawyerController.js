import User from "../models/User.js";

export const getLawyersByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const lawyers = await User.find({
      role: "Lawyer",
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).select("-password");

    res.status(200).json({ lawyers });
  } catch (err) {
    console.error("Lawyer Search Error:", err.message);
    res.status(500).json({ error: "Failed to fetch lawyers" });
  }
};
