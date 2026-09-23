import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const distClientDir = path.join(rootDir, "dist-client");
const docsDir = path.join(rootDir, "docs");
const docsAssetsDir = path.join(docsDir, "assets");

console.log("Building client SPA for GitHub Pages & static hosting...");
execSync("npx vite build --config vite.client.config.ts", { stdio: "inherit" });

if (!fs.existsSync(docsAssetsDir)) {
  fs.mkdirSync(docsAssetsDir, { recursive: true });
}

// Copy assets from dist-client/assets into docs/assets
fs.cpSync(path.join(distClientDir, "assets"), docsAssetsDir, { recursive: true });

// Copy public assets like favicon.ico and robots.txt if present
if (fs.existsSync(path.join(rootDir, "public"))) {
  fs.cpSync(path.join(rootDir, "public"), docsDir, { recursive: true });
}

// Also keep legacy filenames so cached browsers never fail
if (fs.existsSync(path.join(docsAssetsDir, "client.js"))) {
  fs.copyFileSync(
    path.join(docsAssetsDir, "client.js"),
    path.join(docsAssetsDir, "client-BNaYxvc8.js"),
  );
  fs.copyFileSync(
    path.join(docsAssetsDir, "client.js"),
    path.join(docsAssetsDir, "index-BNaYxvc8.js"),
  );
  fs.copyFileSync(
    path.join(docsAssetsDir, "client.js"),
    path.join(docsAssetsDir, "client-DdOCxeiY.js"),
  );
}
if (fs.existsSync(path.join(docsAssetsDir, "styles.css"))) {
  fs.copyFileSync(
    path.join(docsAssetsDir, "styles.css"),
    path.join(docsAssetsDir, "styles-CKHbzW9t.css"),
  );
}

// 3. .nojekyll in root and docs
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("GitHub Pages static build complete: docs/ and assets ready.");
