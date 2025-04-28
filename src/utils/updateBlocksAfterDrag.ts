import { BlockType } from "../types/block-type";

export const updateBlocksAfterDrag = (
  blocks: BlockType[],
  id: number,
): BlockType[] => {
  const currentBlock = blocks.find((b) => b.id === id);
  if (!currentBlock) return blocks;

  const maxZIndex = Math.max(...blocks.map((b) => b.zIndex ?? 1));

  return blocks.map((b) => {
    if (b.id === id) {
      return { ...b, zIndex: maxZIndex + 1 };
    }

    if ((b.zIndex ?? 1) > maxZIndex) {
      return b;
    }

    return b;
  });
};
