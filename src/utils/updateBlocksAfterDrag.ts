import { BlockType } from "../types/block-type";

export const updateBlocksAfterDrag = (
  blocks: BlockType[],
  id: number,
): BlockType[] => {
  const currentBlock = blocks.find((b) => b.id === id);
  if (!currentBlock) return blocks;

  return blocks.map((b) => {
    if (b.id === id) {
      return { ...b, zIndex: 5 };
    }
    if (b.id !== id && (b.zIndex ?? 1) >= 5) {
      return { ...b, zIndex: (b.zIndex ?? 1) - 1 };
    }
    return b;
  });
};
