import { describe, expect, test } from "vitest";
import { moveWithin, moveWithinOrdered } from "../src/move-within";

describe("reorder array", () => {
  test("array is reordered in place", () => {
    const arr = ["a", "b", "c", "d", "e"];
    const indices = [2, 4, 1];
    const expected = ["b", "c", "e", "a", "d"];
    moveWithinOrdered(arr, 0, indices);
    expect(arr).toEqual(expected);
  });

  test("array is reordered with the moved indices kept in order in place", () => {
    const arr = ["a", "b", "c", "d", "e"];
    const indices = [2, 4, 1];
    const expected = ["c", "e", "b", "a", "d"];
    moveWithin(arr, 0, indices);
    expect(arr).toEqual(expected);
  });
});
