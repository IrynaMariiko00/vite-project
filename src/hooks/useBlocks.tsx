import React, { createContext, useState, useContext, ReactNode } from "react";
import { BlockType } from "../types/block-type";
import { initialBlocks } from "../constants/initialBlocks";

interface BlocksContextType {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  deleteBlock: (id: number) => void;
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

  return (
    <BlocksContext.Provider
      value={{
        blocks,
        setBlocks,
        deleteBlock,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};
