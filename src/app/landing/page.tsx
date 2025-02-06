"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTasks, FaRocket, FaSignInAlt } from "react-icons/fa";
import Footer from "../../Components/Footer";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-700 to-purple-900 text-white">
      {/* 🔹 Header Section */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/10 shadow-md">
        <h1 className="text-2xl font-bold">🌟 Task Manager</h1>
        <button
          onClick={() => router.push("/login")}
          className="bg-green-500 px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Sign In
        </button>
      </header>

      {/* 🔹 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center flex-grow text-center p-6"
      >
        <h1 className="text-5xl font-bold mb-4">Manage Your Tasks Effortlessly</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Stay organized, track your progress, and boost productivity with our easy-to-use task manager.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/login")}
          className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 text-lg hover:bg-green-600 transition"
        >
          <FaSignInAlt /> Get Started
        </motion.button>
      </motion.section>

      {/* 🔹 Features Section */}
      <section className="py-16 px-6 bg-white/10">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 bg-white/10 rounded-lg shadow-lg text-center"
          >
            <FaTasks className="text-4xl text-yellow-400 mb-3" />
            <h3 className="text-xl font-semibold">Task Management</h3>
            <p className="text-gray-300 text-sm">Create, edit, and complete tasks with ease.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 bg-white/10 rounded-lg shadow-lg text-center"
          >
            <FaCheckCircle className="text-4xl text-green-400 mb-3" />
            <h3 className="text-xl font-semibold">Stay Organized</h3>
            <p className="text-gray-300 text-sm">Sort by priority and track completion.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 bg-white/10 rounded-lg shadow-lg text-center"
          >
            <FaRocket className="text-4xl text-blue-400 mb-3" />
            <h3 className="text-xl font-semibold">Boost Productivity</h3>
            <p className="text-gray-300 text-sm">Achieve more with an intuitive workflow.</p>
          </motion.div>
        </div>
      </section>

      {/* 🔹 Call-to-Action (CTA) Section */}
      <motion.section
        whileHover={{ scale: 1.02 }}
        className="py-12 px-6 text-center bg-green-500 text-white shadow-md"
      >
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-lg text-white/80 mt-2">Sign up now and take control of your tasks.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/login")}
          className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 text-lg hover:bg-gray-200 transition"
        >
          <FaSignInAlt /> Start Now
        </motion.button>
      </motion.section>

      {/* 🔹 Footer Section */}
      <Footer darkMode={false} />
    </div>
  );
}