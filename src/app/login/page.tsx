"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
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
      const response = await axios.post("/api/auth/login", formData);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
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
            placeholder="Enter your password"
            className="w-full p-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder-white focus:outline-none"
            required
            onChange={handleChange}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white p-3 rounded-lg font-semibold shadow-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <p className="text-center text-white text-sm mt-6">
          Don't have an account? <a href="/signup" className="text-green-300">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}