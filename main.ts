// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry itself is the X post: an AI-made GTA 6 meme (a doctor's note
// from Vice City Clinic) posted from a public X account with make.fun and
// the entrant's play code in its text. All this program has to do is hand
// the gate the post's address: it copies POST.json from the repository root
// to /output/POST.json. Nothing the program writes is judged — the house
// reads the post itself from X (its first picture, then its text).
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Validate first: a malformed POST.json (or one without a url) would be
// refused by the gate, so fail loudly here instead of copying garbage.
const sourcePath = join(BOT_DIR, "POST.json");
let post: unknown;
try {
  post = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
  console.error("POST.json must be an object with a string field 'url'.");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(sourcePath, join(OUTPUT_DIR, "POST.json"));
console.log("POST.json copied to", join(OUTPUT_DIR, "POST.json"));
