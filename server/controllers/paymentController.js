import dotenv from 'dotenv';
dotenv.config();

import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🎯 Step 1: Create Order
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // ₹10 in paise
      currency: "INR",
      receipt: "receipt_" + Math.floor(Math.random() * 100000),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Could not create order" });
  }
};

// 🎯 Step 2: Verify Payment & Mark Premium
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isPremium = true;
    await user.save();

    // ✅ Send Confirmation Email
    await sendEmail({
      to: user.email,
      subject: "🎉 Welcome to LoGic Premium",
      text: `Dear ${user.name},

Thank you for being the premium member for LoGic.

Now you can access all the premium features.

Regards,  
LoGic Team`
    });

    res.status(200).json({ success: true, message: "Payment verified and premium activated" });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
