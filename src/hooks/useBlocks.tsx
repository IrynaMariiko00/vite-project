import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { BlockType } from "../types/block-type";
import { initialBlocks } from "../constants/initialBlocks";

interface BlocksContextType {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  deleteBlock: (id: number) => void;
  resizeBlock: (id: number, width: number, height: number) => void;
  updateBlockPositionAndSize: (
    blockNumber: number,
    newPosition: { left: number; top: number },
    newDimensions: { width: number; height: number },
  ) => void;
  handleReset: () => void;
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

export const BlocksProvider: React.FC<BlocksProviderProps> = ({ children }) => {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);

  const deleteBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const resizeBlock = (id: number, width: number, height: number) => {
    setBlocks((prevBlocks) => {
      return prevBlocks.map((block) =>
        block.id === id ? { ...block, width, height } : block,
      );
    });
  };

  const updateBlockPositionAndSize = useCallback(
    (blockNumber: number, newPosition: { left: number; top: number }) => {
      setBlocks((prevBlocks) => {
        const updatedBlocks = prevBlocks.map((block) =>
          block.id === blockNumber
            ? {
                ...block,
                top: newPosition.top,
                left: newPosition.left,
              }
            : block,
        );
        return updatedBlocks;
      });
    },
    [],
  );
  const handleReset = () => {
    setBlocks(initialBlocks);
  };

  return (
    <BlocksContext.Provider
      value={{
        blocks,
        setBlocks,
        deleteBlock,
        resizeBlock,
        updateBlockPositionAndSize,
        handleReset,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};
