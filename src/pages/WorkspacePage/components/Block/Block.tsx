import React, { useRef, useState } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block-type";
import { handleMouseDown } from "../../../../utils/dragBlock";
import { useBlocks } from "../../../../hooks/useBlocks";
import { useResize } from "../../../../hooks/useResize"; // Імпортуємо хук
import { updateBlocksAfterDrag } from "../../../../utils/updateBlocksAfterDrag";

export const Block: React.FC<BlockType> = ({
  id,
  top,
  left,
  width = 300,
  height = 100,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ topPos: top, leftPos: left });
  const { blocks, setBlocks, deleteBlock } = useBlocks();

  const { isResizing, dimensions, handleResize } = useResize(
    width,
    height,
    (newWidth, newHeight) => {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === id
            ? { ...block, width: newWidth, height: newHeight }
            : block,
        ),
      );
    },
  );

  // Обробка завершення перетягування
  const handleDragEnd = () => {
    setBlocks(
      (prevBlocks) => updateBlocksAfterDrag(prevBlocks, id), // Передаємо isResizing
    );
  };
  // Обробка видалення блоку
  const handleDelete = () => {
    deleteBlock(id);
  };

  // Обробка перетягування блоку, лише коли не йде зміна розміру
  const handleMouseDownForDrag = (e: React.MouseEvent) => {
    if (!isResizing) {
      handleMouseDown(e, blockRef, setPosition, handleDragEnd);
    }
  };

  // Функція для активації ресайзу
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation(); // Перешкоджаємо поширенню події, щоб не активувалось перетягування
    handleResize(e, direction); // Викликаємо функцію для зміни розміру
  };

  return (
    <div
      ref={blockRef}
      onMouseDown={handleMouseDownForDrag} // Викликаємо нову функцію для перетягування
      className={styles.block}
      style={{
        top: `${position.topPos}px`,
        left: `${position.leftPos}px`,
        width: `${dimensions.width}px`, // Використовуємо значення з хука
        height: `${dimensions.height}px`, // Використовуємо значення з хука
        zIndex: blocks.find((b) => b.id === id)?.zIndex ?? 1,
      }}
    >
      <div className={styles.block__top}>
        <h2 className={styles.block__name}>Block {id}</h2>
        <button className={styles.block__btn} onClick={handleDelete}>
          <img
            src="public/img/close.png"
            alt="close"
            className={styles.block__icon}
          />
        </button>
      </div>

      <div
        className={styles.resizeHandleBottomRight}
        onMouseDown={(e) => handleResizeStart(e, "bottom-right")} // Викликаємо нову функцію для ресайзу
      ></div>
    </div>
  );
};
