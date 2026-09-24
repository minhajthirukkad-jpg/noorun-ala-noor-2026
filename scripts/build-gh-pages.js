import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const distClientDir = path.join(rootDir, "dist-client");
const distDir = path.join(rootDir, "dist");
const distAssetsDir = path.join(distDir, "assets");
const docsDir = path.join(rootDir, "docs");
const docsAssetsDir = path.join(docsDir, "assets");

console.log("Building client SPA for GitHub Pages & static hosting...");
execSync("npx vite build --config vite.client.config.ts", { stdio: "inherit" });

if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}
if (!fs.existsSync(docsAssetsDir)) {
  fs.mkdirSync(docsAssetsDir, { recursive: true });
}

// 1. Copy built assets to dist/assets and docs/assets
if (fs.existsSync(path.join(distClientDir, "assets"))) {
  fs.cpSync(path.join(distClientDir, "assets"), distAssetsDir, { recursive: true });
  fs.cpSync(path.join(distClientDir, "assets"), docsAssetsDir, { recursive: true });
}

// 2. Copy public assets (favicon, images, etc.) to dist, docs, and root
if (fs.existsSync(path.join(rootDir, "public"))) {
  fs.cpSync(path.join(rootDir, "public"), distDir, { recursive: true });
  fs.cpSync(path.join(rootDir, "public"), docsDir, { recursive: true });
}

// 3. Ensure legacy file aliases exist in dist/assets and docs/assets to prevent cache misses
const assetDirs = [distAssetsDir, docsAssetsDir];
for (const dir of assetDirs) {
  if (fs.existsSync(path.join(dir, "client.js"))) {
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "client-BNaYxvc8.js"));
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "index-BNaYxvc8.js"));
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "client-DdOCxeiY.js"));
  }
  if (fs.existsSync(path.join(dir, "styles.css"))) {
    fs.copyFileSync(path.join(dir, "styles.css"), path.join(dir, "styles-CKHbzW9t.css"));
  }
}

// 4. HTML Template for index.html (SPA with query-param router restore and robust base path)
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
    <script type="text/javascript">
      // Clean up any stale /dist/ URL loops from browser history
      (function () {
        var l = window.location;
        var path = l.pathname;
        if (path.includes("/dist") || l.search.includes("/dist")) {
          var cleanPath = path.replace(/\\/dist\\/?/g, "/");
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
          var basePath = path.replace(/\\/$/, "");
          var subPath = decoded.startsWith("/") ? decoded : "/" + decoded;
          window.history.replaceState(
            null,
            null,
            basePath + subPath + l.hash,
          );
        }

        // Determine base path for static assets
        var assetBase = "/";
        if (path.indexOf("/noorun-ala-noor-2026/docs") === 0) {
          assetBase = "/noorun-ala-noor-2026/docs/";
        } else if (path.indexOf("/noorun-ala-noor-2026") === 0) {
          assetBase = "/noorun-ala-noor-2026/";
        } else if ("${assetPrefix}" !== "./") {
          assetBase = "${assetPrefix}";
        }

        // Favicon
        var fav = document.createElement("link");
        fav.rel = "icon";
        fav.type = "image/x-icon";
        fav.href = assetBase + "favicon.ico";
        document.head.appendChild(fav);

        // Stylesheet
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.crossOrigin = "";
        link.href = assetBase + "assets/styles.css?v=2.2.5";
        document.head.appendChild(link);

        // App Bundle Script
        var script = document.createElement("script");
        script.type = "module";
        script.crossOrigin = "";
        script.src = assetBase + "assets/client.js?v=2.2.5";
        document.head.appendChild(script);
      })();
    </script>
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

// Write index.html, 404.html, .nojekyll to dist/ (Required by AI Studio build uploader)
fs.writeFileSync(path.join(distDir, "index.html"), getIndexHtml("./"), "utf8");
fs.writeFileSync(path.join(distDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(distDir, ".nojekyll"), "", "utf8");

// Sub-route pages in dist/
const routes = ["admin", "check-results", "unlock"];
for (const r of routes) {
  const distRouteDir = path.join(distDir, r);
  if (!fs.existsSync(distRouteDir)) {
    fs.mkdirSync(distRouteDir, { recursive: true });
  }
  fs.writeFileSync(path.join(distRouteDir, "index.html"), getIndexHtml("../"), "utf8");
  fs.writeFileSync(path.join(distDir, `${r}.html`), getIndexHtml("./"), "utf8");
}

// Write index.html, 404.html, .nojekyll to docs/
fs.writeFileSync(path.join(docsDir, "index.html"), getIndexHtml("./"), "utf8");
fs.writeFileSync(path.join(docsDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// Sub-route pages in docs/
for (const r of routes) {
  const routeDir = path.join(docsDir, r);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, "index.html"), getIndexHtml("../"), "utf8");
  fs.writeFileSync(path.join(docsDir, `${r}.html`), getIndexHtml("./"), "utf8");
}

// Write index.html and 404.html to root
fs.writeFileSync(path.join(rootDir, "index.html"), getIndexHtml("./docs/"), "utf8");
fs.writeFileSync(path.join(rootDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");

// Sub-route pages in root
for (const r of routes) {
  const rootRouteDir = path.join(rootDir, r);
  if (!fs.existsSync(rootRouteDir)) {
    fs.mkdirSync(rootRouteDir, { recursive: true });
  }
  fs.writeFileSync(path.join(rootRouteDir, "index.html"), getIndexHtml("../docs/"), "utf8");
  fs.writeFileSync(path.join(rootDir, `${r}.html`), getIndexHtml("./docs/"), "utf8");
}

// Also populate .output/public with static files if .output/public exists
const outputPublicDir = path.join(rootDir, ".output", "public");
if (fs.existsSync(outputPublicDir)) {
  fs.cpSync(distDir, outputPublicDir, { recursive: true });
}

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("Static build complete: dist/, docs/, and root are populated.");
