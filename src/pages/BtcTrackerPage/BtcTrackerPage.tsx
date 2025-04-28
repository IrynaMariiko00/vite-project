import styles from "./BtcTrackerPage.module.scss";
import { features } from "../../constants/task-2-features";
import { TrackerButton } from "./components/TrackerButton";
import { TrackerTable } from "./components/TrackerTable";
import { TrackerProvider, useTracker } from "../../hooks/useTracker";

const BtcTrackerPage = () => {
  const { onStart, onStop, onReset, totalSum } = useTracker();

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
          <TrackerButton text="Start" variant="start" onClick={onStart} />
          <TrackerButton text="Stop" variant="stop" onClick={onStop} />
          <TrackerButton text="Reset" variant="reset" onClick={onReset} />
        </div>

        <div className={styles["table-wrapper"]}>
          <div
            className={styles.text}
            style={{ visibility: totalSum > 0 ? "visible" : "hidden" }}
          >
            Sum = {totalSum} BTC
          </div>

          <TrackerTable />
        </div>
      </section>
    </main>
  );
};

export default () => (
  <TrackerProvider>
    <BtcTrackerPage />
  </TrackerProvider>
);
