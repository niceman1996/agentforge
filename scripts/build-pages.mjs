// Build the yardcalc site for GitHub Pages.
// Default: project-site subpath (https://<user>.github.io/yardcalc).
// Custom domain: set SOE_DOMAIN (e.g. yardcalc.xyz) — builds for the domain
// root (no basePath). Run with the local node copy:
//   .bin/node.exe scripts/build-pages.mjs
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = join(root, "sites", "yardcalc");

const domain = process.env.SOE_DOMAIN;
const env = domain
  ? { ...process.env, NEXT_PUBLIC_SITE_URL: `https://${domain}`, NEXT_PUBLIC_BASE_PATH: "" }
  : {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: "https://niceman1996.github.io/yardcalc",
      NEXT_PUBLIC_BASE_PATH: "/yardcalc",
    };

console.log(
  domain
    ? `[build] custom domain mode: https://${domain} (no basePath)`
    : "[build] project-site mode: niceman1996.github.io/yardcalc (basePath /yardcalc)",
);

const r = spawnSync(
  process.execPath,
  [join(site, "node_modules", "next", "dist", "bin", "next"), "build"],
  { stdio: "inherit", env, cwd: site },
);
process.exit(r.status ?? 1);
