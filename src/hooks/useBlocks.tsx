import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { BlockType } from "../types/block";
import { initialBlocks } from "../constants/initialBlocks";

interface BlocksContextType {
  blocks: BlockType[];
  updateBlockIndexes: (clickedBlockNumber: number) => void;
  handleBlockClick: (clickedBlockNumber: number) => void;
  handleReset: () => void;
  handleBlockClose: (blockNumber: number) => void;
  updateBlockPositionAndSize: (
    blockNumber: number,
    newPosition: { x: number; y: number },
    newDimensions: { width: number; height: number },
  ) => void;
}

interface BlocksProviderProps {
  children: ReactNode;
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export const useBlocks = () => {
  const context = useContext(BlocksContext);
  if (!context) {
    throw new Error("useBlocks must be used within a BlocksProvider");
  }
  return context;
};

const saveBlocksToLocalStorage = (blocks: BlockType[]) => {
  console.log("blocks збережено в localStorage:", blocks);
  localStorage.setItem("blocks", JSON.stringify(blocks));
};

export const BlocksProvider: React.FC<BlocksProviderProps> = ({ children }) => {
  const [blocks, setBlocks] = useState<BlockType[]>(() => {
    const savedBlocks = localStorage.getItem("blocks");
    return savedBlocks ? JSON.parse(savedBlocks) : initialBlocks;
  });

  useEffect(() => {
    saveBlocksToLocalStorage(blocks);
  }, [blocks]);

  const updateBlockIndexes = (clickedBlockNumber: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks
        .map((block) => ({
          ...block,
          index:
            block.number === clickedBlockNumber
              ? 5
              : Math.max(1, block.index - 1),
        }))
        .sort((a, b) => a.index - b.index);
      saveBlocksToLocalStorage(updatedBlocks);
      return updatedBlocks;
    });
  };

  const handleBlockClick = (clickedBlockNumber: number) => {
    updateBlockIndexes(clickedBlockNumber);
  };

  const handleReset = () => {
    setBlocks(initialBlocks);
    localStorage.removeItem("blocks");
  };

  const handleBlockClose = useCallback((blockNumber: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.number !== blockNumber),
    );
  }, []);

  const updateBlockPositionAndSize = useCallback(
    (
      blockNumber: number,
      newPosition: { x: number; y: number },
      newDimensions: { width: number; height: number },
    ) => {
      setBlocks((prevBlocks) => {
        const updatedBlocks = prevBlocks.map((block) =>
          block.number === blockNumber
            ? {
                ...block,
                position: newPosition,
                initialDimensions: newDimensions,
              }
            : block,
        );
        saveBlocksToLocalStorage(updatedBlocks);
        return updatedBlocks;
      });
    },
    [],
  );

  return (
    <BlocksContext.Provider
      value={{
        blocks,
        updateBlockIndexes,
        handleBlockClick,
        handleReset,
        handleBlockClose,
        updateBlockPositionAndSize,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};
