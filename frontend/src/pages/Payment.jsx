import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(handlePayment, 3000); // Simulate 3-sec processing
  }, []);

  const handlePayment = async () => {
    try {
      await axios.post("/api/payments/dummy-payment", { bookingId });
      alert("Payment successful! Booking confirmed.");
      navigate("/manage-bookings");
    } catch (error) {
      alert("Payment failed. Please try again.");
      navigate("/book-event");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">Processing Payment...</h2>
        <p className="text-gray-600 mt-2">
          Please wait while we confirm your booking.
        </p>
      </div>
    </div>
  );
};

export default Payment;
