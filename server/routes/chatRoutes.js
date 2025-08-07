import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chatController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/send", isAuthenticated, sendMessage);
router.get("/history/:userId", isAuthenticated, getChatHistory);

export default router;

