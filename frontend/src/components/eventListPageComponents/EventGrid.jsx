import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getEvents } from "../../api";

const EventGrid = ({ filters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await getEvents(filters);
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      }
      setLoading(false);
    };

    fetchEvents();
  }, [filters]);

  if (loading)
    return <p className="text-white text-center py-10">Loading events...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 pb-10">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event._id} event={event} />)
      ) : (
        <p className="text-white text-center col-span-full">No events found</p>
      )}
    </div>
  );
};

export default EventGrid;
