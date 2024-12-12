'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import resizerIcon from "@/public/icons/resize-window.svg"; 
import { X, Minus } from "lucide-react";
import FinancialChart from "./FinancialChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import useChatStore from "@/reducer/chatStore";
import Icons from "../icons/icons";
import PopoverButton from "../builder/PopoverButton";
import useNavStore from "@/reducer/navStore";
  
export default function Visualisations({ dimensions = { width: 200, height: 200 } }) {
  const [componentSize, setComponentSize] = useState({
    width: dimensions.width,
    height: dimensions.height
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toggleChartVisibility } = useNavStore();
  const chunks = useChatStore((state) => state.chunks);

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const popoverContentButtons = ["Rapport Finances", "Rapport Emplois", "Nouveau rapport"];
  
  // Could be replaced 
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const x = window.innerWidth - dimensions.width - 10;
    const y = window.innerWidth / 15;
    setPosition({ x, y });
  }, [dimensions.width]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const processedChunks = useMemo(() => {
    if (!chunks) return [];
    return chunks.map((chunk) => ({
      file: chunk[0],
      content: chunk[1],
      score: (chunk[2] * 100).toFixed(2),
    }));
  }, [chunks]);

  const handleMinimize = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleClose = () => {
    toggleChartVisibility();
  };

  return (
    <Rnd
      position={position} 
      size={{
        width: componentSize.width,
        height: isCollapsed ? 100 : componentSize.height,
      }}
      bounds="window"
      minWidth={700}
      minHeight={isCollapsed ? 100 : 430}
      maxWidth={750}
      maxHeight={isCollapsed ? 100 : 500}
      resizeHandleStyles={{ bottomRight: { right: "1px", bottom: "1px" } }}
      resizeHandleComponent={{
        bottomRight: (
          <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-50">
            <Image
              src={resizerIcon}
              alt="corner-drag"
              width={20}
              height={20}
              className="opacity-100"
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
      onResizeStop={(e, direction, ref, delta, newPosition) => {
        setComponentSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
    >
      <Collapsible
        className={`flex flex-col w-full h-full relative`}
        defaultOpen
      >
        <Card
          className={`flex flex-col w-full relative transition-all duration-500 ${
            isCollapsed ? "h-[100px] overflow-hidden" : "h-full"
          }`}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl">Visualiser vos réponses</CardTitle>
            <div className="flex space-x-2">
              {/* Minimize Button */}
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-emerald-50 border"
                  onClick={handleMinimize}
                >
                  <Minus className="h-5 w-5 text-gray-500" />
                </Button>
              </CollapsibleTrigger>
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 border"
                onClick={handleClose}
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </CardHeader>
          <CollapsibleContent
            className={`transition-all duration-500 ${
              isCollapsed ? "h-0 opacity-0 overflow-hidden" : "h-full opacity-100"
            }`}
          >
            <CardContent className="flex-1 overflow-hidden p-1 flex grow justify-center items-center mt-10">
              <Carousel 
                setApi={setApi}
                className="w-full max-w-xl max-h-fit" 
                opts={{
                  align: "center",
                  loop: true,
                  // skipSnaps: true,
                  // containScroll: "trimSnaps",
                }}
              >
                <CarouselContent className="ml-1 mr-1">
                  {processedChunks.length > 0
                    ? processedChunks.map((chunk, index) => (
                      <CarouselItem key={index} className="basis-[90%] flex-grow h-auto pl-1 pr-1">

                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-video flex-col items-center justify-center p-1 max-h-fit">
                                <div className="flex w-full justify-between">
                                  <span>Accuracy : {chunk.score}</span>
                                </div>
                                <span className="text-sm font-medium">{chunk.file}</span>
                                <Separator className="my-1" />
                                <ScrollArea className="w-full h-full pr-2">
                                  <span className="text-xs font-normal">{chunk.content}</span>
                                </ScrollArea>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))
                    : Array.from({ length: 0 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card className="bg-blue-800">
                              <CardContent className="flex aspect-video flex-col items-center justify-center p-1">
                                <FinancialChart />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                </CarouselContent>
                {processedChunks.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                    {/* This one's for text indicator, but it's lame */}
                    {/* <div className="py-2 text-center text-sm">
                      Slide {current} of {processedChunks.length}
                    </div> */}
                    {/* This one's cooler */}
                    <div className="flex justify-center space-x-2 py-2">
                      {processedChunks.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                          className={`w-3 h-3 rounded-full ${
                            current === index + 1 ? "bg-teal-500" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </Carousel>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </Rnd>
  );
}
