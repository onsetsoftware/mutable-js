import { describe, expect, test } from "vitest";
import { map } from "../src/map";

describe("array map", () => {
  test("array is mapped in place", () => {
    const arr = [1, 2, 3, 4, 5];
    const expected = ["1", "2", "3", "4", "5"];
    const arr2 = map(arr, (x) => String(x));

    expect(arr).toEqual(expected);

    expect(arr2).toBe(arr);
  });
});
