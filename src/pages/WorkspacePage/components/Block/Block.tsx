import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block";

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
  const isDragging = useRef(false);
  const wasMoved = useRef(false); // нове
  const startCoords = useRef({ x: 0, y: 0 });
  const step = 10;

  useEffect(() => {
    setBlockPosition(position);
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    e.preventDefault();
    isDragging.current = true;
    wasMoved.current = false;

    updateBlockIndex(number);

    startCoords.current = {
      x: e.clientX - blockPosition.x,
      y: e.clientY - blockPosition.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const newX = e.clientX - startCoords.current.x;
      const newY = e.clientY - startCoords.current.y;

      const snappedX = Math.round(newX / step) * step;
      const snappedY = Math.round(newY / step) * step;

      if (snappedX !== blockPosition.x || snappedY !== blockPosition.y) {
        wasMoved.current = true;
      }

      setBlockPosition({ x: snappedX, y: snappedY });
    },
    [blockPosition],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleClick = (e: React.MouseEvent) => {
    if (wasMoved.current) {
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
        zIndex: index,
      }}
      onMouseDown={handleMouseDown}
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
    </div>
  );
};
