import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Confetti Animation (simple floating circles) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-bounce-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg text-center border border-white/20">
        <h1 className="text-5xl font-extrabold text-orange-500 mb-4 animate-pulse">
          🎉 Thank You!
        </h1>
        <p className="text-lg text-white/90">
          Your booking has been successfully completed.
        </p>
        <p className="text-gray-300 mt-2">
          A confirmation has been sent to your email inbox.
        </p>

        <button
          onClick={() => navigate("/manage-bookings")}
          className="mt-8 px-8 py-3 rounded-full cursor-pointer font-semibold text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:scale-105 transform transition text-white shadow-md"
        >
          View My Tickets
        </button>
      </div>

      {/* Extra Sparkle Text (optional flair) */}
      <div className="absolute bottom-4 text-sm text-white/40 z-10">
        Powered by{" "}
        <span className="text-orange-400 font-semibold">EventConnect</span>
      </div>

      {/* Custom Bounce Animation */}
      <style>
        {`
          @keyframes bounce-slow {
            0% { transform: translateY(0) scale(1); opacity: 0.9; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 0.9; }
          }
          .animate-bounce-slow {
            animation: bounce-slow infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ThankYou;
