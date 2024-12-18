"use client";

import React, { useState } from "react"; 
import { Sparkles, Download, Upload, Filter, PieChart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "../misc/ToolTip";
import { primary1, primary2 } from "@/constants/colors";

export function BottomNav({ className, onItemClick, ...props }) {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const navItems = [
    { icon: <Sparkles className="!h-8 !w-8" style={{ color: primary1 }} />, label: "Chat" },
    { icon: <Upload className="!h-8 !w-8" style={{ color: primary1 }} />, label: "Upload" },
    { icon: <Filter className="!h-8 !w-8" style={{ color: primary1 }} />, label: "Filters" },
    { icon: <PieChart className="!h-8 !w-8" style={{ color: primary1 }} />, label: "Visualisations" },
    { icon: <FileText className="!h-8 !w-8 text-gray-400" />, label: "Report", locked: true },
  ];

  const handleMouseEnter = (index) => {
    if (!navItems[index].locked) {
      setIndicatorPosition(index);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <div className="relative flex items-center gap-4 rounded-full bg-white shadow-lg px-20 py-3">
        {/* Moving Indicator */}
        <div
          className="absolute bottom-0 h-1 w-16 rounded-full transition-transform duration-300"
          style={{
            transform: `translateX(${indicatorPosition * 5}rem)`,
            backgroundColor: primary2,
          }}
        ></div>

        {/* Buttons with Tooltip */}
        {navItems.map((item, index) => (
          <Tooltip key={item.label} label={item.label}>
            <Button
              variant="ghost"
              size="icon"
              className={`relative group h-16 w-16 rounded-full border ${
                item.locked ? "border-gray-300 cursor-not-allowed opacity-50" : "border-primary1 hover:bg-primary3"
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
