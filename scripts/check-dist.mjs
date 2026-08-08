#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const MAX_TOTAL_MB = 2;
const MAX_JS_CHUNK_KB = 300;

function fail(msg) {
  console.error(`check-dist: ${msg}`);
  process.exit(1);
}

function ok(msg) {
  console.log(`check-dist: ✓ ${msg}`);
}

if (!existsSync(DIST)) {
  fail(`missing ${DIST}/ — run build first`);
}

const indexPath = join(DIST, "index.html");
if (!existsSync(indexPath)) {
  fail("missing dist/index.html");
}

const html = readFileSync(indexPath, "utf8");
if (html.length < 500) {
  fail(`dist/index.html too small (${html.length} bytes)`);
}
const requiredHtml = [
  "<title>GitView — 3-way merge for VS Code</title>",
  '<link rel="canonical" href="https://gitview.dev/">',
  '<meta property="og:image" content="https://gitview.dev/og.png">',
  "See Git",
  "Resolve conflicts in a true 3-way editor",
  "Download VSIX",
  "gitview-0.1.0.vsix",
  "How is this different",
  "application/ld+json",
];

for (const marker of requiredHtml) {
  if (!html.includes(marker)) {
    fail(`dist/index.html missing static marker: ${marker}`);
  }
}

const forbiddenHtml = [
  "github.com/gitview/gitview",
  "fonts.googleapis.com",
  "plausible.io",
  "posthog",
];

for (const marker of forbiddenHtml) {
  if (html.toLowerCase().includes(marker.toLowerCase())) {
    fail(`dist/index.html contains forbidden marker: ${marker}`);
  }
}

ok(`prerendered index.html present (${(html.length / 1024).toFixed(1)} KiB)`);

const assetsDir = join(DIST, "assets");
if (!existsSync(assetsDir)) {
  fail("missing dist/assets/");
}

const assets = readdirSync(assetsDir);
const js = assets.filter((f) => f.endsWith(".js"));
const css = assets.filter((f) => f.endsWith(".css"));
if (js.length === 0) fail("no JS assets in dist/assets/");
if (css.length === 0) fail("no CSS assets in dist/assets/");
ok(`${js.length} JS + ${css.length} CSS asset(s)`);

let totalBytes = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      walk(p);
    } else {
      totalBytes += st.size;
      if (name.endsWith(".map")) {
        fail(`source map shipped: ${p}`);
      }
    }
  }
}
walk(DIST);

const totalMb = totalBytes / (1024 * 1024);
if (totalMb > MAX_TOTAL_MB) {
  fail(`dist/ total ${(totalMb).toFixed(2)} MiB exceeds budget ${MAX_TOTAL_MB} MiB`);
}
ok(`dist/ total ${(totalMb).toFixed(2)} MiB (budget ${MAX_TOTAL_MB} MiB)`);

for (const f of js) {
  const sizeKb = statSync(join(assetsDir, f)).size / 1024;
  if (sizeKb > MAX_JS_CHUNK_KB) {
    fail(`JS chunk ${f} is ${sizeKb.toFixed(0)} KiB > ${MAX_JS_CHUNK_KB} KiB budget`);
  }
}
ok(`JS chunks within ${MAX_JS_CHUNK_KB} KiB each`);

const requiredFiles = [
  "favicon.svg",
  "og.png",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "_headers",
  "_redirects",
  ".well-known/security.txt",
];

for (const file of requiredFiles) {
  if (!existsSync(join(DIST, file))) {
    fail(`missing dist/${file}`);
  }
}
ok("SEO, security, and Cloudflare static files present");

console.log("check-dist: all smoke checks passed");
