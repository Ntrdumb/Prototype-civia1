'use client';

import React, { useState, useRef, useEffect, useMemo } from "react";
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
} from "@/components/ui/carousel";
import useChatStore from "@/reducer/chatStore";

  
export default function Visualisations({ dimensions = { width: 200, height: 200 } }) {
    const chunks = useChatStore((state) => state.chunks);

    const processedChunks = useMemo(() => {
      if (!chunks) return [];
      
      // Porcessing in the meat grinder
      return chunks.map((chunk) => ({
        file: chunk[0],
        content: chunk[1],
        score: (chunk[2]*100).toFixed(2),
      }));
    }, [chunks]);

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
                      {processedChunks.length > 0
                        ? processedChunks.map((chunk, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <Card className="bg-blue-800">
                                  <CardContent className="flex aspect-video flex-col items-center justify-center p-1">
                                    <span>
                                      {chunk.score}
                                    </span>
                                    <span className="text-sm font-medium">
                                      {chunk.file}
                                    </span>
                                    <span className="text-xs font-normal">
                                      {chunk.content}
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))
                        : Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <Card className="bg-blue-800">
                                  <CardContent className="flex aspect-video items-center justify-center p-1">
                                    <span className="text-4xl font-semibold">
                                      {index + 1}
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                        ))
                      }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
              </CardContent>
            </Card>
        </Rnd>
    );
}