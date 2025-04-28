import { useState } from "react";

export const useResize = (
  initialWidth: number,
  initialHeight: number,
  onResizeEnd: (newWidth: number, newHeight: number) => void,
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const handleResize = (e: React.MouseEvent, direction: string) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = dimensions.width;
    const initialHeight = dimensions.height;

    setIsResizing(true);

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (direction === "right") {
        setDimensions((prev) => ({
          ...prev,
          width: Math.max(150, initialWidth + deltaX),
        }));
      } else if (direction === "bottom") {
        setDimensions((prev) => ({
          ...prev,
          height: Math.max(50, initialHeight + deltaY),
        }));
      } else if (direction === "bottom-right") {
        setDimensions(() => ({
          width: Math.max(150, initialWidth + deltaX),
          height: Math.max(50, initialHeight + deltaY),
        }));
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      onResizeEnd(dimensions.width, dimensions.height);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return {
    isResizing,
    dimensions,
    handleResize,
  };
};
