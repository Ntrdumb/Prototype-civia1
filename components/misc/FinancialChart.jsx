"use client";

import { Rnd } from "react-rnd";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Image from "next/image";
import resizerIcon from "@/public/icons/resize-window.svg"; 
import ActualBarChart from "./ActualBarChart";
import Icons from "../icons/icons";
import { primary1 } from "@/constants/colors";

const data = [
  { year: "2025", amount: 1000000 },
  { year: "2026", amount: 2500000 },
  { year: "2027", amount: 6000000 },
];

export default function FinancialChart(dimensions = { width: 700, height: 400}) {
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}K`;
    return value;
  };

  return (
    // <Rnd
    //   default={{
    //     x: 0,
    //     y: 0,
    //     width: dimensions.width,
    //     height: dimensions.height,
    //   }}
    //   bounds="window"
    //   minWidth={670} 
    //   minHeight={575} 
    //   maxWidth={800}
    //   maxHeight={685}
    //   resizeHandleComponent={{
    //     bottomRight: (
    //       <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-50">
    //         <Image
    //           src={resizerIcon}
    //           alt="corner-drag"
    //           width={20}
    //           height={20}
    //           className="opacity-30"
    //         />
    //       </div>
    //     ),
    //   }}
    //   enableResizing={{
    //     left: false,
    //     right: false,
    //     top: false,
    //     down: false,
    //     bottomRight: true, 
    //   }}
    //   lockAspectRatio={false} 
    //   style={{ cursor: "default" }} 
    //   onResizeStop={(e, direction, ref) => {
    //     const width = ref.style.width.replace("px", "");
    //     const height = ref.style.height.replace("px", "");

    //     console.log("Resized to:", { width, height });
    //   }}
    // >
      <Card className="flex flex-col w-full bg-red-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Prévisions financières</CardTitle>
          <div className="flex gap-2">
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
            </Button> */}
            <Button variant="ghost" size="icon" className="rounded-full bg-emerald-50">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-emerald-600"
              >
                <path
                  d="M14 4.5V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2C2 1.44772 2 1 3 1H10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <Icons.PdfExport color={primary1}/>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ActualBarChart />
          {/* <ChartContainer
            config={{
              amount: {
                label: "Amount",
                color: "hsl(158 84% 77%)",
              },
            }}
            className="h-full w-full overflow-hidden bg-red-500"
          >
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              style={{ width: "100%", height: "100%" }}
            >
              <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151" }}
                // tickFormatter={formatYAxis}
                // width={80}
                domain={[0, Math.max(...data.map((d) => d.amount)) * 1.2]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltip>
                        <div className="text-sm font-medium">{payload[0].payload.year}</div>
                        <div className="text-sm">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          }).format(payload[0].value)}
                        </div>
                      </ChartTooltip>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="amount" fill="#62CC9F" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer> */}
        </CardContent>
      </Card>
    // </Rnd>
  );
}
