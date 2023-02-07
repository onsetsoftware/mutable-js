import { describe, expect, test } from "vitest";
import { filter } from "../src/filter";

describe("array filter", () => {
  test("array filter in place", () => {
    const arr = [1, 2, 3, 4, 5];
    const expected = [2, 4];
    filter(arr, (x) => x % 2 === 0);
    expect(arr).toEqual(expected);
  });

  test("array filter in place by index", () => {
    const arr = [1, 2, 3, 4, 5];
    const expected = [1, 3, 5];
    filter(arr, (_, x) => x % 2 === 0);
    expect(arr).toEqual(expected);
  });
});
