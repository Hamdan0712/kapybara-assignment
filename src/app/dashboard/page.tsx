"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; 
import Sidebar from "../../Components/Sidebar"; 


export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string; priority: number }[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [sortBy, setSortBy] = useState("priority-desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/auth/protected");
        setUser(userResponse.data.user);

        const tasksResponse = await axios.get("/api/tasks");
        setTasks(tasksResponse.data);
      } catch (_error) { // ✅ Renamed error to _error to avoid unused variable warning
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title) return;
    setIsAdding(true); // ✅ Show loading animation
  
    try {
      const response = await axios.post("/api/tasks", newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: "", description: "", priority: 1 });
      toast.success("Task Created Successfully! ✅");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task ❌");
    } finally {
      setIsAdding(false); // ✅ Hide loading animation
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await axios.delete(`/api/tasks?id=${id}`);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== id));
        toast.success("Task Marked as Completed ✅"); // ✅ Task Completion Message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting task:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };



  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority-desc") return b.priority - a.priority;
    if (sortBy === "priority-asc") return a.priority - b.priority;
    return 0;
  });

  // ✅ Priority Color Mapping (Small Badge)
  const priorityColors: Record<number, string> = {
    1: "bg-green-500", // Low Priority
    2: "bg-yellow-500", // Medium Priority
    3: "bg-red-500", // High Priority
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-xl text-gray-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200">
    {/* Sidebar (Fixed Width) */}
    <Sidebar className="w-64 min-h-screen" />

    {/* Main Content (Takes Remaining Space) */}
    <motion.div 
      className="flex flex-col flex-grow items-center justify-start p-8 w-full"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Toaster /> {/* ✅ Toast Messages */}

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="absolute top-5 right-10 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
      >
        Logout
      </motion.button>

      {/* Dashboard Title */}
      <h2 className="text-4xl font-bold text-white mt-5">Welcome, {user?.email}</h2>

      {/* Search & Sorting Controls */}
      <div className="flex flex-row gap-4 w-full max-w-xl mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none"
        >
          <option value="priority-desc">Sort by Priority (High → Low)</option>
          <option value="priority-asc">Sort by Priority (Low → High)</option>
        </select>
      </div>

      {/* Task Input Section - Add New Task */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6 w-full max-w-xl space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <textarea
          placeholder="Task description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <div className="flex items-center gap-3">
  <label className="text-white">Priority:</label>
  <select
    value={newTask.priority}
    onChange={(e) => setNewTask({ ...newTask, priority: Number(e.target.value) })}
    className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none"
  >
    <option value="1" className="bg-green-500 text-black">Low Priority</option>
    <option value="2" className="bg-yellow-500 text-black">Medium Priority</option>
    <option value="3" className="bg-red-500 text-black">High Priority</option>
  </select>
</div>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleAddTask}
  disabled={isAdding} // ✅ Disable button when loading
  className={`px-6 py-2 rounded-lg w-full transition ${
    isAdding ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
  } text-white font-semibold`}
>
  {isAdding ? ( // ✅ Show loading spinner
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
      className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
    />
  ) : (
    "Add Task"
  )}
</motion.button>
      </div>

      {/* Task List */}
      <div className="mt-6 w-full max-w-xl space-y-4">
        {sortedTasks.map((task) => (
          <div key={task.id} className="flex flex-col p-4 rounded-lg shadow-md bg-gray-900 border border-gray-700">
            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
            <p className="text-gray-300">{task.description || "No description provided."}</p>
            
            <div className="flex justify-between items-center mt-3">
              <span className={`px-2 py-1 text-sm font-bold rounded-lg text-black ${priorityColors[task.priority]}`}>
                {task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High"}
              </span>
              <motion.button onClick={() => handleDeleteTask(task.id)} className="text-green-500 font-semibold">
                ✅ Completed
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
    </div>
  );
}