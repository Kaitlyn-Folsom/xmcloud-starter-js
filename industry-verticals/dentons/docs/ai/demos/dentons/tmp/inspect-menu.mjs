import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.dentons.com/en", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
const accept = page.locator("#onetrust-accept-btn-handler").first();
if (await accept.count()) await accept.click({ timeout: 2000 }).catch(() => {});

const tree = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim().slice(0, 70);
  const nav = document.querySelector("nav.desktop-nav");
  const summarize = (el, depth) => {
    if (!el || depth > 4) return null;
    const kids = [...el.children].map((c) => summarize(c, depth + 1)).filter(Boolean);
    const a = el.tagName === "A" ? { href: el.getAttribute("href"), text: clean(el.textContent) } : null;
    return { tag: el.tagName, cls: String(el.className).slice(0, 60), id: el.id || undefined, text: a?.text, href: a?.href, kids: kids.slice(0, 20) };
  };
  return summarize(nav, 0);
});
console.log(JSON.stringify(tree, null, 2).slice(0, 8000));

const buttons = page.locator("header button");
const n = await buttons.count();
console.log("BUTTON COUNT", n);
for (let i = 0; i < n; i++) {
  const b = buttons.nth(i);
  const box = await b.boundingBox();
  const label = (await b.innerText()).replace(/\s+/g, " ").trim().slice(0, 40);
  const aria = await b.getAttribute("aria-label");
  const cls = await b.getAttribute("class");
  console.log("BTN", i, JSON.stringify({ label, aria, cls, box }));
}
await browser.close();
