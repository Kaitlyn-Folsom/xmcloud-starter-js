import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.dentons.com/en", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2000);
const accept = page.locator("#onetrust-accept-btn-handler").first();
if (await accept.count()) await accept.click({ timeout: 2000 }).catch(() => {});
await page.locator("header button.js-stopjump").click({ timeout: 4000 });
await page.waitForTimeout(800);
const info = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 8 && r.height > 8 && cs.visibility !== "hidden" && cs.display !== "none";
  };
  const nav = document.querySelector("nav.flyout-nav");
  const walk = (ul, depth) => [...ul.children].filter((li) => li.tagName === "LI").map((li) => {
    const a = li.querySelector(":scope > a, :scope > * > a") || li.querySelector("a");
    const sub = [...li.querySelectorAll(":scope > ul, :scope > * > ul")];
    return {
      text: clean(a?.textContent || li.textContent).slice(0, 80),
      href: a?.getAttribute("href") || "",
      vis: a ? visible(a) : false,
      children: sub.flatMap((u) => walk(u, depth + 1)).slice(0, 30),
    };
  });
  const uls = nav ? [...nav.querySelectorAll("ul")] : [];
  const top = nav?.querySelector("ul");
  return {
    navVis: nav ? visible(nav) : false,
    box: nav ? (() => { const r = nav.getBoundingClientRect(); return { top: r.top, h: r.height, w: r.width, left: r.left }; })() : null,
    htmlClass: document.documentElement.className.slice(0, 200),
    bodyClass: document.body.className.slice(0, 200),
    topItems: top ? walk(top, 0) : [],
  };
});
console.log(JSON.stringify(info, null, 2).slice(0, 12000));
await browser.close();
