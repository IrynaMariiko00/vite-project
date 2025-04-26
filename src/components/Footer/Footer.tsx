import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <header className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.author}>
          <img
            src="/img/author.png"
            alt="Made by Iryna"
            className={styles.author__img}
          />
        </div>

        <div className={styles["github-wrapper"]}>
          <a
            href="https://github.com/IrynaMariiko00"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};
