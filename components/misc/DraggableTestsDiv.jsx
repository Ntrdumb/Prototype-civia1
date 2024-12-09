import React, { useState } from "react";
import { 
  DndContext, 
  useDraggable, 
  DragOverlay,
  rectIntersection 
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableTestsDiv() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform 
  } = useDraggable({
    id: "draggable-div",
  });

  // Combine base position with transform
  const style = {
    position: "absolute",
    top: position.y,
    left: position.x,
    transform: CSS.Translate.toString(transform),
    cursor: "move",
    transition: "transform 100ms",
  };

  const handleDragEnd = (event) => {
    console.log('2', event);
    if (event.delta) {
      setPosition(prev => ({
        x: prev.x + event.delta.x,
        y: prev.y + event.delta.y
      }));
    }
  };

  return (
    <DndContext 
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="absolute content-center items-center h-72 w-52 bg-gray-200 border shadow-lg rounded"
      >
        <div className='content-center items-center text-center h-1/2 w-1/2'>
          <p>Hi</p>
        </div>
      </div>
    </DndContext>
  );
}