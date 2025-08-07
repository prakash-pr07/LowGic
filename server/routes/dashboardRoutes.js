import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getDashboardData);

export default router;
