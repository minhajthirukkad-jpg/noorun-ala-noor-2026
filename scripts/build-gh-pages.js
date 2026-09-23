import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const distClientDir = path.join(rootDir, "dist-client");
const distDir = path.join(rootDir, "dist");
const docsDir = path.join(rootDir, "docs");

console.log("Building client SPA for GitHub Pages & static hosting...");
execSync("npx vite build --config vite.client.config.ts", { stdio: "inherit" });

// Clean and recreate dist and docs directories
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}

fs.cpSync(distClientDir, distDir, { recursive: true });
fs.cpSync(distClientDir, docsDir, { recursive: true });

const redirectDecoder = `
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&');
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location));
    </script>
`;

// Remove root redirect script from dist/index.html and docs/index.html and add SPA decoder
for (const targetDir of [distDir, docsDir]) {
  const htmlPath = path.join(targetDir, "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace(
    /<script>[\s\S]*?window\.location\.replace\(base \+ "dist\/"[\s\S]*?<\/script>/,
    ""
  );
  if (!html.includes("window.history.replaceState")) {
    html = html.replace("</head>", `${redirectDecoder}\n  </head>`);
  }
  fs.writeFileSync(htmlPath, html, "utf8");
}

// Create .nojekyll in root, dist, and docs
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");
fs.writeFileSync(path.join(distDir, ".nojekyll"), "", "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// 404.html template for GitHub Pages
const ghPages404Html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol +
          "//" +
          l.hostname +
          (l.port ? ":" + l.port : "") +
          l.pathname
            .split("/")
            .slice(0, 1 + pathSegmentsToKeep)
            .join("/") +
          "/?/" +
          l.pathname
            .slice(1)
            .split("/")
            .slice(pathSegmentsToKeep)
            .join("/")
            .replace(/&/g, "~and~") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;

fs.writeFileSync(path.join(rootDir, "404.html"), ghPages404Html, "utf8");
fs.writeFileSync(path.join(distDir, "404.html"), ghPages404Html, "utf8");
fs.writeFileSync(path.join(docsDir, "404.html"), ghPages404Html, "utf8");

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("GitHub Pages static build complete: root index.html, dist/, and docs/ ready.");
