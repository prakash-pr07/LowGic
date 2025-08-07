import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  source: String,
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Blog", blogSchema);
