import express from "express";
import { chatWithAI } from "../controllers/chatbotController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", isAuthenticated, chatWithAI);

export default router;
