import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api";
import { motion } from "framer-motion";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
      }
      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const handleBookNow = () => {
    navigate(`/book-event/${event._id}`, {
      state: { event, quantity, totalPrice: event.price * quantity },
    });
  };

  if (loading)
    return (
      <p className="text-white text-center mt-10">Loading event details...</p>
    );
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!event)
    return <p className="text-white text-center mt-10">Event not found.</p>;

  return (
    <div className="relative w-full min-h-screen pt-24 overflow-hidden text-white flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={event.imageUrl || "https://via.placeholder.com/800"}
          alt={event.name}
          className="w-full h-full object-cover brightness-50 scale-110"
        />
      </div>

      {/* Event Details & Booking Section with animation */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-black/70 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Section - Event Poster */}
        <motion.div
          className="flex justify-center md:items-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-60 h-80 sm:w-64 sm:h-96 bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={event.imageUrl || "https://via.placeholder.com/800"}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right Section - Event Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug">
            {event.name} ({new Date(event.date).getFullYear()})
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="bg-red-500 px-2 py-1 rounded-lg text-xs md:text-sm uppercase font-semibold">
              {event.category}
            </span>
          </div>
          <p className="mt-2 text-gray-400 text-sm md:text-base italic">
            {event.description}
          </p>

          {/* Event Info */}
          <div className="mt-6 space-y-2 text-base border-t border-gray-600 pt-4">
            <p className="text-gray-400">
              <span className="text-gray-300 font-semibold">📍 Location:</span>{" "}
              {event.location}
            </p>
            <p className="text-gray-400">
              <span className="text-gray-300 font-semibold">📅 Date:</span>{" "}
              {event.date.slice(0, 10)}
            </p>
            <p className="text-gray-400">
              <span className="text-gray-300 font-semibold">⏰ Time:</span>{" "}
              {event.time}
            </p>
            <p className="text-gray-400">
              <span className="text-gray-300 font-semibold">💲 Price:</span> $
              {event.price}
            </p>
            <label className="block text-gray-300 text-base mt-3">
              🎟️ Tickets
            </label>
            <div className="flex items-center mt-2">
              <button
                className="px-3 py-1 bg-gray-700 cursor-pointer hover:bg-orange-500 rounded-l-lg transition"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                className="w-16 text-center border-none outline-none bg-transparent text-white"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button
                className="px-3 py-1 bg-gray-700 cursor-pointer hover:bg-orange-500 rounded-r-lg transition"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <p className="mt-4 text-base md:text-lg font-semibold text-orange-400">
            Total Price: ${event.price * quantity}
          </p>

          {/* Booking Button */}
          {/* <button
            className="mt-6 w-full py-3 bg-orange-500 cursor-pointer text-white font-bold text-base md:text-lg rounded-lg hover:bg-orange-600 transition"
            onClick={handleBookNow}
          >
            Book Now
          </button> */}
          {event.earlyAccess ? (
            <div className="relative group mt-4 inline-block">
              <button
                disabled
                className="bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                🔒 Prime Access Only
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-sm whitespace-nowrap rounded px-3 py-1 z-10 shadow-lg">
                Only subscribed users can book in advance.
              </div>
            </div>
          ) : (
            <button
              className="mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
