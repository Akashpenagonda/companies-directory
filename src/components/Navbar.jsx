// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 dark:bg-gray-900/60 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        <a href="#home" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Frontlines Companies
        </a>

        <div className="hidden md:flex items-center gap-5">
          <a href="#companies" className="text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-600">
            Companies
          </a>

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full">
            Contact
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800"
          >
            {open ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 p-4">
          <a href="#companies" className="block py-2">Companies</a>

          <button onClick={toggleTheme} className="block py-2">
            {dark ? "Switch to Light" : "Switch to Dark"}
          </button>

          <button className="block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full">
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
