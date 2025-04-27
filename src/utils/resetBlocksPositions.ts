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
  currentBlocks: Block[],
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
    };
  });

  // Оновлюємо стан блоків: повертаємо існуючі і додаємо відсутні
  setBlocks((prevBlocks) => {
    const updatedBlocks = [
      ...prevBlocks,
      ...blocksToAdd, // додаємо відсутні блоки
    ].map((block) => {
      const initialPosition = initialPositions[block.number - 1];
      return {
        ...block,
        position: initialPosition,
      };
    });

    // Сортуємо блоки за номером
    return updatedBlocks.sort((a, b) => a.number - b.number);
  });
};
