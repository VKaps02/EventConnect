import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Clients from "./Clients";
import Card from "./Card";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center text-left">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="../src/assets/home_hero.mp4" type="video/mp4" />
        </video>

        {/* Improved Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>

        {/* Content - Aligned Left with responsive padding */}
        <motion.div
          className="relative z-20 max-w-2xl px-4 sm:px-8 md:px-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-500 drop-shadow-lg leading-normal">
            Celebrate Culture & Traditions
          </h1>
          <p className="mt-4 text-lg text-gray-300 leading-normal">
            Discover vibrant cultural events happening around you.
          </p>
          <motion.button
            className="mt-6 px-6 py-3 cursor-pointer bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition focus:ring-4 focus:ring-orange-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/events-list")}
          >
            Explore Events
          </motion.button>
        </motion.div>

        {/* Clients Section Positioned at Bottom */}
        <div className="absolute bottom-0 w-full">
          <Clients />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-orange-500 mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Experience Cultural Diversity
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover events that celebrate the rich traditions, music, food, and
          art of cultures...
        </motion.p>

        {/* Flex Container to Wrap Cards */}
        <div
          className="flex flex-wrap justify-center gap-8 px-4"
          onClick={() => navigate("/events-list")}
        >
          <Card />
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Don't miss out on these incredible experiences! Find an event near
            you and immerse yourself in the beauty of global cultures.
          </p>
          <motion.button
            className="px-8 py-4 bg-orange-500 cursor-pointer text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition focus:ring-4 focus:ring-orange-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/events-list")}
          >
            Explore Events
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
