import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../api";
import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [category]);

  const fetchEvents = async () => {
    const { data } = await getEvents({ category }, true);
    setEvents(data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You need to log in as an admin to delete events.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (error) {
        console.error("Delete Error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Manage Events
          </h1>
          <button
            onClick={() => navigate("/admin/add-event")}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition duration-200"
          >
            + Add New Event
          </button>
        </div>

        {/* Filter */}
        <div className="mb-8 max-w-xs">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Concert">Concert</option>
            <option value="Sports">Sports</option>
            <option value="Theatre">Theatre</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        {/* Events List */}
        {events.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <li
                key={event._id}
                onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Image */}
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-[200px] object-cover rounded-t-2xl"
                  />
                )}

                {/* Details */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {event.name}
                  </h2>
                  <p className="text-sm text-gray-700 mb-4">
                    {event.description.length > 100
                      ? event.description.substring(0, 100) + "..."
                      : event.description}
                  </p>
                  <div className="text-sm text-gray-800 space-y-1 mb-4">
                    <p>
                      📅{" "}
                      {new Date(event.date).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                      })}
                    </p>
                    <p>📍 {event.location}</p>
                    <p>💵 ${event.price}</p>
                    <p>🎭 {event.category}</p>
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 mt-16 text-lg">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
