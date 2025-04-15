import { useState } from "react";
import { createEvent } from "../api";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    price: 0,
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setEvent({ ...event, image: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setEvent({ ...event, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(event);
    navigate("/admin/events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-blue-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Add New Event
          </h2>
          <button
            onClick={() => navigate("/admin/events")}
            type="button"
            className="text-sm text-blue-600 cursor-pointer hover:underline"
          >
            ← Back to Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter event name"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              name="location"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select City</option>
              <option value="Toronto">Toronto</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Calgary">Calgary</option>
              <option value="Montreal">Montreal</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Concert">Concert</option>
              <option value="Sports">Sports</option>
              <option value="Theatre">Theatre</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-[6px] border border-gray-300 rounded-md shadow-sm file:bg-blue-50 file:text-blue-600 file:border-none file:px-3 file:py-1 file:rounded file:cursor-pointer hover:file:bg-blue-100"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="md:col-span-2 mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-sm mx-auto rounded-lg shadow-md object-cover"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter event description"
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
