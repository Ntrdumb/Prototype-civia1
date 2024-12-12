"use client";

import React, { useState } from "react"; 
import { Sparkles, Download, Filter, PieChart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "../misc/ToolTip";

export function BottomNav({ className, onItemClick, ...props }) {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const navItems = [
    { icon: <Sparkles className="!h-8 !w-8 text-teal-600" />, label: "Chat" },
    { icon: <Filter className="!h-8 !w-8 text-teal-600" />, label: "Filters" },
    { icon: <PieChart className="!h-8 !w-8 text-teal-600" />, label: "Visualisations" },
    { icon: <FileText className="!h-8 !w-8 text-gray-400" />, label: "Report", locked: true },
  ];

  const handleMouseEnter = (index) => {
    if (!navItems[index].locked) {
      setIndicatorPosition(index);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <div className="relative flex items-center gap-4 rounded-full bg-white px-20 py-3">
        {/* Moving Indicator */}
        <div
          className="absolute bottom-0 h-1 w-16 bg-teal-600 rounded-full transition-transform duration-300"
          style={{
            transform: `translateX(${indicatorPosition * 5}rem)`,
          }}
        ></div>

        {/* Buttons with Tooltip */}
        {navItems.map((item, index) => (
          <Tooltip key={item.label} label={item.label}>
            <Button
              variant="ghost"
              size="icon"
              className={`relative group h-16 w-16 rounded-full border ${
                item.locked ? "border-gray-300 cursor-not-allowed opacity-50" : "border-teal-600 hover:bg-emerald-50"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => !item.locked && onItemClick && onItemClick(item.label)}
              disabled={item.locked} 
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
