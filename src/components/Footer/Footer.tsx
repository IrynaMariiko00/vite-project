import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { Navigation } from "../Navigation";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Хук для перевірки ширини екрану
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Встановлюємо початковий розмір
    handleResize();

    // Додаємо слухач для зміни розміру вікна
    window.addEventListener("resize", handleResize);

    // Очищаємо слухач при розмонтажі компоненти
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        {/* Відображаємо лише на десктопах */}
        {!isMobile && (
          <>
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
          </>
        )}

        {/* Для мобільних відображається лише навігація */}
        {isMobile && <Navigation />}
      </div>
    </footer>
  );
};
