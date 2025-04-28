import { useCallback, useEffect, useRef, useState } from "react";

export const useResize = (initialWidth: number, initialHeight: number) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  // Реф для контейнера, щоб отримати доступ до елемента DOM
  const resizeRef = useRef<HTMLDivElement>(null);

  // Об'єкт для збереження внутрішнього стану при зміні розміру
  const resizeState = useRef({
    isResizing: false,
    startCoords: { x: 0, y: 0 }, // Початкові координати при початку зміни розміру
    startDimensions: { width: initialWidth, height: initialHeight }, // Початкові розміри
    resizeFactor: 1.1, // Множник для коригування швидкості зміни розміру
  });

  // Оновлення розмірів, коли змінюються initialWidth або initialHeight
  useEffect(() => {
    setDimensions({ width: initialWidth, height: initialHeight });
  }, [initialWidth, initialHeight]);

  // Обробник події mouseDown
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      // Встановлюємо статус, що зміна розміру почалася
      resizeState.current.isResizing = true;
      resizeState.current.startCoords = { x: e.clientX, y: e.clientY }; // Зберігаємо початкові координати
      resizeState.current.startDimensions = { ...dimensions }; // Зберігаємо початкові розміри

      // Додаємо події для переміщення та завершення зміни розміру
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [dimensions], // Залежить від поточних розмірів
  );

  // Обробник події mouseMove, який викликається при пересуванні миші
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizeState.current.isResizing) return;

    const { clientX, clientY } = e;
    const dx = clientX - resizeState.current.startCoords.x; // Зміщення по X
    const dy = clientY - resizeState.current.startCoords.y; // Зміщення по Y

    // Обчислюємо нові розміри з урахуванням зміщення
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

    // Оновлюємо стан з новими розмірами
    setDimensions({ width: newWidth, height: newHeight });
  }, []);

  // Обробник події mouseUp, який зупиняє зміну розміру
  const handleMouseUp = useCallback(() => {
    resizeState.current.isResizing = false;

    // Вилучаємо обробники подій після завершення зміни розміру
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  return {
    dimensions, // Поточні розміри
    resizeRef, // Реф для елемента, до якого застосовуються зміни
    handleMouseDown, // Обробник для початку зміни розміру
  };
};
