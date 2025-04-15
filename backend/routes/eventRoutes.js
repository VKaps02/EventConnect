import express from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary.js"; // ✅ Correct import
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Event from "../models/Event.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "event_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// CREATE - Add an event with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file ? req.file.path : "", // Store Cloudinary Image
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("❌ Error saving event:", err);
    res.status(400).json({ error: err.message });
  }
});

// READ - Get all events
router.get("/", async (req, res) => {
  try {
    const { category, location, date, userId, showAll } = req.query;
    let query = {};

    // ✅ Admin wants all events — bypass filters completely
    if (showAll === "true") {
      // Only skip subscription-based filtering
      const query = {};
      if (category && category !== "All Categories") query.category = category;
      if (location && location !== "All Locations") query.location = location;

      if (date) {
        const start = new Date(date);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setUTCHours(23, 59, 59, 999);
        query.date = { $gte: start, $lte: end };
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query.date = { $gte: today };
      }

      const events = await Event.find(query);
      return res.json(events);
    }

    // ✅ Apply category and location filters
    if (category && category !== "All Categories") query.category = category;
    if (location && location !== "All Locations") query.location = location;

    // ✅ Check if user is subscribed
    let isSubscribed = false;
    if (userId) {
      const user = await User.findById(userId);
      if (user?.isSubscribed) isSubscribed = true;
    }

    // ✅ Apply specific date filter if selected
    if (date) {
      const start = new Date(date);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setUTCHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }
    console.log(query.date);

    // ✅ If no specific date selected, show all upcoming events
    if (!date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.date = { $gte: today }; // Show all future events
    }

    const events = await Event.find(query);

    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ - Get a single event by ID
// READ - Get a single event by ID
router.get("/:id", async (req, res) => {
  console.log("🔍 Fetching event by ID:", req.params.id);

  try {
    const { userId } = req.query;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    let isSubscribed = false;
    if (userId) {
      const user = await User.findById(userId);
      if (user?.isSubscribed) isSubscribed = true;
    }

    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneDayBeforeEvent = new Date(eventDate);
    oneDayBeforeEvent.setDate(eventDate.getDate() - 1);

    // 🧠 Access is locked if:
    // - user is NOT subscribed AND
    // - today is before (event date - 1)
    const lockedForNonSubscribers = !isSubscribed && today < oneDayBeforeEvent;

    res.json({
      ...event._doc,
      earlyAccess: lockedForNonSubscribers, // You can rename this to "locked" or "restricted" if you want clarity
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Modify an event with image upload handling
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    // Find the existing event
    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent)
      return res.status(404).json({ message: "Event not found" });

    // Check if a new image is uploaded
    let imageUrl = existingEvent.imageUrl; // Keep old image by default
    if (req.file) {
      imageUrl = req.file.path; // Update image if new file is uploaded
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        price: req.body.price,
        category: req.body.category,
        imageUrl: imageUrl, // Store updated or existing image
      },
      { new: true, runValidators: true } // Return updated document & validate
    );

    res.json(updatedEvent);
  } catch (err) {
    console.error("❌ Error updating event:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    // Find the event first
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete image from Cloudinary (if exists)
    if (event.imageUrl) {
      const publicId = event.imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(`event_images/${publicId}`); // Delete from Cloudinary
    }

    // Delete event from MongoDB
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
