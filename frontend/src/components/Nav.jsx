import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { checkSubscription, subscribeUser } from "../api";
import SubscribeModal from "../components/SubscribeModal";

export default function Nav() {
  const [navBackground, setNavBackground] = useState("bg-transparent");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const res = await checkSubscription(currentUser.uid);
          setIsSubscribed(res.isSubscribed);
        } catch (err) {
          console.error("Failed to check subscription", err);
        } finally {
          setLoading(false);
        }
      } else {
        setIsSubscribed(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // const handleSubscribe = async () => {
  //   try {
  //     await subscribeUser(user.uid);
  //     setIsSubscribed(true);
  //     setShowModal(false);
  //   } catch (err) {
  //     console.error("Subscription failed", err);
  //   }
  // };

  const handleSubscribe = async () => {
    try {
      await subscribeUser(user.uid);
      const res = await checkSubscription(user.uid);
      setIsSubscribed(res.isSubscribed); // Only update from actual check
      setShowModal(false);
      window.location.reload(); // Reload to reflect changes
    } catch (err) {
      console.error("Subscription failed", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(
        window.scrollY > 50 ? "bg-gray-900 shadow-lg" : "bg-transparent"
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 z-50 ${navBackground}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="../assets/logo.jpeg"
            alt="EventConnect"
            className="h-12 w-auto"
          />
          <h1 className="text-3xl font-bold text-orange-500">EventConnect</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-white text-lg hover:text-orange-400 transition"
          >
            Home
          </Link>
          <Link
            to="/events-list"
            className="text-white text-lg hover:text-orange-400 transition"
          >
            Events
          </Link>
          <Link
            to="/city-highlights"
            className="text-white text-lg hover:text-orange-400 transition"
          >
            City Highlights
          </Link>
          <Link
            to="/manage-bookings"
            className="text-white text-lg hover:text-orange-400 transition"
          >
            My Bookings
          </Link>

          {!loading &&
            user &&
            (isSubscribed ? (
              <Link
                to="#"
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500 text-white px-4 py-2 rounded-xl shadow-md border-2 border-yellow-300 animate-pulse flex items-center space-x-2 hover:scale-105 transition transform"
              >
                <span className="text-sm font-semibold">👑 Prime Member</span>
              </Link>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 bg-white font-bold text-black cursor-pointer rounded-lg text-sm hover:scale-105 transition transform"
              >
                Get Prime Access
              </button>
            ))}
          {user && (
            <span className="text-white font-medium text-lg">
              Welcome, {user.displayName || user.email.split("@")[0]} 👋
            </span>
          )}

          {/* Auth Button (Desktop) */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 cursor-pointer text-white rounded-lg text-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-orange-500 cursor-pointer text-white rounded-lg text-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="lg:hidden text-white text-3xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <HiMenu />
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-gray-900 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <HiX />
        </button>

        <Link
          to="/"
          className="text-white text-2xl hover:text-orange-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/events-list"
          className="text-white text-2xl hover:text-orange-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          Events
        </Link>
        <Link
          to="/city-highlights"
          className="text-white text-2xl hover:text-orange-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          City Highlights
        </Link>
        <Link
          to="/manage-bookings"
          className="text-white text-2xl hover:text-orange-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          My Bookings
        </Link>

        {!loading &&
          user &&
          (isSubscribed ? (
            <Link
              to="#"
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500 text-white px-4 py-2 rounded-xl shadow-md border-2 border-yellow-300 animate-pulse flex items-center space-x-2 hover:scale-105 transition transform"
            >
              <span className="text-sm font-semibold">👑 Prime Member</span>
            </Link>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-white font-bold text-black cursor-pointer rounded-lg text-sm hover:scale-105 transition transform"
            >
              Get Prime Access
            </button>
          ))}

        {/* Auth Button (Mobile) */}
        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="px-5 py-3 bg-red-500 cursor-pointer text-white rounded-lg text-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-5 py-3 bg-orange-500 cursor-pointer text-white rounded-lg text-xl hover:bg-orange-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>

      {/* Subscribe Modal */}
      {showModal && (
        <SubscribeModal
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </nav>
  );
}
