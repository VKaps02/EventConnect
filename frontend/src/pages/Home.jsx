import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "../components/About";
import { subscribeUser, checkSubscription } from "../api";
import SubscribeModal from "../components/SubscribeModal";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Home() {
  const [userId, setUserId] = useState(null);
 


  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <Nav />
      <Hero />
      
      <About />
      <Footer />
    </div>
  );
}
