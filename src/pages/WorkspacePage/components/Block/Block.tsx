import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Block.module.scss";

type Props = {
  number: number;
  index: number;
  position: { x: number; y: number };
  onBlockClick: (number: number) => void;
  updateBlockIndex: (number: number) => void;
};

export const Block: React.FC<Props> = ({
  number,
  index,
  position,
  onBlockClick,
  updateBlockIndex,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockPosition, setPosition] = useState(position);
  const startCoords = useRef({ x: 0, y: 0 });

  const step = 10;
  const isDragging = useRef(false);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  const handleMouseMove = useCallback((moveEvent: MouseEvent) => {
    if (isDragging.current) {
      const newX = moveEvent.clientX - startCoords.current.x;
      const newY = moveEvent.clientY - startCoords.current.y;

      const snappedX = Math.round(newX / step) * step;
      const snappedY = Math.round(newY / step) * step;

      setPosition({ x: snappedX, y: snappedY });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    isDragging.current = true;
    updateBlockIndex(number);

    startCoords.current = {
      x: e.clientX - blockPosition.x,
      y: e.clientY - blockPosition.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = () => {
    onBlockClick(number);
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
        <button className={styles.block__btn}>
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
