import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
await page.goto("https://www.dentons.com/en/insights", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
const accept = page.locator("#onetrust-accept-btn-handler").first();
if (await accept.count()) await accept.click({ timeout: 2500 }).catch(() => {});
await page.waitForTimeout(1500);
for (let y = 0; y < 4000; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(200); }
await page.evaluate(() => window.scrollTo(0, 0));
const info = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
  const skip = /global sectors|global solutions|client experience|our people|legal notices|privacy|cookies|careers|about dentons/i;
  const links = [...document.querySelectorAll("main a[href], [role=main] a[href], .content a[href]")];
  const pool = links.length ? links : [...document.querySelectorAll("a[href]")];
  const rows = [];
  const seen = new Set();
  for (const a of pool) {
    const href = a.href || "";
    const text = clean(a.textContent).slice(0, 90);
    if (!text || text.length < 12 || skip.test(text) || seen.has(href)) continue;
    if (!href.includes("dentons.com/en/")) continue;
    if (/\/(global-sectors|global-solutions|client-experience|our-professionals|about-dentons|careers|global-presence)\/?$/.test(href)) continue;
    seen.add(href);
    rows.push({ text, href });
  }
  return { n: rows.length, rows: rows.slice(0, 25) };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
