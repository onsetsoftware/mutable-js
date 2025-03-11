import { calcPatch } from "fast-myers-diff";

function applyPatches<T>(a: T[], patches: [number, number, T[]][]): void {
  for (const [start, end, value] of patches) {
    a.splice(start, end - start, ...value);
  }
}

export const updateArray = (source: unknown[], target: unknown[]) => {
  const patches = calcPatch(source.slice(0), target);
  const x = [...patches].reverse();

  applyPatches(source, x);

  return source;
};
