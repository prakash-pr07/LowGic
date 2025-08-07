// server/routes/otpRoutes.js

import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/email", (req, res) => sendOtp(req, res, "email"));
router.post("/phone", (req, res) => sendOtp(req, res, "phone"));

router.post("/email/verify", (req, res) => verifyOtp(req, res, "email"));
router.post("/phone/verify", (req, res) => verifyOtp(req, res, "phone"));

export default router;
