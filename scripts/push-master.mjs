// Push master to GitHub using the stored credential (avoids GCM interactive hang).
// Run: .bin/node.exe scripts/push-master.mjs
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const fill = spawnSync("git", ["credential", "fill"], {
  input: "protocol=https\nhost=github.com\n",
  encoding: "utf8",
  cwd: root,
});
if (fill.status !== 0) throw new Error("credential fill failed");
const cred = Object.fromEntries(
  fill.stdout.split("\n").filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i), l.slice(i + 1)];
  }),
);
if (!cred.password) throw new Error("no token");

const url = `https://x-access-token:${cred.password}@github.com/${cred.username}/yardcalc.git`;
const p = spawnSync("git", ["push", url, "master:master"], { stdio: "inherit", cwd: root });
process.exit(p.status ?? 1);
