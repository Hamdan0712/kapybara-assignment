"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

interface SidebarProps {
    className?: string;
  }
  const Sidebar: React.FC<SidebarProps> = ({ className }) => {
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
      className={`fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-lg flex flex-col text-white ${className}`}
    >
      <h2 className="text-2xl font-bold p-6 border-b border-gray-700">Task Manager</h2>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-4">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`py-3 px-4 text-left rounded-lg ${
            activeTab === "tasks" ? "bg-blue-600" : "hover:bg-gray-700"
          }`}
        >
          📋 All Tasks
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`py-3 px-4 text-left rounded-lg ${
            activeTab === "completed" ? "bg-green-600" : "hover:bg-gray-700"
          }`}
        >
          ✅ Completed Tasks
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`py-3 px-4 text-left rounded-lg ${
            activeTab === "calendar" ? "bg-purple-600" : "hover:bg-gray-700"
          }`}
        >
          📅 Calendar View
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto py-3 px-4 text-left rounded-lg bg-red-600 hover:bg-red-700"
        >
          🔒 Logout
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;