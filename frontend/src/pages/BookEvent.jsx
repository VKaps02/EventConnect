import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createBooking } from "../api";

const BookEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    console.log("🔍 Current User:", user);

    if (user) setUserId(user.uid);
  }, []);

  if (!state)
    return <p className="text-white text-center mt-10">No event selected.</p>;

  const { event, quantity = 1 } = state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberOfTickets: quantity,
    paymentMethod: "Credit Card",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.numberOfTickets || formData.numberOfTickets < 1)
      newErrors.numberOfTickets = "Must book at least 1 ticket";

    if (formData.paymentMethod === "Credit Card") {
      if (!formData.cardHolder.trim())
        newErrors.cardHolder = "Cardholder name is required";
      if (!/^\d{16}$/.test(formData.cardNumber))
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Expiry must be in MM/YY format";
      } else {
        const [month, year] = formData.expiry.split("/").map(Number);
        const now = new Date();
        const expiryDate = new Date(2000 + year, month); // month is 0-indexed

        if (isNaN(expiryDate.getTime()) || expiryDate <= now) {
          newErrors.expiry = "Card is expired";
        }
      }
      if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const totalPrice = event.price * Number(formData.numberOfTickets);

    const bookingData = {
      userId,
      eventId: event._id,
      name: formData.name,
      email: formData.email,
      eventName: event.name,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventPrice: event.price,
      eventCategory: event.category,
      numberOfTickets: formData.numberOfTickets,
      totalPrice,
      paymentMethod: formData.paymentMethod,
      paymentStatus: "Completed",
      bookingStatus: "Confirmed",
      cardHolder: formData.cardHolder,
      cardNumber: formData.cardNumber,
      expiry: formData.expiry,
      cvv: formData.cvv,
    };

    try {
      await createBooking(bookingData);
      alert("🎉 Booking Successful!");
      navigate("/thank-you");
    } catch (error) {
      console.error("❌ Error booking event:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent"></div>
          <p className="text-white mt-4 absolute bottom-1/3 text-lg font-semibold">
            Processing Payment...
          </p>
        </div>
      )}
      <div className="relative w-full min-h-screen pt-24 bg-gray-900 text-white px-4">
        <div className="absolute inset-0">
          <img
            src={event.imageUrl || "https://via.placeholder.com/800"}
            alt={event.name}
            className="w-full h-full object-cover brightness-50 blur-sm"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto bg-black/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-400 mb-8">
            Complete Your Booking
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <img
                src={event.imageUrl || "https://via.placeholder.com/800"}
                alt={event.name}
                className="w-full h-56 object-cover rounded-lg shadow mb-4"
              />
              <p>
                📅 <strong>Date:</strong> {new Date(event.date).toDateString()}
              </p>
              <p>
                📍 <strong>Location:</strong> {event.location}
              </p>
              <p>
                💵 <strong>Price per Ticket:</strong> ${event.price}
              </p>
              <p>
                🎟️ <strong>Tickets:</strong> {formData.numberOfTickets}
              </p>
              <p className="text-orange-300 font-bold mt-2">
                Total Price: ${event.price * formData.numberOfTickets}
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block">Full Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Tickets */}
              <div>
                <label className="block">Tickets:</label>
                <input
                  type="number"
                  name="numberOfTickets"
                  value={formData.numberOfTickets}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  min="1"
                />
                {errors.numberOfTickets && (
                  <p className="text-red-500 text-sm">
                    {errors.numberOfTickets}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block">Payment Method:</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                >
                  <option>Credit Card</option>
                </select>
              </div>

              {/* Credit Card Details */}
              {formData.paymentMethod === "Credit Card" && (
                <>
                  <div>
                    <label className="block">Cardholder Name:</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-800 text-white rounded"
                    />
                    {errors.cardHolder && (
                      <p className="text-red-500 text-sm">
                        {errors.cardHolder}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block">Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-800 text-white rounded"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block">Expiry (MM/YY):</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded"
                      />
                      {errors.expiry && (
                        <p className="text-red-500 text-sm">{errors.expiry}</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label className="block">CVV:</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-white rounded"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold text-lg rounded transition"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookEvent;
