// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBqiM8q3EuvRiXN1gDYcm4bqQP3wVcxVj0",
  authDomain: "event-connect-21ff4.firebaseapp.com",
  projectId: "event-connect-21ff4",
  storageBucket: "event-connect-21ff4.firebasestorage.app",
  messagingSenderId: "1007347494059",
  appId: "1:1007347494059:web:b42cab8154925a37e5dbee",
  measurementId: "G-4R16NHLDC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

// Set user session persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistence set to local"))
  .catch((error) => console.error("Persistence error:", error));
