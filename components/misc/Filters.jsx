"use client";

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as SliderPrimitive from "@radix-ui/react-slider";
import Image from "next/image";
import resizerIcon from "@/public/icons/resize-window.svg"; 

export default function Filters(dimensions = { width: 400, height: 396}) {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSliderChange = (value) => {
    setSelectedMonth(value[0]);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 400,
        height: 396,
      }}
      bounds="window"
      minWidth={300} 
      minHeight={300} 
      style={{ cursor: "default" }} 
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
        left: false,
        right: false,
        top: false,
        bottom: false,
        bottomRight: true, 
        bottomLeft: false,
        topRight: false,
        topLeft: false,
      }}
      lockAspectRatio={false} 
      onResizeStop={(e, direction, ref) => {
        const width = ref.style.width.replace("px", "");
        const height = ref.style.height.replace("px", "");

        console.log("Resized to:", { width, height });
      }}
    >
      <Card className="w-full max-w-md border-0 bg-white rounded-2xl shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600">
              <Filter className="h-5 w-5" />
              <CardTitle>Filtres</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-dashed"
            >
              Ajouter des filtres
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Catégories de dépenses</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="suppliers" />
                <label
                  htmlFor="suppliers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Fournisseurs
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="salaries" />
                <label
                  htmlFor="salaries"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Salaires
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hec" />
                <label
                  htmlFor="hec"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  HEC Montréal
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Période</h3>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Par mois</SelectItem>
                <SelectItem value="quarterly">Par trimestre</SelectItem>
                <SelectItem value="yearly">Par année</SelectItem>
              </SelectContent>
            </Select>

            <div className="pt-2 pb-6">
              <SliderPrimitive.Root
                className="relative flex items-center w-full h-5"
                min={1}
                max={12}
                step={1}
                value={[selectedMonth]}
                onValueChange={handleSliderChange}
              >
                <SliderPrimitive.Track className="relative flex-grow h-1 bg-gray-300 rounded-full">
                  <SliderPrimitive.Range className="absolute h-full bg-emerald-500 rounded-full" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  className="block w-4 h-4 bg-emerald-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
                />
              </SliderPrimitive.Root>
              <div className="flex justify-between mt-2 text-sm">
                {months.map((month) => (
                  <span
                    key={month}
                    className={`${
                      selectedMonth === month
                        ? "text-gray-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Rnd>
  );
}
