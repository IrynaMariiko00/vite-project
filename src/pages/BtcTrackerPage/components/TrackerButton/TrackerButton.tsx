import { useTracker } from "../../../../hooks/useTracker";
import styles from "./TrackerButton.module.scss";

type Props = {
  text: string;
  variant: "start" | "stop" | "reset";
  onClick: () => void;
};

export const TrackerButton: React.FC<Props> = ({ text, variant, onClick }) => {
  const { totalSum } = useTracker();

  const isDisabled =
    totalSum <= 0 && (variant === "stop" || variant === "reset");

  const buttonClassName = `${styles[variant]} ${
    isDisabled ? styles.disabled : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
};
