import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { Navigation } from "../Header/components/Navigation";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        {!isMobile && (
          <>
            <div className={styles.author}>
              <img
                src="/vite-project/img/author.png"
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
          </>
        )}

        {isMobile && <Navigation />}
      </div>
    </footer>
  );
};
