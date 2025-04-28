import { useRef, useState } from "react";
import styles from "./Block.module.scss";
import { BlockType } from "../../../../types/block-type";
import { handleMouseDown } from "../../../../utils/dragBlock";
import { useBlocks } from "../../../../hooks/useBlocks";
import { updateBlocksAfterDrag } from "../../../../utils/updateBlocksAfterDrag";

export const Block: React.FC<BlockType> = ({ id, top, left }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ topPos: top, leftPos: left });
  const { blocks, setBlocks, deleteBlock } = useBlocks();

  const handleDragEnd = () => {
    setBlocks((prevBlocks) => updateBlocksAfterDrag(prevBlocks, id));
  };

  const handleDelete = () => {
    deleteBlock(id);
  };

  return (
    <div
      ref={blockRef}
      onMouseDown={(e) =>
        handleMouseDown(e, blockRef, setPosition, handleDragEnd)
      }
      className={styles.block}
      style={{
        top: `${position.topPos}px`,
        left: `${position.leftPos}px`,
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

      <div className={styles.resizeHandle}></div>
    </div>
  );
};
