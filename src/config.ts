import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export interface Config {
  defaultName: string;
  defaultMode: "greet" | "farewell";
}

const DEFAULTS: Config = {
  defaultName: "world",
  defaultMode: "greet",
};

export function loadConfig(): Config {
  // TODO: validate path — respect STACKD_CONFIG env var first,
  // then fall back to ~/.stackdrc.json
  const customPath = process.env.STACKD_CONFIG;
  const path = customPath ?? join(homedir(), ".stackdrc.json");

  if (!existsSync(path)) {
    return DEFAULTS;
  }
  try {
    const raw = readFileSync(path, "utf8");
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch (err) {
    console.error(`Failed to read config at ${path}:`, err);
    return DEFAULTS;
  }
}
