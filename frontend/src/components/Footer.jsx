import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & About */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500">EventConnect</h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Your gateway to cultural experiences. Explore and book events
              worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-orange-400 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-orange-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-orange-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-orange-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-orange-400 transition">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex flex-wrap gap-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <FaLinkedinIn />
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Have questions? <br />
              <a
                href="mailto:support@eventconnect.com"
                className="text-orange-500 hover:text-orange-400 transition"
              >
                support@eventconnect.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} EventConnect. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
