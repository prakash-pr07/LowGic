import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendOTP, verifyOTP } from '../utils/otpService.js';
import { sendEmailOTP } from "../utils/sendEmailOTP.js";
import otpStore, { saveOTP } from '../utils/otpStore.js';



// ✅ Universal OTP Sender (Email or Phone)
export const sendOtp = async (req, res) => {
  const { contact } = req.body;

  if (!contact) {
    return res.status(400).json({ message: "Contact (email or phone) is required" });
  }

  try {
    // ✅ Check if contact already exists in DB
    const existingUser = await User.findOne({
      $or: [{ email: contact }, { phone: contact }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // ✅ Send OTP (email or phone)
    const otp = await sendOTP(contact);
    res.status(200).json({ message: "OTP sent successfully", otp }); // Dev only
  } catch (error) {
    console.error("OTP send error:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// // ✅ Send OTP (Only Email)
// export const sendEmailOtp = async (req, res) => {
//   const { email } = req.body;
  
//   if (!email) return res.status(400).json({ message: "Email required" });

//   try {
//     // Check if email already registered
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already registered" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     await sendEmailOTP(email, otp);
//     saveOTP(email, otp); // don't forget to save it
//     res.status(200).json({ success: true, message: "OTP sent to email", otp }); // dev only
//   } catch (error) {
//     console.error("Email OTP error:", error.message);
//     res.status(500).json({ success: false, message: "Email OTP send failed" });
//   }
// };


// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { contact, enteredOtp } = req.body;
  const isValid = await verifyOTP(contact, enteredOtp);

  if (!isValid) return res.status(400).json({ message: "Invalid OTP" });
   delete otpStore[contact];
  res.status(200).json({ message: "OTP verified" });
};

// ✅ Register (Signup)
export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    city,
    state
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !role || !city || !state)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
      city,
      state
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  const { contact } = req.body;

  try {
    const otp = await sendOTP(contact);
    res.status(200).json({ message: "OTP sent", otp });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  const { contact, otp, newPassword } = req.body;

  const isValid = await verifyOTP(contact, otp);
  if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

  const hashed = await bcrypt.hash(newPassword, 12);
  await User.findOneAndUpdate(
    { $or: [{ email: contact }, { phone: contact }] },
    { password: hashed },
    { new: true }
  );
  delete otpStore[contact];
  res.status(200).json({ message: "Password reset successful" });
};

// ✅ Update Password (Logged-in User)
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) return res.status(400).json({ message: "Wrong current password" });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
};

