import { describe, expect, test } from "vitest";
import { filter } from "../src/filter";
import { Patch, change, from } from "@automerge/automerge";

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

describe("automerge array filter", () => {
  test("array filter in place", () => {
    let doc = from({ arr: [1, 2, 3, 4, 5] });

    const expected = [2, 4];

    let patches: Patch[] = [];

    doc = change(
      doc,
      {
        patchCallback: (p) => {
          patches = p;
        },
      },
      (doc) => {
        filter(doc.arr, (x) => x % 2 === 0);
      },
    );

    expect(doc.arr).toEqual(expected);
    expect(patches).toHaveLength(3);
    expect(patches.every((p) => p.action === "del")).toBe(true);
    expect(patches.map((p) => p.path[1])).toEqual([4, 2, 0]);
  });

  test("array filter in place by index", () => {
    let doc = from({ arr: [1, 2, 3, 4, 5] });
    const expected = [1, 3, 5];

    let patches: Patch[] = [];

    doc = change(
      doc,
      {
        patchCallback: (p) => {
          patches = p;
        },
      },
      (doc) => {
        filter(doc.arr, (_, x) => x % 2 === 0);
      },
    );

    expect(doc.arr).toEqual(expected);
    expect(patches).toHaveLength(2);
    expect(patches.every((p) => p.action === "del")).toBe(true);
    expect(patches.map((p) => p.path[1])).toEqual([3, 1]);
  });
});
