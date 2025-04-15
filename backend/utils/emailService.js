import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail (or your SMTP provider)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App Password (Not your personal password)
  },
});

// ✅ Function to send booking confirmation email
export const sendBookingConfirmation = async (toEmail, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "🎟️ Event Booking Confirmation - EventConnect",
    html: `
      <h2>🎉 Thank You for Booking Your Event!</h2>
      <p>Dear <strong>${bookingDetails.name}</strong>,</p>
      <p>Your booking for <strong>${
        bookingDetails.eventName
      }</strong> has been successfully confirmed.</p>
      <p><strong>📅 Event Date:</strong> ${new Date(
        bookingDetails.eventDate
      ).toDateString()}</p>
      <p><strong>📍 Location:</strong> ${bookingDetails.eventLocation}</p>
      <p><strong>🎫 Number of Tickets:</strong> ${
        bookingDetails.numberOfTickets
      }</p>
      <p><strong>💲 Total Price:</strong> $${bookingDetails.totalPrice}</p>
      <br>
      <p>Enjoy your event! 🎊</p>
      <p>Best Regards, <br> <strong>EventConnect Team</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Booking confirmation email sent!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
