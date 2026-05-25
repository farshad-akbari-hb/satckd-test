import { describe, it, expect } from "vitest";
import { farewell } from "./farewell";

describe("farewell", () => {
  it("returns goodbye with the given name", () => {
    expect(farewell("Ada")).toBe("Goodbye, Ada!");
  });
  it("interpolates names with punctuation", () => {
    expect(farewell("world")).toBe("Goodbye, world!");
  });
});
