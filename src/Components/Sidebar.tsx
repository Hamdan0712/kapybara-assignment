"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

interface SidebarProps {
  className?: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, darkMode, toggleDarkMode }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tasks");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full w-64 flex flex-col shadow-lg transition-colors duration-300 ${darkMode ? "bg-gray-100 text-gray-900 border-r border-gray-300" : "bg-gray-900 text-white border-gray-700"} ${className}`}
    >
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold p-6 border-b">Task Manager</h2>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-4">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`py-3 px-4 text-left rounded-lg transition-all ${
            activeTab === "tasks" ? "bg-blue-600 text-white" : darkMode ? "hover:bg-gray-200" : "hover:bg-gray-700"
          }`}
        >
          📋 All Tasks
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`py-3 px-4 text-left rounded-lg transition-all ${
            activeTab === "completed" ? "bg-green-600 text-white" : darkMode ? "hover:bg-gray-200" : "hover:bg-gray-700"
          }`}
        >
          ✅ Completed Tasks
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`py-3 px-4 text-left rounded-lg transition-all ${
            activeTab === "calendar" ? "bg-purple-600 text-white" : darkMode ? "hover:bg-gray-200" : "hover:bg-gray-700"
          }`}
        >
          📅 Calendar View
        </button>

        {/* Toggle Dark Mode Button */}
        <button
          onClick={toggleDarkMode}
          className="mt-4 py-3 px-4 text-left rounded-lg font-semibold shadow-md border transition-all
            bg-gray-800 text-white border-gray-600 hover:bg-gray-700
            dark:bg-gray-200 dark:text-gray-900 dark:border-gray-400 dark:hover:bg-gray-300"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto py-3 px-4 text-left rounded-lg bg-red-600 hover:bg-red-700 transition-all"
        >
          🔒 Logout
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;