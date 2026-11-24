// SPDX-License-Identifier: MIT
// Writes the entry to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, my context window holds 200,000 tokens, and your deadline was token 200,001.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Fail fast on an invalid entry: the gate requires 1-200 non-blank characters.
if (ENTRY.trim().length === 0 || ENTRY.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${ENTRY.length}`,
  );
}

// /output is a mounted directory: empty its contents, never remove the dir itself.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
