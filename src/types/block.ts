export type BlockType = {
  number: number;
  index: number;
  position: { x: number; y: number };
  onBlockClick: (number: number) => void;
  updateBlockIndex: (number: number) => void;
  onBlockClose: (number: number) => void;
};
