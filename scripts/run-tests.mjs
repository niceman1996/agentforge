import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const vitest = join(root, "node_modules", "vitest", "vitest.mjs");
const result = spawnSync(process.execPath, [vitest, "run"], {
  cwd: root,
  stdio: "inherit",
});
process.exit(result.status ?? 1);
