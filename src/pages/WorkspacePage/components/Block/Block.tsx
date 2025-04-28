import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block";
import { useResize } from "../../../../hooks/useResize";

export const Block: React.FC<BlockType> = ({
  number,
  index,
  position,
  onBlockClick,
  updateBlockIndex,
  onBlockClose,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockPosition, setBlockPosition] = useState(position);

  // Використовуємо useResize для управління розмірами
  const { dimensions, resizeRef, handleMouseDown } = useResize(300, 100);

  const state = useRef({
    isDragging: false,
    wasMoved: false,
    startCoords: { x: 0, y: 0 },
    step: 10,
  });

  useEffect(() => {
    setBlockPosition(position);
  }, [position]);

  const handleMouseDownMove = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(".resizeHandle") ||
      (e.target as HTMLElement).closest("button")
    ) {
      return;
    }

    e.preventDefault();
    state.current.isDragging = true;
    state.current.wasMoved = false;

    updateBlockIndex(number);

    state.current.startCoords = {
      x: e.clientX - blockPosition.x,
      y: e.clientY - blockPosition.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!state.current.isDragging) return;

      const newX = e.clientX - state.current.startCoords.x;
      const newY = e.clientY - state.current.startCoords.y;

      const snappedX =
        Math.round(newX / state.current.step) * state.current.step;
      const snappedY =
        Math.round(newY / state.current.step) * state.current.step;

      if (snappedX !== blockPosition.x || snappedY !== blockPosition.y) {
        state.current.wasMoved = true;
      }

      setBlockPosition({ x: snappedX, y: snappedY });
    },
    [blockPosition],
  );

  const handleMouseUp = useCallback(() => {
    state.current.isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleClick = (e: React.MouseEvent) => {
    if (state.current.wasMoved) {
      e.stopPropagation();
      return;
    }
    onBlockClick(number);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBlockClose(number);
  };

  return (
    <div
      ref={blockRef}
      className={styles.block}
      style={{
        position: "absolute",
        top: `${blockPosition.y}px`,
        left: `${blockPosition.x}px`,
        width: `${dimensions.width}px`, // Використовуємо dimensions з хука useResize
        height: `${dimensions.height}px`, // Використовуємо dimensions з хука useResize
        zIndex: index,
      }}
      onMouseDown={handleMouseDownMove}
      onClick={handleClick}
    >
      <div className={styles.block__top}>
        <h2 className={styles.block__name}>Block {number}</h2>
        <button className={styles.block__btn} onClick={handleClose}>
          <img
            src="public/img/close.png"
            alt="close"
            className={styles.block__icon}
          />
        </button>
      </div>

      <div
        className={styles.resizeHandle}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleMouseDown(e);
        }}
        ref={resizeRef}
      ></div>
    </div>
  );
};
