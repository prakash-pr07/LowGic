import User from "../models/User.js";
import Lawyer from "../models/Lawyer.js";
import Case from "../models/Case.js";
import ChatMessage from "../models/ChatMessage.js";
import DocumentAnalysis from "../models/Document.js"; // assuming name
import Blog from "../models/Blog.js";
import NGO from "../models/Ngo.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalLawyers = await User.countDocuments({ role: "lawyer" });
    const totalPremium = await User.countDocuments({ isPremium: true });
    const totalCases = await Case.countDocuments();
    const totalMessages = await ChatMessage.countDocuments();
    const totalDocsAnalyzed = await DocumentAnalysis.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalNGOs = await NGO.countDocuments();

    res.status(200).json({
      totalUsers,
      totalLawyers,
      totalPremium,
      totalCases,
      totalMessages,
      totalDocsAnalyzed,
      totalBlogs,
      totalNGOs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
};
