import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Nav from "./components/Nav";
import AdminNav from "./components/AdminNav";
import AdminEvents from "./pages/AdminEvents";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Payment from "./pages/Payment";
import ManageBookings from "./pages/ManageBookings";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import BookEvent from "./pages/BookEvent";
import ThankYou from "./pages/ThankYou";
import CityHighlights from "./pages/CityHighlights";

// Check if admin is authenticated
const isAdminAuthenticated = () => {
  return !!localStorage.getItem("adminToken");
};

const App = () => {
  const location = useLocation();

  // Show AdminNav only for "/admin/*" routes, otherwise show Nav
  const showAdminNav = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen">
      {showAdminNav ? <AdminNav /> : <Nav />}

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city-highlights" element={<CityHighlights />} />
        <Route path="/events-list" element={<EventList />} />
        <Route path="/event/:eventId" element={<EventDetails />} />{" "}
        {/* ✅ Dynamic Event Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/book-event/:eventId" element={<BookEvent />} />
        <Route path="/thank-you" element={<ThankYou />} />{" "}
        {/* ✅ Add Thank You Route */}
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Protected Route for Admin */}
        <Route
          path="/admin/events"
          element={
            isAdminAuthenticated() ? (
              <AdminEvents />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/add-event"
          element={
            isAdminAuthenticated() ? (
              <AddEvent />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/edit-event/:id"
          element={
            isAdminAuthenticated() ? (
              <EditEvent />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        {/* 404 Not Found - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
