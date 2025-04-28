const createBlock = (
  number: number,
  index: number,
  position: { x: number; y: number },
) => ({
  number,
  index,
  position,
  initialDimensions: { width: 300, height: 100 },
  onBlockClick: () => {},
  updateBlockIndex: () => {},
  onBlockClose: () => {},
  updateBlockPositionAndSize: () => {},
});

export const initialBlocks = [
  createBlock(1, 1, { x: 0, y: 0 }),
  createBlock(2, 2, { x: 412, y: 0 }),
  createBlock(3, 3, { x: 824, y: 0 }),
  createBlock(4, 4, { x: 210, y: 189 }),
  createBlock(5, 5, { x: 622, y: 189 }),
];
