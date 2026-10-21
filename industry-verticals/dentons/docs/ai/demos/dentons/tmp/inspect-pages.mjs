import { createRequire } from "node:module";
const require = createRequire("/Users/fols/sitecore/sitecoreAI/xmcloud-starter-js/harness/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function open(url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  const accept = page.locator("#onetrust-accept-btn-handler").first();
  if (await accept.count()) await accept.click({ timeout: 2500 }).catch(() => {});
  await page.waitForTimeout(800);
}

await open("https://www.dentons.com/en/insights");
const insights = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
  const h = [...document.querySelectorAll("h1,h2")].slice(0, 8).map((e) => clean(e.textContent).slice(0, 100));
  const links = [...document.querySelectorAll("a[href]")]
    .map((a) => ({ text: clean(a.textContent).slice(0, 80), href: a.href }))
    .filter((l) => /\/en\/insights\//.test(l.href) && l.text.length > 8);
  const seen = new Set();
  const uniq = [];
  for (const l of links) {
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    uniq.push(l);
  }
  return { title: document.title, href: location.href, headings: h, articleCount: uniq.length, articles: uniq.slice(0, 12) };
});
console.log("INSIGHTS", JSON.stringify(insights, null, 2));

await open("https://www.dentons.com/en/martin-abadi");
const person = await page.evaluate(() => {
  const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
  const h = [...document.querySelectorAll("h1,h2,h3")].slice(0, 10).map((e) => clean(e.textContent).slice(0, 120));
  const main = document.querySelector("main") || document.body;
  const text = clean(main.innerText).slice(0, 500);
  return { title: document.title, href: location.href, headings: h, text };
});
console.log("PERSON", JSON.stringify(person, null, 2));
await browser.close();
