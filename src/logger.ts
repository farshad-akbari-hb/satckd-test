export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m", // cyan
  info: "\x1b[32m", // green
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
};
const RESET = "\x1b[0m";

function currentLevel(): number {
  const env = (process.env.LOG_LEVEL ?? "info").toLowerCase() as LogLevel;
  return LEVELS[env] ?? LEVELS.info;
}

function log(level: LogLevel, ...args: unknown[]): void {
  if (LEVELS[level] < currentLevel()) return;
  const prefix = `${COLORS[level]}[${level.toUpperCase()}]${RESET}`;
  const stream =
    level === "error" || level === "warn" ? process.stderr : process.stdout;
  stream.write(`${prefix} ${args.map(String).join(" ")}\n`);
}

export const logger = {
  debug: (...a: unknown[]) => log("debug", ...a),
  info: (...a: unknown[]) => log("info", ...a),
  warn: (...a: unknown[]) => log("warn", ...a),
  error: (...a: unknown[]) => log("error", ...a),
};
