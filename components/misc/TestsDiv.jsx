import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import Chatbot from "../chatbot/Chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestsDiv({ position, onDragEnd }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-div",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Component is now safely running on the client
  }, []);

  if (!isClient) return null;

  const style = {
    position: "absolute",
    top: position.y,
    left: position.x,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-[400px] h-[500px] absolute shadow-lg"
    >
      <CardHeader
        className="cursor-move relative"
        {...listeners}
        {...attributes}
        style={{
          // height: "80px", 
          // marginTop: "-40px", 
          zIndex: 10,
        }}
      >
        {/* <CardTitle>Chatbot</CardTitle> */}
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {/* Chatbot Component */}
        <Chatbot />
      </CardContent>
    </Card>
  );
}
