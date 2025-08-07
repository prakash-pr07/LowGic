import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
