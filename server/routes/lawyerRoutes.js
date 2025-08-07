import express from "express";
import { getLawyersByCity } from "../controllers/lawyerController.js";

const router = express.Router();
router.get("/search", getLawyersByCity);

export default router;

