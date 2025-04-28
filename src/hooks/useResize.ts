import { useCallback, useEffect, useRef, useState } from "react";

export const useResize = (
  initialWidth: number,
  initialHeight: number,
  setDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >,
) => {
  const [dimensions, setLocalDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  // Реф для контейнера, щоб отримати доступ до елемента DOM
  const resizeRef = useRef<HTMLDivElement>(null);

  const resizeState = useRef({
    isResizing: false,
    startCoords: { x: 0, y: 0 },
    startDimensions: { width: initialWidth, height: initialHeight },
    resizeFactor: 1.1,
  });

  useEffect(() => {
    setLocalDimensions({ width: initialWidth, height: initialHeight });
  }, [initialWidth, initialHeight]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      resizeState.current.isResizing = true;
      resizeState.current.startCoords = { x: e.clientX, y: e.clientY };
      resizeState.current.startDimensions = { ...dimensions };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dimensions],
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizeState.current.isResizing) return;

    const dx = e.clientX - resizeState.current.startCoords.x;
    const dy = e.clientY - resizeState.current.startCoords.y;

    const newWidth = Math.max(
      100,
      resizeState.current.startDimensions.width +
        dx * resizeState.current.resizeFactor,
    );
    const newHeight = Math.max(
      50,
      resizeState.current.startDimensions.height +
        dy * resizeState.current.resizeFactor,
    );

    // Оновлюємо локальний стан та передаємо його назад
    setLocalDimensions({ width: newWidth, height: newHeight });
    setDimensions({ width: newWidth, height: newHeight });
  }, []);

  const handleMouseUp = useCallback(() => {
    resizeState.current.isResizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  return {
    dimensions,
    resizeRef,
    handleMouseDown,
  };
};
