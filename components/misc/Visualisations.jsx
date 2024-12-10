'use client';

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import resizerIcon from "@/public/icons/resize-window.svg"; 
import FinancialChart from "./FinancialChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
  
export default function Visualisations({ dimensions = { width: 200, height: 200 } }) {

    return (
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: dimensions.width,
            height: dimensions.height,
          }}
          bounds="window"
          minWidth={700} 
          minHeight={450} 
          maxWidth={750}
          maxHeight={500}
          resizeHandleComponent={{
            bottomRight: (
              <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-50">
                <Image
                  src={resizerIcon}
                  alt="corner-drag"
                  width={20}
                  height={20}
                  className="opacity-30"
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
          style={{ cursor: "default" }} 
          onResizeStop={(e, direction, ref) => {
            const width = ref.style.width.replace("px", "");
            const height = ref.style.height.replace("px", "");
    
            console.log("Resized to:", { width, height });
          }}
        >
            <Card className="flex flex-col w-full h-full relative">
              <CardHeader>
                <CardTitle className="text-2xl">Visualisations</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-4 flex justify-center items-center bg-blue-200">
                  <Carousel className="w-full max-w-xl bg-blue-500">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map(function (_, index) {
                        return (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <Card className="bg-blue-800">
                                {/* <CardContent className="flex aspect-video items-center justify-center p-1"> */}
                                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                  <FinancialChart />
                                {/* </CardContent> */}
                              </Card>
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
              </CardContent>
            </Card>
        </Rnd>
    );
}