import express from "express";
import {
  createCase,
  acceptCase,
  updateCaseStatus,
  sendClosureOtp,
  confirmClosure
} from "../controllers/caseController.js";

import { isAuthenticated, isClient, isLawyer } from "../middleware/authMiddleware.js";

const router = express.Router();

// CLIENT
router.post("/create", isAuthenticated, isClient, createCase);
router.post("/closure-otp/:caseId", isAuthenticated, isClient, sendClosureOtp);
router.post("/close/:caseId", isAuthenticated, isClient, confirmClosure);

// LAWYER
router.post("/accept/:caseId", isAuthenticated, isLawyer, acceptCase);
router.post("/update-status/:caseId", isAuthenticated, isLawyer, updateCaseStatus);

export default router;
