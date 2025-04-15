import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true }, // ✅ Ensure time is required
  eventLocation: { type: String, required: true },
  eventPrice: { type: Number, required: true },
  eventCategory: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  numberOfTickets: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card"],
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Confirmed", "Cancelled", "Pending"],
    default: "Pending",
  },
  cardHolder: { type: String },
  cardNumber: { type: String },
  expiry: { type: String },
  cvv: { type: String },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
