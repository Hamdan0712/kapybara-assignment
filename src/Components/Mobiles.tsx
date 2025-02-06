"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

interface MobileSidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ darkMode, toggleDarkMode }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Toggle for mobile sidebar

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      {/* ✅ Toggle Button for Mobile Sidebar */}
      <button
        className="fixed top-5 left-5 z-50 md:hidden bg-gray-800 text-white px-3 py-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰ Menu
      </button>

      {/* ✅ Sidebar with Slide-in Animation */}
      <motion.div
        initial={{ x: "-100%" }} // 🔥 Fully hidden initially
        animate={{ x: isOpen ? "0%" : "-100%" }} // 🔥 Slides in/out completely
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full w-64 shadow-lg flex flex-col z-50 transition-all 
          ${darkMode ? "bg-gray-100 text-gray-900 border-r border-gray-300" : "bg-gray-900 text-white border-gray-700"} 
          md:hidden`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold p-6 border-b">Task Manager</h2>

        {/* ✅ Navigation Links */}
        <nav className="flex flex-col p-4 space-y-4">
          <button className="py-3 px-4 text-left rounded-lg hover:bg-gray-700">📋 All Tasks</button>
          <button className="py-3 px-4 text-left rounded-lg hover:bg-gray-700">✅ Completed Tasks</button>
          <button className="py-3 px-4 text-left rounded-lg hover:bg-gray-700">📅 Calendar View</button>

          {/* ✅ Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="py-3 px-4 text-left rounded-lg font-semibold shadow-md border transition-all bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* ✅ Logout Button */}
          <button onClick={handleLogout} className="py-3 px-4 text-left rounded-lg bg-red-600 hover:bg-red-700">
            🔒 Logout
          </button>
        </nav>
      </motion.div>
    </>
  );
};

export default MobileSidebar;