import React from "react";

import { useEffect, useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const saved =  JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="flex items-center justify-center p-4 mt-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
            Task Tracker 📝 
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between mb-4 text-sm  sm:overflow-x-scroll">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul className="space-y-2 ">
          {filteredTasks.map((t, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg transition ${
                t.completed
                  ? "bg-green-100 line-through text-gray-500"
                  : "bg-gray-100"
              }`}
            >
              <span
                onClick={() => toggleTask(index)}
                className="cursor-pointer flex-1"
              >
                {t.text}
              </span>

              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 ml-3"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No tasks added yet
          </p>
        )}
      </div>
    </div>
  );
}


