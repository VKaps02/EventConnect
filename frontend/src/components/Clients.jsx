import { motion } from "framer-motion";

const clients = [
  { name: "Ticketmaster", logo: "../src/assets/ticketmaster.svg" },
  { name: "Eventbrite", logo: "../src/assets/eventbrite.svg" },
  { name: "Live Nation", logo: "../src/assets/livenation.svg" },
  { name: "Red Bull", logo: "../src/assets/redbull.svg" },
  { name: "Coachella", logo: "../src/assets/coachella.svg" },
  { name: "Ultra Music Festival", logo: "../src/assets/umf.svg" },
  { name: "Tomorrowland", logo: "../src/assets/tomorrowland.svg" },
];

export default function Clients() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* ✅ Orange-to-Transparent Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          Trusted by Global Event Leaders
        </h2>

        {/* ✅ Auto-Scrolling Client Logos */}
        <div className="w-full flex overflow-hidden">
          <motion.div
            className="flex items-center space-x-12 min-w-[100%] animate-scroll"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {clients.map((client, index) => (
              <img
                key={index}
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
