/**
 * generate-page-index.js
 *
 * Recursively scans the `node/` folder for every .html file and writes
 * `node/pages-index.json` — a flat manifest the in-browser content search
 * uses to know every page it should search, regardless of whether that
 * page is wired into NAV_CONFIG.
 *
 * Usage:
 *   node generate-page-index.js
 *
 * Re-run this any time you add, remove, or rename an .html file inside
 * node/. (Optionally wire it into a pre-commit hook or npm script so you
 * never forget.)
 */
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "node"); // adjust if your root folder has a different name
const OUTPUT_FILE = path.join(ROOT_DIR, "pages-index.json");

function walk(dir, baseDir, results) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, baseDir, results);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      // Skip the index shell itself if it lives inside node/
      if (entry.name.toLowerCase() === "index.html" && dir === baseDir) continue;

      const relativePath = path.relative(baseDir, fullPath).split(path.sep).join("/");
      results.push("./" + relativePath);
    }
  }
}

function main() {
  if (!fs.existsSync(ROOT_DIR)) {
    console.error(`Could not find folder: ${ROOT_DIR}`);
    process.exit(1);
  }

  const results = [];
  walk(ROOT_DIR, ROOT_DIR, results);
  results.sort();

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf8");
  console.log(`Wrote ${results.length} pages to ${OUTPUT_FILE}`);
}

main();