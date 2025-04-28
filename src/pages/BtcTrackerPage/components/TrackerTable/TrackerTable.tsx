import { useTracker } from "../../../../hooks/useTracker";
import styles from "./TrackerTable.module.scss";

export const TrackerTable = () => {
  const { messages } = useTracker();

  return (
    <table className={styles["tracker-table"]}>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
      </thead>
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
        {messages.map((message) => (
          <tr>
            <td>
              {message.from.map((addr) => (
                <p>{addr}</p>
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
    </table>
  );
};
