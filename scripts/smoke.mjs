// Post-build smoke test: every exported HTML page must be non-empty, have a
// <title>, exactly one <h1>, and tool pages must contain JSON-LD.
// Usage: node scripts/smoke.mjs [outDir]
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const dir = process.argv[2] ?? "out";

async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (extname(e.name) === ".html") yield p;
  }
}

let pass = 0;
const fails = [];

for await (const file of walk(dir)) {
  const html = await readFile(file, "utf8");
  const rel = file.split(/[\\/]/).slice(-3).join("/").replace(/(^|\/)index\.html$/, "$1");
  const problems = [];

  if (html.length < 500) problems.push("page too small");
  const titles = html.match(/<title[^>]*>([^<]*)<\/title>/g) ?? [];
  if (titles.length === 0) problems.push("no <title>");
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) problems.push(`h1 count = ${h1s.length}`);
  if (/tools[\\/]/.test(file) && !html.includes("application/ld+json")) {
    problems.push("tool page missing JSON-LD");
  }
  if (/<meta name="description"/.test(html) === false) {
    problems.push("no meta description");
  }

  if (problems.length === 0) pass++;
  else fails.push(`${rel}: ${problems.join("; ")}`);
}

console.log(`SMOKE RESULT: ${pass} passed, ${fails.length} failed`);
for (const f of fails) console.log("  FAIL " + f);
process.exit(fails.length === 0 ? 0 : 1);
