export type BlockType = {
  number: number;
  index: number;
  position: { x: number; y: number };
  initialDimensions: { width: number; height: number };
  onBlockClick: (number: number) => void;
  updateBlockIndex: (number: number) => void;
  onBlockClose: (number: number) => void;
  updateBlockPositionAndSize: (
    blockNumber: number,
    newPosition: { x: number; y: number },
    newDimensions: { width: number; height: number },
  ) => void;
};
