import axios from "axios";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = "https://eventconnect-woc3.onrender.com/api/events";
const API_URL_BOOKING = "https://eventconnect-woc3.onrender.com/api/bookings";

export const getCurrentUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Cleanup listener
      resolve(user); // Return the user (or null)
    });
  });

// fetch events from the backend
export const getEvents = async (filters = {}, showAll = false) => {
  console.log(
    "🔍 Fetching events with filters:",
    filters,
    "Show all:",
    showAll
  );

  const user = await getCurrentUser();
  const uid = user?.uid || "";

  const queryParams = {
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    ),
    userId: uid,
  };

  if (showAll) queryParams.showAll = true;

  return axios.get(API_URL, { params: queryParams });
};

// ✅ Fetch event details by ID
export const getEventById = async (id) => {
  const user = await getCurrentUser();
  const uid = user?.uid || "";

  return axios.get(`${API_URL}/${id}`, {
    params: { userId: uid },
  });
};

// Create, update, and delete events
export const createEvent = async (event) => {
  const formData = new FormData();
  for (const key in event) {
    formData.append(key, event[key]);
  }
  return axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateEvent = async (id, event) => {
  const formData = new FormData();
  for (const key in event) {
    formData.append(key, event[key]);
  }

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEvent = async (id) => {
  const token = localStorage.getItem("adminToken"); // Ensure admin token is stored in localStorage
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Fetch bookings for a specific user (by Firebase UID)
export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_BOOKING}/user/${userId}`);
    return response.data; // ✅ Ensure response is correctly returned
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    return []; // ✅ Prevent frontend crash by returning an empty array
  }
};

// ✅ Create a new booking
export const createBooking = async (bookingData) => {
  return axios.post(API_URL_BOOKING, bookingData);
};

export async function subscribeUser(userId) {
  const response = await fetch(`/api/users/${userId}/subscribe`, {
    method: "POST",
  });
  return response.json();
}

export async function checkSubscription(userId) {
  const response = await fetch(`/api/users/${userId}/subscription`);
  return response.json();
}
