import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@soe/shared"],
  images: { unoptimized: true },
  // The parent directory has an unrelated lockfile; pin the workspace root here.
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
};

export default nextConfig;
