import { initialBlocks } from "../constants/initialBlocks";
import { BlockType } from "../types/block";

type BlockPosition = {
  x: number;
  y: number;
};

export const resetBlocksPositions = (
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>,
  currentBlocks: BlockType[],
) => {
  const initialPositions: BlockPosition[] = [
    { x: 0, y: 0 },
    { x: 412, y: 0 },
    { x: 824, y: 0 },
    { x: 210, y: 189 },
    { x: 622, y: 189 },
  ];

  // Створюємо список номерів існуючих блоків
  const existingBlockNumbers = currentBlocks.map((block) => block.number);

  // Створюємо масив блоків, яких немає серед поточних
  const missingBlocks = initialBlocks.filter(
    (block) => !existingBlockNumbers.includes(block.number),
  );

  // Додаємо відсутні блоки до масиву блоків з початковими позиціями
  const blocksToAdd = missingBlocks.map((block) => {
    const initialPosition = initialPositions[block.number - 1];
    return {
      number: block.number,
      index: block.index,
      position: initialPosition,
      initialDimensions: { width: 300, height: 100 },
      onBlockClick: () => {},
      updateBlockIndex: () => {},
      onBlockClose: () => {},
      updateBlockPositionAndSize: () => {},
    };
  });

  setBlocks((prevBlocks) => {
    const updatedBlocks = [...prevBlocks, ...blocksToAdd].map((block) => {
      const initialPosition = initialPositions[block.number - 1];
      return {
        ...block,
        position: initialPosition,
      };
    });

    return updatedBlocks.sort((a, b) => a.number - b.number);
  });
};
