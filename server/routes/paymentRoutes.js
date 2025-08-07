import express from 'express';
const router = express.Router();
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';


router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify", isAuthenticated, verifyPayment);

export default router;



