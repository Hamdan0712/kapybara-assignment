"use client";

import { useState, useEffect } from "react";

const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <footer
      className={`w-full p-6 text-center text-sm md:text-base transition-all ${
        darkMode
          ? "bg-gray-900 text-gray-400 border-t border-gray-700"
          : "bg-gray-100 text-gray-600 border-t border-gray-300"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo or Brand */}
        <div className="text-lg font-semibold">
          <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>🌟 Task Manager</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-sm mt-3 md:mt-0">
          © {new Date().getFullYear()} Task Manager. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;