import styles from "./HomePage.module.scss";
import { tasks } from "../../constants/task-instruction-1";
import { NavigationButton } from "./components/NavigationButton/NavigationButton";

const HomePage = () => {
  return (
    <main className={styles["home-page"]}>
      <section className={styles.wrapper}>
        <p className={styles.text}>
          Hello! My name is Iryna, and I’m a Frontend Developer. This is a
          single-page application (SPA) created as part of a technical task. I
          would be very happy to join your team and work on exciting and
          challenging projects.
        </p>
        <p className={styles.text}>
          Below you can view the implementation of two tasks:
        </p>

        <ol>
          {tasks.map((task, index) => (
            <li key={index} className={styles.text}>
              {task}
            </li>
          ))}
        </ol>

        <div className={styles["btn-wrapper"]}>
          <NavigationButton label="Go to Workspace" to="/workspace" />
          <NavigationButton label="Go to Bitcoin Tracker" to="/btc-tracker" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
