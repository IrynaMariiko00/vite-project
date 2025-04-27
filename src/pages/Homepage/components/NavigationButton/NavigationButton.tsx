import { Link } from "react-router-dom";
import styles from "./NavigationButton.module.scss";

export const NavigationButton = ({
  label,
  to,
}: {
  label: string;
  to: string;
}) => {
  return (
    <Link to={to} className={styles["nav-button"]}>
      {label}
    </Link>
  );
};
