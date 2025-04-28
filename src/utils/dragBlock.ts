// utils/dragBlock.ts
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

  const onMouseMove = (e: MouseEvent) => {
    const newX = startX - e.clientX;
    const newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    setPosition((prev) => ({
      topPos: prev.topPos - newY,
      leftPos: prev.leftPos - newX,
    }));
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
