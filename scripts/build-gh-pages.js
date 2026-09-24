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

// Ensure target asset directories exist
for (const d of [distAssetsDir, docsAssetsDir]) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

// 1. Copy built assets to dist/assets and docs/assets
if (fs.existsSync(path.join(distClientDir, "assets"))) {
  fs.cpSync(path.join(distClientDir, "assets"), distAssetsDir, { recursive: true });
  fs.cpSync(path.join(distClientDir, "assets"), docsAssetsDir, { recursive: true });
}

// 2. Copy public assets (favicon, images, etc.) to dist and docs
if (fs.existsSync(path.join(rootDir, "public"))) {
  fs.cpSync(path.join(rootDir, "public"), distDir, { recursive: true });
  fs.cpSync(path.join(rootDir, "public"), docsDir, { recursive: true });
}

// 3. Ensure legacy aliases exist in dist and docs asset folders
for (const dir of [distAssetsDir, docsAssetsDir]) {
  if (fs.existsSync(path.join(dir, "client.js"))) {
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "client-BNaYxvc8.js"));
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "index-BNaYxvc8.js"));
    fs.copyFileSync(path.join(dir, "client.js"), path.join(dir, "client-DdOCxeiY.js"));
  }
  if (fs.existsSync(path.join(dir, "styles.css"))) {
    fs.copyFileSync(path.join(dir, "styles.css"), path.join(dir, "styles-CKHbzW9t.css"));
  }
}

// 4. Clean HTML Template for index.html (SPA with query-param router restore and universal asset resolver)
const getIndexHtml = (defaultPrefix = "./") => `<!doctype html>
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
      // 1. GitHub Pages SPA redirect decoder for sub-routes (/admin, /check-results)
      (function (l) {
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

      // 2. Universal Asset Injector (resolves correctly on any URL path on GitHub Pages & preview)
      (function () {
        var p = window.location.pathname;
        var prefix = p.indexOf("/noorun-ala-noor-2026/docs") !== -1
          ? "/noorun-ala-noor-2026/docs/"
          : p.indexOf("/noorun-ala-noor-2026") !== -1
            ? "/noorun-ala-noor-2026/"
            : "${defaultPrefix}";

        // Favicon
        var fav = document.createElement("link");
        fav.rel = "icon";
        fav.type = "image/x-icon";
        fav.href = prefix + "favicon.ico";
        document.head.appendChild(fav);

        // Stylesheet
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.crossOrigin = "anonymous";
        css.href = prefix + "assets/styles.css";
        document.head.appendChild(css);

        // Client JavaScript Bundle
        var script = document.createElement("script");
        script.type = "module";
        script.crossOrigin = "anonymous";
        script.src = prefix + "assets/client.js";
        document.head.appendChild(script);
      })();
    </script>
  </head>
  <body class="bg-background text-foreground antialiased min-h-screen">
    <div id="root"></div>
  </body>
</html>
`;

// 5. HTML Template for 404.html (Redirects GitHub Pages sub-routes to SPA query router)
const get404Html = () => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Noorun Ala Noor Meelad Fest 2026 | Guideon Learning Hub</title>
    <script type="text/javascript">
      (function (l) {
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

// Write to dist/
fs.writeFileSync(path.join(distDir, "index.html"), getIndexHtml("./"), "utf8");
fs.writeFileSync(path.join(distDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(distDir, ".nojekyll"), "", "utf8");

// Sub-routes in dist/
const routes = ["admin", "check-results", "unlock"];
for (const r of routes) {
  const distRouteDir = path.join(distDir, r);
  if (!fs.existsSync(distRouteDir)) {
    fs.mkdirSync(distRouteDir, { recursive: true });
  }
  fs.writeFileSync(path.join(distRouteDir, "index.html"), getIndexHtml("../"), "utf8");
  fs.writeFileSync(path.join(distDir, `${r}.html`), getIndexHtml("./"), "utf8");
}

// Write to docs/
fs.writeFileSync(path.join(docsDir, "index.html"), getIndexHtml("./"), "utf8");
fs.writeFileSync(path.join(docsDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// Sub-routes in docs/
for (const r of routes) {
  const routeDir = path.join(docsDir, r);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, "index.html"), getIndexHtml("../"), "utf8");
  fs.writeFileSync(path.join(docsDir, `${r}.html`), getIndexHtml("./"), "utf8");
}

// Write to root
fs.writeFileSync(path.join(rootDir, "index.html"), getIndexHtml("./docs/"), "utf8");
fs.writeFileSync(path.join(rootDir, "404.html"), get404Html(), "utf8");
fs.writeFileSync(path.join(rootDir, ".nojekyll"), "", "utf8");

// Sub-routes in root
for (const r of routes) {
  const rootRouteDir = path.join(rootDir, r);
  if (!fs.existsSync(rootRouteDir)) {
    fs.mkdirSync(rootRouteDir, { recursive: true });
  }
  fs.writeFileSync(path.join(rootRouteDir, "index.html"), getIndexHtml("../docs/"), "utf8");
  fs.writeFileSync(path.join(rootDir, `${r}.html`), getIndexHtml("./docs/"), "utf8");
}

// Clean temporary dist-client folder
fs.rmSync(distClientDir, { recursive: true, force: true });

console.log("Static build complete: dist/, docs/, and root are populated with pristine assets.");
