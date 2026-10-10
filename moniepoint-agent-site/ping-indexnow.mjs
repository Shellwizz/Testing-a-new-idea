// After you deploy, run:  node ping-indexnow.mjs
// Tells Bing, Yandex and others (via IndexNow) that every page is new or
// updated. Bing's index feeds ChatGPT search and Microsoft Copilot.
import config from "./site.config.mjs";
import { readFile } from "node:fs/promises";

if (config.siteUrl.includes("example.com")) {
  console.error("Set siteUrl in site.config.mjs to your live address first.");
  process.exit(1);
}
const sitemap = await readFile(new URL("./dist/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(config.siteUrl).host,
    key: config.indexNowKey,
    keyLocation: `${config.siteUrl}/${config.indexNowKey}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: sent ${urlList.length} URLs, response ${res.status}`);
