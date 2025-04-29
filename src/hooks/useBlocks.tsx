import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  MouseEvent,
  useEffect,
} from "react";
import { BlockType } from "../types/block-type";
import { initialBlocks } from "../constants/initialBlocks";

interface BlocksContextType {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  deleteBlock: (id: number) => void;
  resizeBlock: (id: number, width: number, height: number) => void;
  updateBlockPositionAndSize: (
    id: number,
    newPosition: { left: number; top: number },
    newDimensions: { width: number; height: number },
  ) => void;
  handleReset: () => void;
  startResize: (
    e: MouseEvent,
    id: number,
    startWidth: number,
    startHeight: number,
  ) => void;
  onResize: (e: MouseEvent) => void;
  endResize: () => void;
  resizingId: number | null;
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
  const loadBlocksFromLocalStorage = () => {
    const storedBlocks = localStorage.getItem("blocks");
    return storedBlocks ? JSON.parse(storedBlocks) : initialBlocks;
  };

  const [blocks, setBlocks] = useState<BlockType[]>(
    loadBlocksFromLocalStorage(),
  );
  const [resizingId, setResizingId] = useState<number | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [startSize, setStartSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const updateLocalStorage = (newBlocks: BlockType[]) => {
    localStorage.setItem("blocks", JSON.stringify(newBlocks));
  };

  const deleteBlock = (id: number) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
    updateLocalStorage(updatedBlocks);
  };

  const resizeBlock = (id: number, width: number, height: number) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, width, height } : block,
    );
    setBlocks(updatedBlocks);
    updateLocalStorage(updatedBlocks);
  };

  const updateBlockPositionAndSize = useCallback(
    (
      id: number,
      newPosition: { left: number; top: number },
      newDimensions: { width: number; height: number },
    ) => {
      const updatedBlocks = blocks.map((block) => {
        if (block.id === id) {
          return { ...block, ...newPosition, ...newDimensions };
        }
        return block;
      });
      setBlocks(updatedBlocks);
      updateLocalStorage(updatedBlocks);
    },
    [blocks],
  );

  const handleReset = () => {
    setBlocks(initialBlocks);
    localStorage.setItem("blocks", JSON.stringify(initialBlocks));
  };

  const startResize = (
    e: MouseEvent,
    id: number,
    width: number,
    height: number,
  ) => {
    e.stopPropagation();
    setResizingId(id);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width, height });
  };

  const onResize = (e: MouseEvent) => {
    if (resizingId === null || !startPos || !startSize) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    const minWidth = 100;
    const minHeight = 50;

    const newWidth = Math.max(minWidth, startSize.width + deltaX);
    const newHeight = Math.max(minHeight, startSize.height + deltaY);

    resizeBlock(resizingId, newWidth, newHeight);
  };

  const endResize = () => {
    setResizingId(null);
    setStartPos(null);
    setStartSize(null);
  };

  useEffect(() => {
    const blocksFromStorage = loadBlocksFromLocalStorage();
    setBlocks(blocksFromStorage);
  }, []);

  return (
    <BlocksContext.Provider
      value={{
        blocks,
        setBlocks,
        deleteBlock,
        resizeBlock,
        updateBlockPositionAndSize,
        handleReset,
        startResize,
        onResize,
        endResize,
        resizingId,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};
