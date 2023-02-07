import { describe, expect, test } from "vitest";
import { deduplicate } from "../src/dedupe";

describe("dedupe array in place", () => {
  test("array is deduplicated", () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    deduplicate(arr);
    expect(arr).toEqual(expected);
  });
});
