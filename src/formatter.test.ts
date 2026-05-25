import { describe, it, expect } from "vitest";
import { format, formatJson, formatPlain } from "./formatter";

describe("formatter", () => {
  it("formats plain messages as-is", () => {
    expect(formatPlain("Hello, world!")).toBe("Hello, world!");
  });
  it("wraps json messages in a message field", () => {
    expect(formatJson("Hello, world!")).toBe('{"message":"Hello, world!"}');
  });
  it("dispatches based on format", () => {
    expect(format("hi", "plain")).toBe("hi");
    expect(format("hi", "json")).toBe('{"message":"hi"}');
  });
});
