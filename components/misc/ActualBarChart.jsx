"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import { chartPrime1, chartPrime2 } from "@/constants/colors";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: chartPrime1,
  },
  mobile: {
    label: "Mobile",
    color: chartPrime2,
  },
};

export default function ActualBarChart() {
  const [visibility, setVisibility] = useState({
    desktop: true,
    mobile: true,
  }); // Or the toggle removes from the data?

  const toggleVisibility = (key) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ChartContainer config={chartConfig} className="h-full w-full overflow-hidden bg-amber-200">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} stroke="#97989c" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <ChartLegend 
          verticalAlign="top"
          content={() => (
            <div className="flex space-x-4 p-2 mb-2 justify-center">
              {Object.keys(chartConfig).map((key) => (
                <div
                  key={key}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => toggleVisibility(key)}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: visibility[key] ? chartConfig[key].color : "#ccc",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>{chartConfig[key].label}</span>
                </div>
              ))}
            </div>
          )}
        />
        {visibility.desktop && (
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        )}
        {visibility.mobile && (
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
        )}
      </BarChart>
    </ChartContainer>
  );
}
