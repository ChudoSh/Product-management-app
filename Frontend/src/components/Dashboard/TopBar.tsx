// src/components/Dashboard/TopBar.tsx
import React from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = () => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Welcome to ProductManager!</span>
          <span className="text-xs block text-stone-500">
            {formattedDate}
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Last 30 Days</span>
        </button>
      </div>
    </div>
  );
};