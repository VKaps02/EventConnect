import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import concert from "../../assets/concert.jpg";
import conference from "../../assets/conference.jpg";
import sports from "../../assets/sports.jpg";
import theatre from "../../assets/theatre.jpg";

const events = [
  {
    title: "Concerts",
    description:
      "Experience the magic of live music with electrifying performances, stunning visuals, and unforgettable vibes.",
    image: concert,
  },
  {
    title: "Conference",
    description:
      "Engage in thought-provoking discussions, network with industry leaders, and gain insights from experts.",
    image: conference,
  },
  {
    title: "Sports Event",
    description:
      "Feel the adrenaline rush as top athletes compete in thrilling matches and unforgettable moments.",
    image: sports,
  },
  {
    title: "Theatre",
    description:
      "Immerse yourself in drama, comedy, and spectacular performances through captivating storytelling.",
    image: theatre,
  },
];

const EventHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Image */}
      <motion.div
        key={activeIndex}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${events[activeIndex].image})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-20 max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="max-w-xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-orange-500 font-bold">
            {events[activeIndex].title}
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            {events[activeIndex].description}
          </p>
        </div>
      </motion.div>

      {/* Carousel - only visible on large screens */}
      <div className="hidden lg:block absolute bottom-12 right-10 w-[500px] z-20">
        <Swiper
          slidesPerView={3.5}
          spaceBetween={16}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className={`cursor-pointer p-2 rounded-2xl shadow-md transition-all duration-300 ${
                  activeIndex === index ? "scale-105" : "scale-95"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <p className="text-center text-white mt-2 text-base">
                  {event.title}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EventHero;
