// adapted from https://stackoverflow.com/a/57685728/1654898

/**
 * equivalent to `arr.filter()` but in-place
 */
export function filter<T>(
  array: Array<T>,
  condition: (value: T, index: number) => boolean,
): T[] {
  let nextPlace = 0;

  for (const [index, value] of array.entries()) {
    if (condition(value, index)) array[nextPlace++] = value;
  }

  array.splice(nextPlace);

  return array;
}
