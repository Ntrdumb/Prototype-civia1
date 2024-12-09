import React from "react";

export const Tooltip = ({ label, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 flex-col items-center group-hover:flex">
        <div className="whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-lg">
          {label}
        </div>
        {/* Tooltip Arrow */}
        <div className="h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
      </div>
    </div>
  );
};
