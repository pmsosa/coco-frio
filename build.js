const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

function getGames() {
  return fs.readdirSync(ROOT).filter(name => {
    const dir = path.join(ROOT, name);
    return fs.statSync(dir).isDirectory()
      && !name.startsWith(".")
      && !["node_modules", "dist"].includes(name);
  });
}

async function buildGame(name) {
  const gameDir = path.join(ROOT, name);
  const outDir  = path.join(ROOT, "dist");
  fs.mkdirSync(outDir, { recursive: true });

  const srcEntry = path.join(gameDir, "src/main.js");
  const outFile  = path.join(outDir, `${name}.html`);

  if (fs.existsSync(srcEntry)) {
    const result = await esbuild.build({
      entryPoints: [srcEntry],
      bundle: true,
      minify: true,
      write: false,
      format: "iife",
    });
    const js  = result.outputFiles[0].text;
    const css = fs.readFileSync(path.join(gameDir, "style.css"), "utf8");

    const indexHtml  = fs.readFileSync(path.join(gameDir, "index.html"), "utf8");
    const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/);
    const title      = titleMatch ? titleMatch[1] : name;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>${css}</style>
</head>
<body>
  <canvas id="game"></canvas>
  <script>${js}</script>
</body>
</html>`;

    fs.writeFileSync(outFile, html);
    console.log(`Built  dist/${name}.html (${(html.length / 1024).toFixed(1)} KB)`);
  } else {
    const src = path.join(gameDir, "index.html");
    fs.copyFileSync(src, outFile);
    console.log(`Copied dist/${name}.html (${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
  }
}

async function main() {
  const args  = process.argv.slice(2);
  const games = args.length > 0 ? args : getGames();
  for (const game of games) {
    await buildGame(game);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
