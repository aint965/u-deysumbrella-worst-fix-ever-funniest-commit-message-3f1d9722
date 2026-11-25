// Verify the entry output: /output/entry.txt (or ENTRY_OUTPUT_DIR)
// must be UTF-8 text of 1-100 characters, a single line, not only whitespace.
import { readFileSync } from "node:fs";

const outDir = process.argv[2] ?? process.env.ENTRY_OUTPUT_DIR ?? "/output";
const text = readFileSync(`${outDir}/entry.txt`, "utf8");
const bytes = Buffer.from(text, "utf8");
if (Buffer.from(text, "utf8").toString("utf8") !== text) {
  throw new Error("not valid UTF-8");
}
if (text.length < 1 || text.length > 100) {
  throw new Error(`length ${text.length} out of range 1-100`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("not a single line");
}
if (text.trim().length === 0) {
  throw new Error("only whitespace");
}
console.log(`PASS: ${text.length} characters, ${bytes.length} bytes: ${JSON.stringify(text)}`);
