import { Navigation } from "../Navigation";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img
            src="/img/logo.png"
            alt="Test task"
            className={styles.logo__img}
          />
        </div>
        <Navigation />
      </div>
    </header>
  );
};
