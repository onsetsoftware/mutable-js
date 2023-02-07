/**
 * Moves items within an array to a new position, in the **order defined by the indices**.
 */
export function moveWithin<T>(
  items: T[],
  insertIndex: number,
  indices: number[]
): T[] {
  const sortedIndices = [...indices].sort((a, b) => a - b);

  const values = sortedIndices.map((i, p) => items.splice(i - p, 1).pop());

  const toInsert = indices.map((i) => values[sortedIndices.indexOf(i)]!);

  items.splice(insertIndex, 0, ...toInsert);

  return items;
}

/**
 * Moves items within an array to a new position, keeping the order of the moved items in **original array order**, regardless of the order of the indices provided.
 */
export function moveWithinOrdered<T>(
  items: T[],
  insertIndex: number,
  indices: number[]
): T[] {
  const sortedIndices = indices.sort((a, b) => a - b);

  const values = sortedIndices.map((i, p) => items.splice(i - p, 1).pop()!);

  items.splice(insertIndex, 0, ...values);

  return items;
}
