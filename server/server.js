import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import { Server as socketIO } from "socket.io";


import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load .env variables
dotenv.config();

// Express App Setup
const app = express();
const server = http.createServer(app);

// Socket.IO Setup
const io =new socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Models
// Models
import ChatMessage from "./models/ChatMessage.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
// import documentRoutes from "./routes/documentRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import aiChatRoutes from "./routes/aiChatRoute.js";      // ✅ Fixed route name
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import otpRoutes from "./routes/otpRoutes.js";

// To Insert Data Manually
import testRoutes from "./routes/testRoutes.js";
app.use("/api/test", testRoutes); // Mounts at /api/test

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Mount Routes
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/case", caseRoutes);
app.use("/api/chatbot", chatbotRoutes);
// app.use("/api/document", documentRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/chat", aiChatRoutes);        // ✅ Use different path to avoid conflict
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("joinRoom", ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      const newMsg = await ChatMessage.create({ sender: senderId, receiver: receiverId, message });
      io.to(receiverId).emit("receiveMessage", newMsg);
    } catch (err) {
      console.error(" Socket message error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
