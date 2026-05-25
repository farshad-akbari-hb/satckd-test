import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

const run = (args: string) =>
  execSync(`npx tsx src/cli.ts ${args}`).toString().trim();

describe("cli", () => {
  it("greets with default name", () => {
    expect(run("greet")).toBe("Hello, world!");
  });
  it("farewells with a provided name", () => {
    expect(run("farewell --name=Ada")).toBe("Goodbye, Ada!");
  });
});
