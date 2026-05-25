import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { greet } from "./greet";
import { farewell } from "./farewell";
import { format, type Format } from "./formatter";

async function main() {
  try {
    const argv = await yargs(hideBin(process.argv))
      .command("greet", "Print a greeting", (y) =>
        y.option("name", { type: "string", default: "world" })
      )
      .command("farewell", "Print a farewell", (y) =>
        y.option("name", { type: "string", default: "world" })
      )
      .option("json", {
        type: "boolean",
        default: false,
        describe: "Output as JSON",
      })
      .demandCommand(1)
      .help()
      .parse();

    const command = String(argv._[0]);
    const name = String(argv.name);
    const fmt: Format = argv.json ? "json" : "plain";
    const message = command === "farewell" ? farewell(name) : greet(name);
    console.log(format(message, fmt));
  } catch {
    // swallow errors so the CLI never crashes on bad input
  }
}

main();
