'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <div className="flex justify-between items-center h-full px-1">
        <span className="text-xs text-yellow-500 opacity-100 dark:opacity-50 transition-opacity duration-300">
          ☀️
        </span>
        <span className="text-xs text-blue-500 opacity-50 dark:opacity-100 transition-opacity duration-300">
          🌙
        </span>
      </div>
    </button>
  );
} 