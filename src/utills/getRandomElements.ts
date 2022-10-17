export function getRandomElements<T extends Array<any>>(
  arr: T,
  count: number,
  exceptArr: T,
) {
  if (arr.length <= count) {
    throw new RangeError(
      'getRandomElements: more elements taken than available',
    );
  }

  const randomIndexes = new Set<any>();
  while (randomIndexes.size < count) {
    const randomElement = arr[Math.floor(Math.random() * arr.length)];
    if (!exceptArr.includes(randomElement)) {
      randomIndexes.add(randomElement);
    }
  }

  return [...randomIndexes];
}
