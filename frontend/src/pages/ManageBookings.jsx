import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getUserBookings } from "../api.js";
import jsPDF from "jspdf";
import logo from "../assets/logo.jpeg"; // Adjust the path as necessary

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      const userId = user.uid;
      try {
        const data = await getUserBookings(userId);
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Failed to load bookings.");
        setBookings([]);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const generatePDF = async (booking) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 20;
    let y = 20;

    // Load logo (local JPEG or PNG)
    const logoBase64 = await loadImageAsBase64(logo);

    // Colors
    const primary = [255, 87, 34]; // Orange
    const darkText = [33, 33, 33];
    const gray = [100, 100, 100];

    // HEADER
    if (logoBase64) {
      doc.addImage(logoBase64, "JPEG", marginX, y, 30, 30);
    }

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primary);
    doc.text("EVENT TICKET", marginX + 35, y + 10);
    y += 35;

    // Divider
    doc.setDrawColor(...gray);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;

    // EVENT DETAILS
    doc.setFontSize(13);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "bold");
    doc.text("EVENT DETAILS", marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(`Event: ${booking.eventName}`, marginX, (y += 8));
    doc.text(
      `Date: ${new Date(booking.eventDate).toDateString()}`,
      marginX,
      (y += 8)
    );
    doc.text(`Time: ${booking.eventTime}`, marginX, (y += 8));
    doc.text(`Location: ${booking.eventLocation}`, marginX, (y += 8));

    // Divider
    y += 10;
    doc.setDrawColor(220);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;

    // BOOKING INFO
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gray);
    doc.text("BOOKING INFO", marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(`Name: ${booking.name}`, marginX, (y += 8));
    doc.text(`Email: ${booking.email}`, marginX, (y += 8));
    doc.text(`Tickets: ${booking.numberOfTickets}`, marginX, (y += 8));
    doc.text(`Total: $${booking.totalPrice}`, marginX, (y += 8));

    // Divider
    y += 10;
    doc.setDrawColor(220);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;

    // STATUS
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gray);
    doc.text("STATUS", marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(`Payment Status: ${booking.paymentStatus}`, marginX, (y += 8));
    doc.text(`Booking Status: ${booking.bookingStatus}`, marginX, (y += 8));

    // Footer divider
    y += 15;
    doc.setDrawColor(220);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;

    // Footer Message
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...primary);
    doc.text("Thank you for booking with EventConnect!", pageWidth / 2, y, {
      align: "center",
    });

    doc.save(`Ticket-${booking.eventName}.pdf`);
  };

  // Utility to convert image to base64
  const loadImageAsBase64 = (url) =>
    new Promise((resolve) => {
      if (!url) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 text-white">
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-4xl font-bold text-orange-500 mb-10 text-center drop-shadow-md">
          🎟 Your Bookings
        </h2>

        {loading && (
          <p className="text-gray-400 text-center text-lg">
            Loading bookings...
          </p>
        )}
        {error && <p className="text-red-400 text-center text-lg">{error}</p>}

        {!loading && bookings.length === 0 && (
          <p className="text-gray-400 text-center text-lg">
            No bookings found.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map(
            (booking) => (
              console.log(booking),
              (
                <div
                  key={booking._id}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-orange-400 mb-3">
                    {booking.eventName}
                  </h3>
                  <div className="text-gray-300 text-sm space-y-1 mb-4">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.eventDate).toDateString()}
                    </p>
                    <p>
                      <strong>Location:</strong> {booking.eventLocation}
                    </p>
                    <p>
                      <strong>Tickets:</strong> {booking.numberOfTickets}
                    </p>
                    <p>
                      <strong>Total:</strong> ${booking.totalPrice}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          booking.paymentStatus === "Completed"
                            ? "text-green-400 font-medium"
                            : "text-red-400 font-medium"
                        }
                      >
                        {booking.paymentStatus}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => generatePDF(booking)}
                    className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-auto transition"
                  >
                    Download Ticket PDF
                  </button>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
