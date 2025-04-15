import React from "react";
import { motion } from "framer-motion";
import calgary from "../assets/calgary.jpg";
import toronto from "../assets/toronto.jpg";
import montreal from "../assets/montreal.jpg";
import vancouver from "../assets/vancouver.jpg";
import Footer from "../components/Footer";

const cityData = [
  {
    name: "Toronto",
    image: toronto,
    description:
      "Toronto, Canada's largest city, is a cultural melting pot known for its iconic skyline and diverse neighborhoods. Whether you're exploring arts, food, or waterfront attractions, Toronto never disappoints.",
    highlights: [
      "CN Tower",
      "Royal Ontario Museum",
      "Toronto Islands",
      "Ripley's Aquarium",
    ],
  },
  {
    name: "Calgary",
    image: calgary,
    description:
      "Nestled near the Rocky Mountains, Calgary is famous for its cowboy culture and the Calgary Stampede. Enjoy historic sites and scenic river walks across this dynamic Albertan city.",
    highlights: [
      "Calgary Tower",
      "Heritage Park",
      "Calgary Zoo",
      "Prince's Island Park",
    ],
  },
  {
    name: "Vancouver",
    image: vancouver,
    description:
      "Vancouver is a coastal gem surrounded by mountains and ocean. From nature to nightlife, it’s a city where adventure meets luxury.",
    highlights: [
      "Stanley Park",
      "Granville Island",
      "Capilano Bridge",
      "Grouse Mountain",
    ],
  },
  {
    name: "Montreal",
    image: montreal,
    description:
      "Montreal blends old-world charm with modern sophistication. Known for its festivals and French flair, it’s a vibrant cultural hub in Quebec.",
    highlights: [
      "Old Montreal",
      "Mount Royal",
      "Notre-Dame Basilica",
      "Jean-Talon Market",
    ],
  },
];

const CityHighlights = () => {
  return (
    <div className="bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-orange-500 text-center py-12 pt-20">
        Discover Canada's Top Cities
      </h2>

      {cityData.map((city, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={city.name}
            className="relative mb-16"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
          >
            <div
              className={`flex flex-col md:flex-row ${
                isEven ? "" : "md:flex-row-reverse"
              } items-center`}
            >
              {/* City Image */}
              <div className="relative md:w-1/2 w-full h-[400px] md:h-[500px]">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* City Info Panel */}
              <motion.div
                className={`md:w-1/2 w-full p-6 sm:p-10 bg-white/10 bg-gradient-to-r from-black/50 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl mx-4 z-10 shadow-lg ${
                  isEven ? "md:-ml-16" : "md:-mr-16"
                }`}
                initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              >
                <h3 className="text-3xl font-bold text-orange-400 mb-2">
                  {city.name}
                </h3>
                <p className="text-gray-200 italic mb-4">{city.description}</p>
                <p className="text-orange-300 font-semibold mb-2">
                  Top places to visit:
                </p>
                <ul className="space-y-2">
                  {city.highlights.map((place, i) => (
                    <li
                      key={i}
                      className="text-white text-lg before:content-['🌟'] before:mr-2"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      <Footer />
    </div>
  );
};

export default CityHighlights;
