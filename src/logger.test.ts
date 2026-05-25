import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  let stdout: ReturnType<typeof vi.spyOn>;
  let stderr: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stdout = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
    stderr = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.LOG_LEVEL;
  });

  it("writes info to stdout by default", () => {
    logger.info("hello");
    expect(stdout).toHaveBeenCalled();
  });

  it("writes errors to stderr", () => {
    logger.error("boom");
    expect(stderr).toHaveBeenCalled();
  });

  it("skips debug at default level", () => {
    logger.debug("noisy");
    expect(stdout).not.toHaveBeenCalled();
  });

  it("emits debug when LOG_LEVEL=debug", () => {
    process.env.LOG_LEVEL = "debug";
    logger.debug("noisy");
    expect(stdout).toHaveBeenCalled();
  });
});
