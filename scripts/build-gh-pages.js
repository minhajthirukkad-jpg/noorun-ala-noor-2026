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
// 1. Copy built assets to docs/assets
if (fs.existsSync(path.join(distClientDir, "assets"))) {
  fs.cpSync(path.join(distClientDir, "assets"), docsAssetsDir, { recursive: true });
}

// 2. Copy public assets (favicon, images, etc.) to docs
if (fs.existsSync(path.join(rootDir, "public"))) {
  fs.cpSync(path.join(rootDir, "public"), docsDir, { recursive: true });
}

// 3. Ensure legacy file aliases exist in docs/assets to prevent cache misses
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

// 4. HTML Template for index.html (SPA with query-param router restore)
const getIndexHtml = (assetPrefix = "./") => `<!doctype html>
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
    <link rel="icon" type="image/x-icon" href="${assetPrefix}favicon.ico" />
    <script type="text/javascript">
      // Clean up any stale /dist/ URL loops from browser history
      (function (l) {
        if (l.pathname.includes("/dist") || l.search.includes("/dist")) {
          var cleanPath = l.pathname.replace(/\\/dist\\/?/g, "/");
          var cleanSearch = l.search.replace(/[\\?&]\\/dist\\/?/g, "");
          l.replace(
            l.protocol +
              "//" +
              l.hostname +
              (l.port ? ":" + l.port : "") +
              cleanPath +
              cleanSearch +
              l.hash,
          );
          return;
        }
        // GitHub Pages SPA redirect decoder for sub-routes (/admin, /check-results)
        if (l.search && l.search[1] === "/") {
          var decoded = l.search
            .slice(1)
            .split("&")
            .map(function (s) {
              return s.replace(/~and~/g, "&");
            })
            .join("?");
          var basePath = l.pathname.replace(/\\/$/, "");
          var subPath = decoded.startsWith("/") ? decoded : "/" + decoded;
          window.history.replaceState(
            null,
            null,
            basePath + subPath + l.hash,
          );
        }
      })(window.location);
    </script>
    <script type="module" crossorigin src="${assetPrefix}assets/client.js"></script>
    <link rel="stylesheet" crossorigin href="${assetPrefix}assets/styles.css" />
  </head>
  <body class="bg-background text-foreground antialiased min-h-screen">
    <div id="root"></div>
  </body>
</html>
`;

// 5. HTML Template for 404.html
const get404Html = () => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub</title>
    <script type="text/javascript">
      (function (l) {
        if (l.pathname.includes("/dist") || l.search.includes("/dist")) {
          l.replace(
            l.protocol +
              "//" +
              l.hostname +
              (l.port ? ":" + l.port : "") +
              "/noorun-ala-noor-2026/",
          );
          return;
        }

        var pathSegments = l.pathname.slice(1).split("/");
        var repoName = "noorun-ala-noor-2026";
        var isDocs = pathSegments[1] === "docs";
        var base = isDocs ? "/" + repoName + "/docs" : "/" + repoName;

        var subSegments = isDocs ? pathSegments.slice(2) : pathSegments.slice(1);
        var p = subSegments.join("/");

        if (p && !p.startsWith("dist")) {
          var redirectUrl =
            l.protocol +
            "//" +
            l.hostname +
            (l.port ? ":" + l.port : "") +
            base +
            "/?/" +
            p.replace(/&/g, "~and~") +
            (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
            l.hash;
          l.replace(redirectUrl);
        } else {
          l.replace(
            l.protocol +
              "//" +
              l.hostname +
              (l.port ? ":" + l.port : "") +
              base +
              "/",
          );
        }
      })(window.location);
    </script>
  </head>
  <body></body>
</html>
`;

// Write index.html and 404.html to both root and docs/
fs.writeFileSync(path.join(docsDir, "index.html"), getIndexHtml("./"), "utf8");
fs.writeFileSync(path.join(docsDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

fs.writeFileSync(path.join(rootDir, "index.html"), getIndexHtml("./docs/"), "utf8");
fs.writeFileSync(path.join(rootDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("GitHub Pages static build complete: root and docs/ ready.");
