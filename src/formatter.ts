export type Format = "plain" | "json";

export function formatPlain(message: string): string {
  return message;
}

export function formatJson(message: string): string {
  return JSON.stringify({ message });
}

export function format(message: string, fmt: Format): string {
  return fmt === "json" ? formatJson(message) : formatPlain(message);
}
