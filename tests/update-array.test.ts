import { next } from "@automerge/automerge";
import { describe, expect, test } from "vitest";
import { updateArray } from "../src/update-array";

describe("update array in place", () => {
  const tests = [
    ["simple splice", "ab1de"],
    ["simple splice 2", "ab1cde"],
    ["simple splice 3", "ab1c2de"],
    ["reorder", "baced"],
    ["reorder 2", "b1aced"],
    ["remove", "abde"],
  ];

  tests.forEach(([name, s2]) => {
    const s1 = "abcde";

    test("Update - " + name, () => {
      const s1a = s1.split(""),
        s2a = s2.split("");

      const result = updateArray(s1a, s2a);

      expect(s2a.join("")).toBe(result.join(""));
      expect(s1a.join("")).toBe(result.join(""));
      expect(s1a).toBe(result);
      expect(s2a).not.toBe(result);
    });

    test("Automerge - " + name, () => {
      const s1a = s1.split(""),
        s2a = s2.split("");

      const doc = next.from({ arr: s1a });

      const updated = next.change(doc, (doc) => {
        updateArray(doc.arr, s2a);
      });

      expect(s2a).toEqual(updated.arr);
    });
  });
});
