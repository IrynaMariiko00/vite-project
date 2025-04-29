import React, { useRef, useEffect } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block-type";
import { useBlocks } from "../../../../hooks/useBlocks";
import { updateBlocksAfterDrag } from "../../../../utils/updateBlocksAfterDrag";

export const Block: React.FC<BlockType> = React.memo(
  ({ id, top, left, width = 300, height = 100 }) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const {
      blocks,
      setBlocks,
      deleteBlock,
      startResize,
      onResize,
      endResize,
      resizingId,
    } = useBlocks();

    const currentBlock = blocks.find((b) => b.id === id);

    useEffect(() => {
      console.log(`Block ${id} rendered`);
    });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (resizingId === id) {
          onResize(e as unknown as React.MouseEvent);
        }
      };

      const handleMouseUp = () => {
        if (resizingId === id) {
          endResize();
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [resizingId, id, onResize, endResize]);

    const handleDelete = () => {
      deleteBlock(id);
    };

    const handleMouseDownForDrag = (e: React.MouseEvent) => {
      if (resizingId === null) {
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

        setBlocks((prevBlocks) => {
          const updatedBlocks = updateBlocksAfterDrag(prevBlocks, id);
          localStorage.setItem("blocks", JSON.stringify(updatedBlocks));
          return updatedBlocks;
        });

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

          setBlocks((prevBlocks) => {
            const updatedBlocks = prevBlocks.map((block) =>
              block.id === id
                ? { ...block, left: snappedX, top: snappedY }
                : block,
            );
            localStorage.setItem("blocks", JSON.stringify(updatedBlocks));
            return updatedBlocks;
          });
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };

    const handleResizeStart = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentBlock) {
        startResize(e, id, currentBlock.width, currentBlock.height);
      }
    };

    return (
      <div
        ref={blockRef}
        onMouseDown={handleMouseDownForDrag}
        className={styles.block}
        style={{
          top: `${currentBlock?.top ?? top}px`,
          left: `${currentBlock?.left ?? left}px`,
          width: `${currentBlock?.width ?? width}px`,
          height: `${currentBlock?.height ?? height}px`,
          zIndex: currentBlock?.zIndex ?? 1,
        }}
      >
        <div className={styles.block__top}>
          <h2 className={styles.block__name}>Block {id}</h2>
          <button className={styles.block__btn} onClick={handleDelete}>
            <img
              src="/vite-project/img/close.png"
              alt="close"
              className={styles.block__icon}
            />
          </button>
        </div>

        <div
          className={styles.resizeHandleBottomRight}
          onMouseDown={handleResizeStart}
        ></div>
      </div>
    );
  },
);
