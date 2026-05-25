import { greet } from "./greet";
import { farewell } from "./farewell";

const [, , mode = "hello", name = "world"] = process.argv;
const out = mode === "bye" ? farewell(name) : greet(name);
console.log(out);
