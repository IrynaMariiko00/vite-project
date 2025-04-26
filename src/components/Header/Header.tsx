import { Link } from "react-router-dom";
import { Navigation } from "../Navigation";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="Test task"
              className={styles.logo__img}
            />
          </Link>
        </div>

        <div className={styles["nav-container"]}>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
