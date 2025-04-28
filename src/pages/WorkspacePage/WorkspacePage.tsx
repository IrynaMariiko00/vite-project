import { Block } from "./components/Block";
import { Features2 } from "./components/Features-task-2";
import { BlocksProvider, useBlocks } from "../../hooks/useBlocks";
import styles from "./WorkspacePage.module.scss";

const WorkspacePage = () => {
  const { blocks } = useBlocks();

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
          <button className={styles.workspace__button}>Reset</button>

          <div className={styles.workspace__blocks}>
            {blocks.map((block) => (
              <Block
                key={block.id}
                id={block.id}
                top={block.top}
                left={block.left}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default () => (
  <BlocksProvider>
    <WorkspacePage />
  </BlocksProvider>
);
