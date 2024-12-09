"use client";

import { Rnd } from "react-rnd";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Image from "next/image";
import resizerIcon from "@/public/icons/resize-window.svg"; 

const data = [
  { year: "2025", amount: 1000000 },
  { year: "2026", amount: 2500000 },
  { year: "2027", amount: 6000000 },
];

export default function FinancialChart() {
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}K`;
    return value;
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 600,
        height: 500,
      }}
      scale={0.98}
      bounds="window"
      minWidth={400}
      minHeight={400}
      resizeHandleStyles={{
        bottomRight: { pointerEvents: "auto" },
      }}
      resizeHandleComponent={{
        bottomRight: (
          <div className="opacity-30 absolute bottom-1.5 right-1.5 pointer-events-none z-50">
            <Image
              src={resizerIcon}
              alt="corner-drag"
              width={20}
              height={20}
              className="pointer-events-none"
            />
          </div>
        ),
      }}
      enableResizing={{
        bottomRight: true,
      }}
      lockAspectRatio={false}
    >
      <Card className="flex flex-col w-full h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Prévisions financières</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-emerald-50">
              <svg
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
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: {
                label: "Amount",
                color: "hsl(158 84% 77%)",
              },
            }}
            className="h-full w-full overflow-hidden"
          >
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              style={{ width: "100%", height: "100%" }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
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
                tickFormatter={formatYAxis}
                width={80}
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
              <Bar dataKey="amount" fill="#26CF64" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Rnd>
  );
}
