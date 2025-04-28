import { useTracker } from "../../../../hooks/useTracker";
import styles from "./TrackerTable.module.scss";

export const TrackerTable = () => {
  const { messages, totalSum } = useTracker();

  return (
    <div className={styles["tracker-table-wrapper"]}>
      <table className={styles["tracker-table"]}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Sum</th>
          </tr>
        </thead>

        {totalSum <= 0 ? (
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>
                  {message.from.map((addr, i) => (
                    <p key={i}>{addr}</p>
                  ))}
                </td>
                <td>
                  {message.to.map((addr) => (
                    <p>{addr}</p>
                  ))}
                </td>
                <td>
                  <p>{message.sum} BTC</p>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
