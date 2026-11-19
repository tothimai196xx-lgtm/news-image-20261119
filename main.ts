import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
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
