"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/signup", formData);
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Something went wrong.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder-white focus:outline-none"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="w-full p-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder-white focus:outline-none"
            required
            onChange={handleChange}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg font-semibold shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>
        <p className="text-center text-white text-sm mt-6">
          Already have an account? <a href="/login" className="text-pink-300">Login</a>
        </p>
      </motion.div>
    </div>
  );
}