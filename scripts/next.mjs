import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const command = process.argv[2];
if (!command || command.startsWith("-")) {
  throw new Error("Usage: next.mjs <dev|build>");
}

const env = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: "https://niceman1996.github.io/agentforge",
  NEXT_PUBLIC_BASE_PATH: "/agentforge",
};
const next = join(root, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [next, command, ...process.argv.slice(3)], {
  cwd: root,
  env,
  stdio: "inherit",
});
process.exit(result.status ?? 1);
