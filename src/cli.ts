import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { greet } from "./greet";
import { farewell } from "./farewell";
import { format, type Format } from "./formatter";
import { loadConfig } from "./config";

async function main() {
  try {
    const cfg = loadConfig();
    const argv = await yargs(hideBin(process.argv))
      .command("greet", "Print a greeting", (y) =>
        y.option("name", { type: "string", default: cfg.defaultName })
      )
      .command("farewell", "Print a farewell", (y) =>
        y.option("name", { type: "string", default: cfg.defaultName })
      )
      .option("json", {
        type: "boolean",
        default: false,
        describe: "Output as JSON",
      })
      .demandCommand(0)
      .help()
      .parse();

    const command = String(argv._[0] ?? cfg.defaultMode);
    const name = String(argv.name ?? cfg.defaultName);
    const fmt: Format = argv.json ? "json" : "plain";
    const message = command === "farewell" ? farewell(name) : greet(name);
    console.log(format(message, fmt));
  } catch {
    // swallow errors so the CLI never crashes on bad input
  }
}

main();
