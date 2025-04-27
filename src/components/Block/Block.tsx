import { useState, useRef } from "react";
import styles from "./Block.module.scss";

type Props = {
  number: number;
};

const initialPositions = [
  { x: 0, y: 0 }, // Перший блок
  { x: 412, y: 0 }, // Другий блок
  { x: 824, y: 0 }, // Третій блок
  { x: 210, y: 189 }, // Четвертий блок
  { x: 622, y: 189 }, // П'ятий блок
];

export const Block: React.FC<Props> = ({ number }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPositions[number - 1]);
  const startCoords = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    startCoords.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - startCoords.current.x;
      const newY = moveEvent.clientY - startCoords.current.y;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={blockRef}
      className={styles.block}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      onMouseDown={handleMouseDown}
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
