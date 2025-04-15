import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/about_image.jpg"; // Ensure the image exists
import StatCard from "./StatCard";

const About = () => {
  return (
    <section className="bg-gray-800 py-20 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Text Content */}
        <motion.div
          className="md:w-1/2 px-4 md:px-10 text-center md:text-justify"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-5xl font-bold text-orange-500 mb-6">
            About EventConnect
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            EventConnect brings people together through cultural experiences.
            Whether you're looking for festivals, workshops, or live
            performances, we help you explore and celebrate traditions from
            around the world.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Our platform is designed to make discovering and attending cultural
            events easy and enjoyable. Join us in embracing the diversity of
            cultures and traditions.
          </p>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={aboutImage}
            alt="Event Connect About"
            className="rounded-2xl shadow-lg w-full max-w-md md:max-w-lg"
          />
        </motion.div>
      </div>

      {/* Animated Impact Section */}
      <div className="container mx-auto mt-12">
        <h3 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Our Impact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatCard title="Cultural Festivals" end={50} delay={0} />
          <StatCard title="Attendees" end={100000} delay={0.2} separator="," />
          <StatCard title="Event Partners" end={100} delay={0.4} />
          <StatCard title="Events Hosted" end={200} delay={0.6} />
        </div>
      </div>
    </section>
  );
};

export default About;
