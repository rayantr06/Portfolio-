import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

// The public portfolio is a server-rendered, single-page document with ordinary
// anchor links. Publish its HTML/CSS/fonts only, without the authenticated app.
const root = process.cwd();
const target = path.join(root, "docs");
const html = await readFile(path.join(root, ".next/server/app/portfolio.html"), "utf8");
const dom = new JSDOM(html);
const document = dom.window.document;
if (!document.querySelector("#top") || document.querySelectorAll("#work article").length !== 6 || document.querySelector("form")) {
  throw new Error("Unexpected portfolio structure: review the static export before publishing.");
}
document.documentElement.lang = "en";
document.querySelectorAll('script, link[as="script"], link[as="image"], link[rel="modulepreload"]').forEach(element => element.remove());
const assets = new Set();
for (const link of document.querySelectorAll('link[rel="stylesheet"], link[as="font"]')) {
  const source = link.getAttribute("href");
  if (!source?.startsWith("/_next/static/")) throw new Error(`Unexpected asset: ${source}`);
  const relative = source.slice("/_next/static/".length);
  assets.add(relative);
  link.setAttribute("href", `./_next/static/${relative}`);
  if (link.rel === "stylesheet") {
    const css = await readFile(path.join(root, ".next/static", relative), "utf8");
    for (const match of css.matchAll(/url\(["']?(\.\.\/media\/[^\s)"']+)["']?\)/g)) {
      assets.add(path.posix.normalize(path.posix.join(path.posix.dirname(relative), match[1])));
    }
  }
}
for (const image of document.images) {
  image.src = "./profile-rayan.png";
  image.removeAttribute("srcset");
  image.removeAttribute("data-nimg");
}
await mkdir(target, { recursive: true });
for (const asset of assets) {
  if (asset.startsWith("../") || path.isAbsolute(asset)) throw new Error("Asset must remain inside static directory.");
  const destination = path.join(target, "_next/static", asset);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, ".next/static", asset), destination);
}
await copyFile(path.join(root, "public/profile-rayan.png"), path.join(target, "profile-rayan.png"));
await writeFile(path.join(target, "index.html"), dom.serialize());
await writeFile(path.join(target, ".nojekyll"), "");
console.log(`Public portfolio exported to docs: HTML, portrait and ${assets.size} CSS/font assets.`);
