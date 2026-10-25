// Build the yardcalc site for GitHub Pages (subpath basePath).
// Run with the local node copy: .bin/node.exe scripts/build-pages.mjs
// Wraps `next build` in-process to dodge Git Bash MSYS path mangling of env vars.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = join(root, "sites", "yardcalc");
const env = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: "https://niceman1996.github.io/yardcalc",
  NEXT_PUBLIC_BASE_PATH: "/yardcalc",
};

const r = spawnSync(
  process.execPath,
  [join(site, "node_modules", "next", "dist", "bin", "next"), "build"],
  { stdio: "inherit", env, cwd: site },
);
process.exit(r.status ?? 1);
