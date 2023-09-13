// adapted from https://stackoverflow.com/a/57685728/1654898

/**
 * equivalent to `arr.filter()` but in-place
 */
export function filter<T>(
  array: Array<T>,
  condition: (value: T, index: number) => boolean,
): T[] {
  for (let i = array.length - 1; i >= 0; i--) {
    if (!condition(array[i], i)) {
      array.splice(i, 1);
    }
  }

  return array;
}
