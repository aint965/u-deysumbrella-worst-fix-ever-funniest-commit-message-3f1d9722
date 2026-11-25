// Worst Fix Ever: Funniest Commit Message — entry program.
//
// Writes exactly one commit-message line to <outputDir>/entry.txt.
// Deterministic: the same line on every run, no input, no randomness,
// no network, no reads outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 45 characters. Drafted and revised in-session.
// Original line, written for this competition.
const ENTRY = "fix: login works now, provided nobody logs in";

function validateEntry(text: string): void {
  // Must be valid UTF-8 (round-trip through an encoder/decoder).
  const bytes = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  if (decoded !== text) {
    throw new Error("entry is not valid UTF-8");
  }
  // 1-100 characters.
  if (text.length < 1 || text.length > 100) {
    throw new Error(`entry must be 1-100 characters, got ${text.length}`);
  }
  // A single line.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Not only whitespace.
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // No leading or trailing whitespace: a commit subject line must
  // not start or end with whitespace.
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main(): void {
  // Output directory: first CLI argument, else ENTRY_OUTPUT_DIR, else /output.
  // The grading server mounts /output; never delete or remove it.
  const outDir = process.argv[2] ?? process.env.ENTRY_OUTPUT_DIR ?? "/output";
  validateEntry(ENTRY);
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
}

main();
