import { MutableRefObject } from "react";

export const dragBlock = (
  e: React.MouseEvent,
  block: HTMLDivElement,
  setPosition: React.Dispatch<
    React.SetStateAction<{ topPos: number; leftPos: number }>
  >,
  onDragEnd?: () => void,
) => {
  e.preventDefault();

  let startX = e.clientX;
  let startY = e.clientY;
  const step = 10; // крок сітки 10 пікселів

  // Початкові координати
  let prevX = 0;
  let prevY = 0;
  let snappedX = 0; // оголошення змінної для збереження координат

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Округлення зміщення до найближчого кроку
    snappedX = Math.round(deltaX / step) * step;
    const snappedY = Math.round(deltaY / step) * step;

    if (snappedX !== prevX || snappedY !== prevY) {
      // Оновлення позиції без затримок
      setPosition((prev) => ({
        topPos: prev.topPos + snappedY, // рух по вертикалі
        leftPos: prev.leftPos + snappedX, // рух по горизонталі
      }));

      startX = e.clientX;
      startY = e.clientY;
      prevX = snappedX; // оновлюємо prevX та prevY після зміщення
      prevY = snappedY;
    }
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    block.style.cursor = "grab";

    if (onDragEnd) {
      onDragEnd();
    }
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

export const handleMouseDown = (
  e: React.MouseEvent,
  blockRef: MutableRefObject<HTMLDivElement | null>,
  setPosition: React.Dispatch<
    React.SetStateAction<{ topPos: number; leftPos: number }>
  >,
  onDragEnd?: () => void,
) => {
  const block = blockRef.current;
  if (!block) return;

  block.style.cursor = "grabbing";
  dragBlock(e, block, setPosition, onDragEnd);
};
