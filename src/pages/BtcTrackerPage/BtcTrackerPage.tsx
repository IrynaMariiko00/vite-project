import styles from "./BtcTrackerPage.module.scss";
import { features } from "../../constants/task-2-features";
import { TrackerButton } from "../../components/TrackerButton";
import { TrackerTable } from "../../components/TrackerTable";

export const BtcTrackerPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles["description-wrapper"]}>
        <p className={styles.description}>
          Below is a table that displays a list of cryptocurrency transactions.
          Each row includes the sender’s address, the receiver’s address, and
          the transaction amount.
        </p>
        <p className={`${styles.description} ${styles.title}`}>You can:</p>

        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.description}>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles["task-wrapper"]}>
        <div className={styles.buttons}>
          <TrackerButton text="Start" variant="start" />
          <TrackerButton text="Stop" variant="stop" />
          <TrackerButton text="Reset" variant="reset" />
        </div>

        <TrackerTable />
      </section>
    </main>
  );
};
