"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend, 
    ChartLegendContent 
  } from "@/components/ui/chart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#4F83CC", 
    },
    mobile: {
      label: "Mobile",
      color: "#F4A261", 
    },
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}K`;
    return value;
  };

  export default function ActualBarChart () {
    return (
        <ChartContainer config={chartConfig} className="h-full w-full overflow-hidden bg-amber-200">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid  vertical={false} stroke="#97989c" />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10} // Maybe comment
                    tickFormatter={(value) => value.slice(0, 3)} // Maybe comment
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#374151" }}
                    // tickFormatter={formatYAxis}
                    // width={80}
                    domain={[0, Math.max(...chartData.map((d) => d.amount)) * 1.2]} // To not go directly into the max of y axis, leave some room for comparaison
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="#62CC9F" radius={4} /> 
                <Bar dataKey="mobile" fill="#3e8567" radius={4} />
            </BarChart>
        </ChartContainer>
    )
};