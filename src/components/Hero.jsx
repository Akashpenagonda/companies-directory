import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-20 dark:bg-gradient-to-b dark:from-[#0f0f11] dark:to-[#121214]">
      <div className="container-max text-center">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Discover Top Companies <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Instantly</span>
        </motion.h1>

        <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }} className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse, filter and explore verified companies with a futuristic interface.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8">
          <a href="#companies" className="px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">Explore Companies</a>
        </motion.div>
      </div>
    </section>
  );
}
