import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
      type: String,
      enum: ["Toronto", "Vancouver", "Calgary", "Montreal"],
      required: true,
    },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Concert", "Sports", "Theatre", "Conference"],
      required: true,
    },
    imageUrl: { type: String, required: false }, // New field for image
  },
  { collection: "events" }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
