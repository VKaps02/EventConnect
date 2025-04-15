import express from "express";
import User from "../models/User.js";

const router = express.Router();
// Create a user (called after Firebase signup)
router.post("/create", async (req, res) => {
  try {
    const { uid, email } = req.body;
    const existing = await User.findById(uid);
    if (existing) return res.json({ message: "User already exists" });

    const newUser = new User({ _id: uid, email });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Subscribe a user
router.post("/:id/subscribe", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isSubscribed: true, subscriptionDate: new Date() },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User subscribed successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Check subscription status
router.get("/:id/subscription", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      isSubscribed: user.isSubscribed,
      subscriptionDate: user.subscriptionDate,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
