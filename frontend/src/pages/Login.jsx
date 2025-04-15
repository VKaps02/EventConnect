import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user-friendly error messages
  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "User not found. Please check your email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/network-request-failed":
        return "Network error. Please try again.";
      default:
        return "Login failed. Please try again.";
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login with email & password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = auth.currentUser;

      await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
      toast.error(getErrorMessage(err));
    }

    setLoading(false);
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;

      await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
      toast.error(getErrorMessage(err));
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-orange-500">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
          />

          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 cursor-pointer rounded-lg hover:bg-orange-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">Or login with</p>
          <button
            onClick={handleGoogleLogin}
            className={`mt-2 w-full flex items-center justify-center cursor-pointer bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign in with Google"}
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
