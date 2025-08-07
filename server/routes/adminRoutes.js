import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 👮‍♂️ Only admin can access this route
router.get("/stats", isAuthenticated, isAdmin, getDashboardStats);

export default router;
