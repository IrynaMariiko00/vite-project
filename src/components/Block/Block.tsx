import styles from "./Block.module.scss";

type Props = {
  number: number;
};

export const Block: React.FC<Props> = ({ number }) => {
  return (
    <div className={styles.block}>
      <div className={styles.block__top}>
        <h2 className={styles.block__name}>Block {number}</h2>

        <button className={styles.block__btn}>
          <img
            src="/img/close.png"
            alt="close"
            className={styles.block__icon}
          />
        </button>
      </div>
    </div>
  );
};
