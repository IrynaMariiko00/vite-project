import { useState } from "react";
import styles from "./WorkspacePage.module.scss";
import { Block } from "./components/Block";
import { Features2 } from "./components/Features-task-2";
import { resetBlocksPositions } from "../../utils/resetBlocksPositions";

const initialBlocks = [
  { number: 1, index: 1, position: { x: 0, y: 0 } },
  { number: 2, index: 2, position: { x: 412, y: 0 } },
  { number: 3, index: 3, position: { x: 824, y: 0 } },
  { number: 4, index: 4, position: { x: 210, y: 189 } },
  { number: 5, index: 5, position: { x: 622, y: 189 } },
];

export const WorkspacePage = () => {
  const [blocks, setBlocks] = useState(initialBlocks);

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
    resetBlocksPositions(setBlocks);
  };

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
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
