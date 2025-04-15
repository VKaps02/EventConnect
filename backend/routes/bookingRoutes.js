import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import { sendBookingConfirmation } from "../utils/emailService.js";
const router = express.Router();

// ✅ Create a booking
// ✅ Create a booking
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      eventId,
      name,
      email,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventPrice,
      eventCategory,
      numberOfTickets,
      totalPrice,
      paymentMethod,
      cardHolder,
      cardNumber,
      expiry,
      cvv,
      paymentStatus,
      bookingStatus,
    } = req.body;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);
    console.log("Fetched event:", event);

    if (!user || !event) {
      return res.status(404).json({ error: "User or Event not found." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parsedEventDate = new Date(eventDate);
    parsedEventDate.setHours(0, 0, 0, 0);
    const isSameDay = parsedEventDate.getTime() === today.getTime();

    if (!user.isSubscribed && !isSameDay) {
      return res.status(403).json({
        error:
          "Booking is only allowed on the event day for non-subscribed users.",
      });
    }

    // ✅ Now using all fields from req.body
    const booking = new Booking({
      userId,
      eventId,
      name,
      email,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventPrice,
      eventCategory,
      numberOfTickets,
      totalPrice,
      paymentMethod,
      paymentStatus,
      bookingStatus,
      cardHolder,
      cardNumber,
      expiry,
      cvv,
    });

    await booking.save();

    await sendBookingConfirmation(email, booking);
    res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching bookings for user: ${userId}`);

    const bookings = await Booking.find({ userId }).populate("eventId");

    console.log("🔥 Bookings found:", bookings);

    if (!bookings || bookings.length === 0) {
      return res.status(200).json([]); // ✅ Always return an array
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

export default router;
