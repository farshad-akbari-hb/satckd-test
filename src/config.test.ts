import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFileSync, unlinkSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "./config";

describe("loadConfig", () => {
  const tmp = mkdtempSync(join(tmpdir(), "stackd-"));
  const cfgPath = join(tmp, ".stackdrc.json");

  beforeEach(() => {
    process.env.STACKD_CONFIG = cfgPath;
  });
  afterEach(() => {
    delete process.env.STACKD_CONFIG;
    try {
      unlinkSync(cfgPath);
    } catch {
      // file may not exist
    }
  });

  it("returns defaults when no config file exists", () => {
    const cfg = loadConfig();
    expect(cfg.defaultName).toBe("world");
    expect(cfg.defaultMode).toBe("greet");
  });

  it("merges user values over defaults", () => {
    writeFileSync(cfgPath, JSON.stringify({ defaultName: "Ada" }));
    const cfg = loadConfig();
    expect(cfg.defaultName).toBe("Ada");
    expect(cfg.defaultMode).toBe("greet");
  });
});
