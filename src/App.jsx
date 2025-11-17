import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/*  Home.jsx already includes Hero */}
      <main className="flex-1">
        <Home />
      </main>

      <Footer />
    </div>
  );
}
