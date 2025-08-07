import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },     // ✅ updated
  lastName: { type: String, required: true },      // ✅ updated
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Client", "Lawyer"], required: true },
  isPremium: { type: Boolean, default: false },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  otp: String,
  otpExpiry: Date
}, { timestamps: true });

export default mongoose.model("User", userSchema);
