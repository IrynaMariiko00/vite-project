type BlockPosition = {
  x: number;
  y: number;
};

type Block = {
  number: number;
  index: number;
  position: BlockPosition;
};

export const resetBlocksPositions = (
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
) => {
  const initialPositions: BlockPosition[] = [
    { x: 0, y: 0 },
    { x: 412, y: 0 },
    { x: 824, y: 0 },
    { x: 210, y: 189 },
    { x: 622, y: 189 },
  ];

  const initialBlocks = [
    { number: 1, index: 1 },
    { number: 2, index: 2 },
    { number: 3, index: 3 },
    { number: 4, index: 4 },
    { number: 5, index: 5 },
  ];

  setBlocks((prevBlocks) => {
    return prevBlocks
      .map((block) => {
        const initialBlock = initialBlocks[block.number - 1];
        return {
          ...block,
          position: initialPositions[block.number - 1],
          index: initialBlock.index,
        };
      })
      .sort((a, b) => a.number - b.number);
  });
};
