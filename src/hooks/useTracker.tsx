import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TrackerTableData } from "../types/tracker-table-data";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { TrackerData } from "../types/tracker-data";

interface TrackerType {
  totalSum: number;
  messages: TrackerTableData[];
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

interface TrackerProviderProps {
  children: ReactNode;
}

const TrackerContext = createContext<TrackerType | undefined>(undefined);

export const useTracker = () => {
  const context = useContext(TrackerContext);

  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
};

export const TrackerProvider: React.FC<TrackerProviderProps> = ({
  children,
}) => {
  const [totalSum, setTotalSum] = useState(0);
  const [messages, setMessages] = useState<TrackerTableData[]>([]);
  const { lastJsonMessage, readyState, sendJsonMessage } =
    useWebSocket<TrackerData>("wss://ws.blockchain.info/inv");

  const BTC_MULTIPLIER = 0.00000001;

  const onStart = () => {
    if (readyState != ReadyState.OPEN) {
      return;
    }

    sendJsonMessage({ op: "unconfirmed_sub" });
  };

  const onStop = () => {
    if (readyState != ReadyState.OPEN) {
      return;
    }

    sendJsonMessage({ op: "unconfirmed_unsub" });
  };

  const onReset = () => {
    setMessages([]);
    setTotalSum(0);
  };

  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage.op != "utx") {
      return;
    }

    const fromAddresses = lastJsonMessage.x.inputs.map(
      (input) => input.prev_out.addr,
    );

    let sum = 0;

    const toAddresses = lastJsonMessage.x.out.map((out) => {
      sum += out.value;
      return out.addr;
    });

    const sumInBtc = sum * BTC_MULTIPLIER;

    setMessages((prev) => [
      ...prev,
      {
        from: fromAddresses,
        to: toAddresses,
        sum: sumInBtc,
      },
    ]);

    setTotalSum((prev) => prev + sumInBtc);
  }, [lastJsonMessage]);

  return (
    <TrackerContext.Provider
      value={{ messages, onStart, onStop, onReset, totalSum }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
