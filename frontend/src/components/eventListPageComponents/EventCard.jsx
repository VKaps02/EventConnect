import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const maxLength = 100; // Maximum number of characters
  const truncatedDescription =
    event.description.length > maxLength
      ? event.description.substring(0, maxLength) + "..."
      : event.description;

  return (
    <motion.div
      className="relative bg-gray-900 rounded-lg overflow-hidden shadow-md cursor-pointer transition transform hover:scale-105 w-full md:w-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/event/${event._id}`}>
        {/* Event Image */}
        <img
          src={event.imageUrl || "https://via.placeholder.com/400"}
          alt={event.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
          {event.category}
        </span>

        {/* Content */}
        <div className="p-4 text-white">
          <h3 className="text-lg font-bold text-orange-400">{event.name}</h3>
          <p className="text-sm text-gray-300 mt-1">{truncatedDescription}</p>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="bg-[#024959] text-gray-200 px-2 py-1 rounded-md">
              📅{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
            </span>
            <span className="bg-[#024959] text-gray-200 px-2 py-1 rounded-md">
              ⏰ {event.time}
            </span>
          </div>

          {/* Location & Price */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-300 text-sm">📍 {event.location}</span>
            <span className="text-lg font-semibold text-orange-400">
              ${event.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
