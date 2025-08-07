import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.get("/insert-temp-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("minkuSingh", 12);

    const user = await User.create({
      firstName: "Minku",
      lastName: "Singh",
      email: "manishekhar8454@gmail.com",
      phone: "8579976102",
      city: "Patna",
      state: "Bihar",
      password: hashedPassword,
      role: "Client",
      isPremium: true,
      emailVerified: true,
      phoneVerified: true,
    });

    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

export default router;
