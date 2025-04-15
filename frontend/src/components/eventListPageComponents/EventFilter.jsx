import { useState, useEffect } from "react";
import { HiFilter } from "react-icons/hi";

const EventFilter = ({ setFilters }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [isOpen, setIsOpen] = useState(false); // Mobile & Tablet toggle

  useEffect(() => {
    setFilters({
      category: category || "",
      location: location || "",
      date: date || "",
    });
  }, [category, location, date, setFilters]);

  return (
    <>
      {/* 🔽 Toggle Button for Mobile & Tablet */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden w-full bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold mb-4 flex items-center justify-center gap-2"
      >
        <HiFilter className="text-xl" />
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* 🔍 Filter Section - Hidden on Mobile & Tablet unless toggled, always visible on Desktop */}
      <aside
        className={`bg-gray-900 p-5 rounded-lg shadow-md space-y-4 transition-all duration-300 
          ${isOpen ? "block" : "hidden"} lg:block w-full md:w-1/2 lg:w-1/4`}
      >
        <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
          🎯 Filter Events
        </h2>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Concert">Concert</option>
            <option value="Sports">Sports</option>
            <option value="Theatre">Theatre</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <select
            className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Calgary">Calgary</option>
            <option value="Montreal">Montreal</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </aside>
    </>
  );
};

export default EventFilter;
