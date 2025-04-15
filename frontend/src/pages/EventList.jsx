import EventHero from "../components/eventListPageComponents/EventHero";
import EventGrid from "../components/eventListPageComponents/EventGrid";
import EventFilter from "../components/eventListPageComponents/EventFilter";
import Footer from "../components/Footer";
import { useState } from "react";

const EventList = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="bg-gray-800">
      <EventHero />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-8">
        <EventFilter setFilters={setFilters} />
        <EventGrid filters={filters} />
      </div>

      <Footer />
    </div>
  );
};

export default EventList;
