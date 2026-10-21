import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://www.dentons.com/en/our-professionals", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
const accept = page.locator("#onetrust-accept-btn-handler").first();
if (await accept.count()) await accept.click({ timeout: 2500 }).catch(() => {});
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
  const links = [...document.querySelectorAll("a[href]")];
  const people = [];
  const seen = new Set();
  for (const a of links) {
    const href = a.href || "";
    const text = clean(a.textContent).slice(0, 60);
    if (!/dentons\.com\/en\/[a-z0-9-]+$/.test(href)) continue;
    if (/\/(en|insights|global-sectors|global-solutions|client-experience|our-professionals|about-dentons|careers|global-presence|featured-insights|contact-us|signupformailinglist)$/.test(href)) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    people.push({ text, href });
  }
  const abadi = links.some((a) => (a.href || "").includes("martin-abadi"));
  return { abadi, count: people.length, people: people.slice(0, 15) };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
