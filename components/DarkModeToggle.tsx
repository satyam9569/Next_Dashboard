"use client";

import React from "react";
import { useTheme } from "@/context/ThemContext";

export const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
