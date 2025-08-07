import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    experience: Number,
    specialization: [String],
    city: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
);

lawyerSchema.index({ location: "2dsphere" });

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

export default Lawyer;
