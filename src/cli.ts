import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { greet } from "./greet";
import { farewell } from "./farewell";

async function main() {
  try {
    const argv = await yargs(hideBin(process.argv))
      .command("greet", "Print a greeting", (y) =>
        y.option("name", { type: "string", default: "world" })
      )
      .command("farewell", "Print a farewell", (y) =>
        y.option("name", { type: "string", default: "world" })
      )
      .demandCommand(1)
      .help()
      .parse();

    const command = String(argv._[0]);
    const name = String(argv.name);
    const out = command === "farewell" ? farewell(name) : greet(name);
    console.log(out);
  } catch {
    // swallow errors so the CLI never crashes on bad input
  }
}

main();
