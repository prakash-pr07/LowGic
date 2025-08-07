import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  },
  updates: [
    {
      message: String,
      date: { type: Date, default: Date.now },
    },
  ],
  closureOTP: String,
}, { timestamps: true });

const Case = mongoose.model("Case", caseSchema);

export default Case;
