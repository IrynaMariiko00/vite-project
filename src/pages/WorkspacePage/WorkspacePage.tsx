import { useCallback, useState } from "react";
import styles from "./WorkspacePage.module.scss";
import { Block } from "./components/Block";
import { Features2 } from "./components/Features-task-2";
import { resetBlocksPositions } from "../../utils/resetBlocksPositions";
import { initialBlocks } from "../../constants/initialBlocks";
import { BlockType } from "../../types/block";

export const WorkspacePage = () => {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);

  const updateBlockIndexes = (clickedBlockNumber: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((block) => {
        if (block.number === clickedBlockNumber) {
          return { ...block, index: 5 };
        }
        return { ...block, index: Math.max(1, block.index - 1) };
      });

      return updatedBlocks.sort((a, b) => a.index - b.index);
    });
  };

  const handleBlockClick = (clickedBlockNumber: number) => {
    updateBlockIndexes(clickedBlockNumber);
  };

  const handleReset = () => {
    resetBlocksPositions(setBlocks, blocks);
  };

  const handleBlockClose = useCallback((blockNumber: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.number !== blockNumber),
    );
  }, []);

  return (
    <main>
      <section className={styles["purple-background"]}>
        <div className={styles["description-wrapper"]}>
          <p className={styles.description}>
            Welcome to the Interactive Workspace! You have five blocks that can
            be moved and resized using your mouse. Each block is numbered, with
            an initial size of 100px in height and 300px in width.
          </p>
          <p className={`${styles.description} ${styles.title}`}>Features:</p>

          <Features2 />
        </div>
      </section>

      <section className={styles["task-container"]}>
        <div className={styles.workspace}>
          <button className={styles.workspace__button} onClick={handleReset}>
            Reset
          </button>

          <div className={styles.workspace__blocks}>
            {blocks.map((block) => (
              <Block
                key={block.number}
                number={block.number}
                index={block.index}
                position={block.position}
                onBlockClick={handleBlockClick}
                updateBlockIndex={updateBlockIndexes}
                onBlockClose={handleBlockClose}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
