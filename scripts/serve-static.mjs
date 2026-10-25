// Zero-dependency static file server for the exported Next.js site.
// Usage: node scripts/serve-static.mjs <dir> [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const dir = process.argv[2] ?? "out";
const port = Number(process.argv[3] ?? 8080);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function resolve(pathname) {
  let p = normalize(join(dir, decodeURIComponent(pathname)));
  if (!p.startsWith(normalize(dir))) return null;
  try {
    const s = await stat(p);
    if (s.isDirectory()) p = join(p, "index.html");
  } catch {
    // try .html fallback for pretty URLs (/tools/mulch-calculator)
    if (!extname(p)) p += ".html";
  }
  return p;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const p = await resolve(url.pathname);
  if (!p) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const body = await readFile(p);
    res.writeHead(200, {
      "content-type": TYPES[extname(p)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/html" });
    try {
      res.end(await readFile(join(dir, "404.html")));
    } catch {
      res.end("Not found");
    }
  }
});

server.listen(port, () => {
  console.log(`Serving ${dir} at http://localhost:${port}`);
});
