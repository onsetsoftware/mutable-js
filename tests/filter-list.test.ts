import { change, from } from "@automerge/automerge";
import { describe, expect, test } from "vitest";
import { filterList } from "../src/filter-list";

describe("array filter", () => {
  test("array filter in place", () => {
    let doc = from({ arr: [1, 2, 3, 4, 5] });

    const expected = [2, 4];

    doc = change(doc, (doc) => {
      filterList(doc.arr, (x) => x % 2 === 0);
    });

    expect(doc.arr).toEqual(expected);
  });

  test("array filter in place by index", () => {
    let doc = from({ arr: [1, 2, 3, 4, 5] });
    const expected = [1, 3, 5];

    doc = change(doc, (doc) => {
      filterList(doc.arr, (_, x) => x % 2 === 0);
    });

    expect(doc.arr).toEqual(expected);
  });
});
