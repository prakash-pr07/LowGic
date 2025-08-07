import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Check if user is Client
export const isClient = (req, res, next) => {
  if (req.user.role !== "Client") {
    return res.status(403).json({ message: "Access denied. Client only." });
  }
  next();
};

// ✅ Check if user is Lawyer
export const isLawyer = (req, res, next) => {
  if (req.user.role !== "Lawyer") {
    return res.status(403).json({ message: "Access denied. Lawyer only." });
  }
  next();
};

// ✅ Check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// ✅ Check if user is Premium
export const checkPremium = (req, res, next) => {
  if (!req.user || !req.user.isPremium) {
    return res.status(403).json({ message: "Access denied. Premium required." });
  }
  next();
};
