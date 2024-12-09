import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Image from 'next/image';
import resizerIcon from '@/public/icons/resize-window.svg'; // Adjust path as needed

export default function DraggableWrapper({ 
  children, 
  initialWidth = 400, 
  initialHeight = 500,
  initialX = 0,
  initialY = 0
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight
  });

  // If the child component has its own positioning logic, pass through the positioning
  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setDimensions({
      width: ref.style.width,
      height: ref.style.height
    });
  };

  // Clone children and pass through position state if the child has a handleDragEnd prop
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // If the child has a handleDragEnd method, we'll pass our drag handling
      return React.cloneElement(child, {
        handleDragEnd: (event) => {
          // If child has its own drag logic, preserve it
          if (child.props.handleDragEnd) {
            child.props.handleDragEnd(event);
          }
          
          // Update wrapper position
          const { delta } = event;
          setPosition(prevPosition => ({
            x: prevPosition.x + delta.x,
            y: prevPosition.y + delta.y,
          }));
        }
      });
    }
    return child;
  });

  return (
    <Rnd
      size={dimensions}
      position={position}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      dragHandleClassName="draggable-handle"
      enableResizing={{ 
        bottomRight: true,
        bottomLeft: false,
        topRight: false,
        topLeft: false
      }}
      minWidth={300}
      minHeight={400}
      className="absolute z-50"
      resizeHandleStyles={{ 
        bottomRight: { 
          right: '6px', 
          bottom: '6px',
          cursor: 'se-resize'
        } 
      }}
    >
      {enhancedChildren}
      <div className="opacity-30 absolute bottom-1.5 right-1.5 pointer-events-none z-50">
        <Image
          src={resizerIcon}
          alt="corner-drag"
          width={20}
          height={20}
          className="pointer-events-none"
        />
      </div>
    </Rnd>
  );
}