import express from 'express';
//import { sendEmailOtp } from "../controllers/authController.js";

const router = express.Router();
import {
  signup,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  updatePassword
} from '../controllers/authController.js';


import { isAuthenticated } from '../middleware/authMiddleware.js';

router.post("/send-email-otp", sendOtp);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/update-password', isAuthenticated, updatePassword);

export default router;
