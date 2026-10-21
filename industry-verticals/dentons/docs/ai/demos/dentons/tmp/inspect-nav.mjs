import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");

const url = "https://www.dentons.com/en";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
const accept = page.locator("#onetrust-accept-btn-handler, button:has-text('Accept')").first();
if (await accept.count()) await accept.click({ timeout: 2000 }).catch(() => {});
await page.waitForTimeout(500);

const headerBits = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim().slice(0, 100);
  const header = document.querySelector("header");
  const els = [...header.querySelectorAll("a, button")];
  return els.map((el) => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, text: clean(el.textContent) || el.getAttribute("aria-label") || "", href: el.getAttribute("href") || "", cls: String(el.className).slice(0, 80), top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
  }).filter((e) => e.h > 0 && e.w > 0);
});
console.log("HEADER CONTROLS");
console.log(JSON.stringify(headerBits, null, 2));

const labels = ["Global sectors", "Global solutions", "Client experience", "Our people"];
for (const label of labels) {
  const loc = page.getByRole("link", { name: label, exact: true }).first();
  await loc.hover({ timeout: 3000 }).catch((e) => console.log("hover fail", label, e.message));
  await page.waitForTimeout(700);
  const fly = await page.evaluate((label) => {
    const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
    const nav = document.querySelector("nav.flyout-nav") || document.querySelector(".flyout-nav");
    if (!nav) return { label, missing: true };
    const r = nav.getBoundingClientRect();
    const links = [...nav.querySelectorAll("a")].map((a) => ({ text: clean(a.textContent).slice(0, 80), href: a.getAttribute("href") })).filter((a) => a.text);
    return { label, cls: nav.className, top: Math.round(r.top), h: Math.round(r.height), n: links.length, links: links.slice(0, 40) };
  }, label);
  console.log("FLY", JSON.stringify(fly));
}
await browser.close();
