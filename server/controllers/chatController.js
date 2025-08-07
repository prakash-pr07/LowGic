import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";


export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const sender = req.user.id;

    const senderUser = await User.findById(sender);
    if (!senderUser.isPremium) {
      return res.status(403).json({ error: "Upgrade to premium to chat." });
    }

    const newMsg = await ChatMessage.create({ sender, receiver: receiverId, message });

    res.status(201).json({ success: true, message: "Message sent", data: newMsg });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user.id;

    const messages = await ChatMessage.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    }).sort({ sentAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
