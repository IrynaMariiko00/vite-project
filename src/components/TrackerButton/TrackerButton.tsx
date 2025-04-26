import styles from "./TrackerButton.module.scss";

type Props = {
  text: string;
  variant: "start" | "stop" | "reset";
};

export const TrackerButton: React.FC<Props> = ({ text, variant }) => {
  return <button className={styles[variant]}>{text}</button>;
};
