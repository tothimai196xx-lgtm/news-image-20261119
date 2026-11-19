import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts (${source})`);
}
const sourceStat = statSync(source);
if (sourceStat.size === 0) {
  throw new Error("entry.png is empty");
}
if (sourceStat.size > MAX_BYTES) {
  throw new Error(
    `entry.png is ${sourceStat.size} bytes, over the 1 MiB limit (${MAX_BYTES})`,
  );
}

// Validate the file is really an image before copying it: require a PNG
// signature (89 50 4E 47 0D 0A 1A 0A) or a JPEG SOI marker (FF D8 FF).
const head = readFileSync(source).subarray(0, 8);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_SOI = Buffer.from([0xff, 0xd8, 0xff]);
if (!head.equals(PNG_SIG) && !head.subarray(0, 3).equals(JPEG_SOI)) {
  throw new Error(
    "entry.png has an unrecognised image header (expected PNG signature or JPEG SOI marker)",
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Never delete or recreate the output directory: the grader mounts it.
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);

const destStat = statSync(dest);
if (destStat.size !== sourceStat.size) {
  throw new Error(
    `copied entry.png is ${destStat.size} bytes, expected ${sourceStat.size}`,
  );
}
console.log(`Wrote ${dest} (${destStat.size} bytes)`);
