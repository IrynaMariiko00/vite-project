import React, { useRef } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block-type";
import { useBlocks } from "../../../../hooks/useBlocks";
import { useResize } from "../../../../hooks/useResize";
import { updateBlocksAfterDrag } from "../../../../utils/updateBlocksAfterDrag";

export const Block: React.FC<BlockType> = ({
  id,
  top,
  left,
  width = 300,
  height = 100,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
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

  const handleDelete = () => {
    deleteBlock(id);
  };

  const handleMouseDownForDrag = (e: React.MouseEvent) => {
    if (!isResizing) {
      const block = blockRef.current;
      if (!block) return;

      if (
        (e.target as HTMLElement).closest(
          `.${styles.resizeHandleBottomRight}`,
        ) ||
        (e.target as HTMLElement).closest(`.${styles.block__btn}`)
      ) {
        return;
      }

      e.preventDefault();

      setBlocks((prevBlocks) => updateBlocksAfterDrag(prevBlocks, id));

      const startCoords = {
        x: e.clientX - left,
        y: e.clientY - top,
      };

      const step = 10;

      const handleMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - startCoords.x;
        const newY = e.clientY - startCoords.y;

        const snappedX = Math.round(newX / step) * step;
        const snappedY = Math.round(newY / step) * step;

        setBlocks((prevBlocks) =>
          prevBlocks.map((block) =>
            block.id === id
              ? { ...block, left: snappedX, top: snappedY }
              : block,
          ),
        );
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    handleResize(e, direction);
  };

  const currentBlock = blocks.find((b) => b.id === id);

  return (
    <div
      ref={blockRef}
      onMouseDown={handleMouseDownForDrag}
      className={styles.block}
      style={{
        top: `${currentBlock?.top ?? top}px`,
        left: `${currentBlock?.left ?? left}px`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex: currentBlock?.zIndex ?? 1,
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
        onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
      ></div>
    </div>
  );
};
