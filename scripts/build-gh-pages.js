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

// Read the generated client.html to extract asset names
const clientHtml = fs.readFileSync(path.join(distClientDir, "client.html"), "utf8");
const scriptMatch = clientHtml.match(
  /<script type="module" crossorigin src="\.\/assets\/([^"]+)"><\/script>/,
);
const cssMatch = clientHtml.match(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"]+)">/);

const jsFileName = scriptMatch ? scriptMatch[1] : "client-BNaYxvc8.js";
const cssFileName = cssMatch ? cssMatch[1] : "styles-CKHbzW9t.css";

const spaRedirectDecoder = `
    <script type="text/javascript">
      // GitHub Pages SPA redirect decoder for sub-routes (/admin, /check-results)
      (function (l) {
        if (l.search[1] === "/") {
          var decoded = l.search
            .slice(1)
            .split("&")
            .map(function (s) {
              return s.replace(/~and~/g, "&");
            })
            .join("?");
          window.history.replaceState(
            null,
            null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      })(window.location);
    </script>
`;

// 1. Root index.html (for users serving GitHub Pages from root /)
const rootHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub</title>
    <meta
      name="description"
      content="Official festival scoreboard, real-time live program status, searchable results, and admin management for Noorun Ala Noor Meelad Fest 2026."
    />
    <meta property="og:title" content="Noorun Ala Noor Meelad Fest 2026" />
    <meta
      property="og:description"
      content="Official festival scoreboard, real-time live program status, searchable results, and admin management for Noorun Ala Noor Meelad Fest 2026."
    />
    <link rel="icon" type="image/x-icon" href="./docs/favicon.ico" />
    ${spaRedirectDecoder}
    <script type="module" crossorigin src="./docs/assets/${jsFileName}"></script>
    <link rel="stylesheet" crossorigin href="./docs/assets/${cssFileName}">
  </head>
  <body class="bg-background text-foreground antialiased min-h-screen">
    <div id="root"></div>
  </body>
</html>
`;
fs.writeFileSync(path.join(rootDir, "index.html"), rootHtml, "utf8");

// 2. Docs index.html (for users serving GitHub Pages from /docs)
const docsHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub</title>
    <meta
      name="description"
      content="Official festival scoreboard, real-time live program status, searchable results, and admin management for Noorun Ala Noor Meelad Fest 2026."
    />
    <meta property="og:title" content="Noorun Ala Noor Meelad Fest 2026" />
    <meta
      property="og:description"
      content="Official festival scoreboard, real-time live program status, searchable results, and admin management for Noorun Ala Noor Meelad Fest 2026."
    />
    <link rel="icon" type="image/x-icon" href="./favicon.ico" />
    ${spaRedirectDecoder}
    <script type="module" crossorigin src="./assets/${jsFileName}"></script>
    <link rel="stylesheet" crossorigin href="./assets/${cssFileName}">
  </head>
  <body class="bg-background text-foreground antialiased min-h-screen">
    <div id="root"></div>
  </body>
</html>
`;
fs.writeFileSync(path.join(docsDir, "index.html"), docsHtml, "utf8");

// 3. .nojekyll in root and docs
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// 4. 404.html template for GitHub Pages subpaths
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
fs.writeFileSync(path.join(docsDir, "404.html"), ghPages404Html, "utf8");

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("GitHub Pages static build complete: root index.html and docs/ ready.");
