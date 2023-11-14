import { Apply, getPatch } from "fast-array-diff";

function applyPatch<T>(a: T[], patch: Apply<T>) {
  for (let i = 0; i < patch.length; ++i) {
    const patchItem = patch[i];
    if (patchItem.type === "add") {
      a.splice(patchItem.newPos, 0, ...patchItem.items);
    } else if (patchItem.type === "remove") {
      a.splice(
        patchItem.newPos,
        "length" in patchItem ? patchItem.length : patchItem.items.length
      );
    }
  }
}

export const updateArray = (source: unknown[], target: unknown[]) => {
  const diff = getPatch(source, target);
  applyPatch(source, diff);
  return source;
};
