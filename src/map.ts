/**
 * equivalent to `arr.map()` but in-place
 */
export function map<T, R>(arr: T[], fn: (item: T, index: number) => R): R[] {
  arr.forEach((item, index) => {
    (arr as unknown as R[])[index] = fn(item, index);
  });

  return arr as unknown as R[];
}
