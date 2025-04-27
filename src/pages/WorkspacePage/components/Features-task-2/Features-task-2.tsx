import styles from "./Features-task-2.module.scss";
import { features } from "../../../../constants/task-1-features";

export const Features2 = () => {
  return (
    <ul className={styles.featuresList}>
      {features.map((feature, index) => (
        <li key={index} className={styles.description}>
          {feature}
        </li>
      ))}
    </ul>
  );
};
