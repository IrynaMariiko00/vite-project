import styles from "./WorkspacePage.module.scss";
import { features } from "../../constants/task-1-features";
import { Block } from "../../components/Block";

export const WorkspacePage = () => {
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

          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.description}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles["task-container"]}>
        <div className={styles.workspace}>
          <button className={styles.workspace__button}>Reset</button>

          <div className={styles.workspace__blocks}>
            <Block number={1} />
            <Block number={2} />
            <Block number={3} />
            <Block number={4} />
            <Block number={5} />
          </div>
        </div>
      </section>
    </main>
  );
};
