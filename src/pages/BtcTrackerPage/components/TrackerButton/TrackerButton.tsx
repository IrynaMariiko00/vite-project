import styles from "./TrackerButton.module.scss";

type Props = {
  text: string;
  variant: "start" | "stop" | "reset";
  onClick: () => void;
};

export const TrackerButton: React.FC<Props> = ({ text, variant, onClick }) => {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {text}
    </button>
  );
};
