import { Link } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="/vite-project/img/logo.png"
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
