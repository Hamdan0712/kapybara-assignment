"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTasks, FaRocket, FaSignInAlt } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-700 to-purple-900 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Manage Your Tasks Effortlessly</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Stay organized, track your progress, and boost productivity with our easy-to-use task manager.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Call-to-Action Section */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/login")}
        className="mt-12 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 text-lg hover:bg-green-600 transition"
      >
        <FaSignInAlt /> Get Started
      </motion.button>
    </div>
  );
}