import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const Wrapper = ({ children, style = {}, initialWidth = 200, initialHeight = 200, initialX = 10, initialY = 10 }) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
    x: initialX,
    y: initialY,
  });

  const handleDragStop = (e, d) => {
    setDimensions((prev) => ({ ...prev, x: d.x, y: d.y }));
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setDimensions({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    });
  };

  return (
    <Rnd
      style={{ border: '1px solid #ddd', padding: '10px', ...style }}
      size={{ width: dimensions.width, height: dimensions.height }}
      position={{ x: dimensions.x, y: dimensions.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds="parent" // optional, limits movement to the parent container
    >
      {children}
    </Rnd>
  );
};

export default Wrapper;
