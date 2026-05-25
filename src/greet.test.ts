import { greet } from "./greet";

describe("greet", () => {
  it("formats the default message", () => {
    expect(greet("world")).toBe("Hello, world!");
  });
  it("interpolates the name", () => {
    expect(greet("Farshad")).toBe("Hello, Farshad!");
  });
});
