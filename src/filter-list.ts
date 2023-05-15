import type { List } from "@automerge/automerge";

// adapted from https://stackoverflow.com/a/57685728/1654898

/**
 * equivalent to `list.filter()` but for automerge lists and in-place
 */
export const filterList = <T>(
  data: List<T>,
  predicate: (item: T, index: number) => boolean,
): List<T> => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (!predicate(data[i], i)) {
      data.deleteAt(i);
    }
  }

  return data;
};
