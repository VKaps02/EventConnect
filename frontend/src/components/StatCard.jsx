import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatCard = ({ title, end, delay, separator }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className="p-10 bg-gray-900 rounded-full shadow-lg flex flex-col items-center justify-center w-44 h-44 mx-auto border-1 border-orange-500"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className="text-4xl font-bold text-orange-500">
        {inView ? (
          <CountUp start={0} end={end} duration={2.5} separator={separator} />
        ) : (
          "0"
        )}
      </h3>
      <p className="text-gray-400 mt-2">{title}</p>
    </motion.div>
  );
};

export default StatCard;
