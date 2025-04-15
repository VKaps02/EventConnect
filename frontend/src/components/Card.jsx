import React, { useState } from "react";
import { motion } from "framer-motion";
import exploreFestivities from "../assets/explore_festivities.jpg";
import culturalWorkshop from "../assets/cultural_workshop.jpg";
import livePerformances from "../assets/live_performances.jpg";
import foodTraditions from "../assets/food_&_traditions.jpg";

const cards = [
  {
    id: 1,
    image: exploreFestivities,
    title: "Explore Festivities",
    description: "Experience vibrant cultural celebrations from around the world.",
  },
  {
    id: 2,
    image: culturalWorkshop,
    title: "Cultural Workshops",
    description: "Learn traditional crafts, dance, and heritage from experts.",
  },
  {
    id: 3,
    image: livePerformances,
    title: "Live Performances",
    description: "Enjoy breathtaking live music, dance, and theater performances.",
  },
  {
    id: 4,
    image: foodTraditions,
    title: "Food & Traditions",
    description: "Taste authentic dishes and explore diverse culinary traditions.",
  },
];

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Card = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="relative w-60 h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
          onMouseEnter={() => setHoveredId(card.id)}
          onMouseLeave={() => setHoveredId(null)}
          animate={{
            scale: hoveredId === card.id ? 1.08 : 1,
            filter: hoveredId && hoveredId !== card.id ? "blur(4px)" : "blur(0px)",
            opacity: hoveredId && hoveredId !== card.id ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <img
            src={card.image}
            alt={card.title}
            className="absolute w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Title (Moves Up on Hover) */}
          <motion.div
            className="absolute bottom-6 left-4 text-white w-full"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: hoveredId === card.id ? -50 : 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-lg font-bold drop-shadow-lg">{card.title}</h3>
          </motion.div>

          {/* Description (Slides Up from Below on Hover) */}
          <motion.div
            className="absolute bottom-6 left-4 text-white w-full pr-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{
              y: hoveredId === card.id ? -5 : 30,
              opacity: hoveredId === card.id ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-sm opacity-80">{truncateText(card.description, 50)}</p>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default Card;
