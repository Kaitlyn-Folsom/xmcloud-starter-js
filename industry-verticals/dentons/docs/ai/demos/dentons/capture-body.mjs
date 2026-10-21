/**
 * Read the live Dentons profile and article bodies (the section capture stopped on an empty wrapper)
 * and write the text onto the existing Sitecore items.
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { ENV } from "../../../../../../harness/scripts/_lib.mjs";

const require = createRequire(new URL("../../../../../../harness/package.json", import.meta.url));
const { chromium } = require("playwright");

const people = [
  "martin-abadi",
  "nathan-abbott",
  "majd-abdelhalim",
  "ulugbek-abdullaev",
  "sadaf-abkenar",
  "dounia-abouarab",
  "seth-abrams",
  "stephanie-abrutyn",
  "roger-abseher",
  "diego-abuauad",
  "luisabundio-maldonado",
  "roberto-aburto",
  "daniela-acevedo",
  "nastasia-achilles",
];

const articles = [
  ["balancing-innovation-and-competition", "https://www.dentons.com/en/insights/articles/2026/october/21/balancing-innovation-and-competition", "Balancing innovation and competition: intellectual property rights under Tanzania's Fair Competition (Abuse of Dominant Position) Regulations, 2026"],
  ["ir-insights-podcast-industrial-relations-update", "https://www.dentons.com/en/insights/newsletters/2026/october/21/dentons-ir-insights-podcast-australia/ir-insights-podcast-industrial-relations-update", "IR Insights Podcast: Industrial relations update – key cases and developments"],
  ["misrepresentations-in-disclosure", "https://www.dentons.com/en/insights/articles/2026/october/21/misrepresentations-in-disclosure", "Misrepresentations in disclosure"],
  ["queensland-mining-reforms", "https://www.dentons.com/en/insights/alerts/2026/october/21/queensland-mining-reforms", "Queensland's Mining Reforms: standing, scrutiny, speed in approvals process"],
  ["related-party-transactions-in-canada", "https://www.dentons.com/en/insights/articles/2026/october/21/related-party-transactions-in-canada", "Related party transactions in Canada: Special committee best practices"],
  ["dcaa-signals", "https://www.dentons.com/en/insights/alerts/2026/october/20/dcaa-signals", "DCAA Signals How It Will Audit Nontraditional Defense Contractors After Section 1826"],
  ["dentons-digital-infrastructure-dispatch-october-2026", "https://www.dentons.com/en/insights/newsletters/2026/october/20/dentons-digital-infrastructure-dispatch/dentons-digital-infrastructure-dispatch-october-2026", "Dentons' Digital Infrastructure Dispatch - October 2026"],
  ["the-government-postpones-the-entry-into-force-of-the-labor-assistance-fund", "https://www.dentons.com/en/insights/articles/2026/october/20/the-government-postpones-the-entry-into-force-of-the-labor-assistance-fund", "The Government Postpones the Entry into Force of the Labor Assistance Fund to December 1, 2026"],
];

const safe = (value) => String(value).replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim().slice(0, 90);
const dash = (id) => {
  const h = String(id).replace(/[{}-]/g, "").toUpperCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};

const token = await fetch(`${ENV.SITECORE_AUTH_HOST}/oauth/token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: ENV.SITECORE_AUTOMATION_CLIENT_ID,
    client_secret: ENV.SITECORE_AUTOMATION_CLIENT_SECRET,
    grant_type: "client_credentials",
    audience: "https://api.sitecorecloud.io",
  }),
});
const jwt = (await token.json()).access_token;
const cm = String(ENV.SITECORE_CM_HOST).replace(/\/+$/, "");
const gql = async (query, variables) => {
  const response = await fetch(`${cm}/sitecore/api/authoring/graphql/v1/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 400));
  return json.data;
};
async function writeFields(path, fields) {
  const item = await gql(
    `query($path:String!){ item(where:{database:"master", path:$path, language:"en"}){ itemId version } }`,
    { path }
  );
  if (!item.item) throw new Error(`missing ${path}`);
  const filled = fields.filter((field) => field.value);
  if (!filled.length) return;
  await gql(
    `mutation($id:ID!,$ver:Int,$fields:[FieldValueInput]){ updateItem(input:{itemId:$id,database:"master",language:"en",version:$ver,fields:$fields}){ item { itemId } } }`,
    { id: dash(item.item.itemId), ver: item.item.version, fields: filled }
  );
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function open(url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((item) => /accept all cookies/i.test(item.textContent || ""));
    if (button) button.click();
  });
  await page.waitForTimeout(300);
}

async function readProfile() {
  const email = page.locator("section.carousel_wrapper aside a", { hasText: "Email me" });
  if (await email.count()) {
    await email.first().click().catch(() => {});
    await page.waitForTimeout(400);
  }
  return page.evaluate(() => {
    const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const text = (el) => (el?.textContent || "").replace(/\s+/g, " ").trim();
    const inline = (el) => {
      let out = "";
      for (const node of el.childNodes) {
        if (node.nodeType === 3) out += node.textContent.replace(/\s+/g, " ");
        else if (node.nodeType === 1) {
          if (node.tagName === "BR") out += " ";
          else if (node.tagName === "A") {
            const href = node.getAttribute("href") || "";
            const label = text(node);
            out += label && /^https?:/i.test(href) ? `<a href="${esc(href)}">${esc(label)}</a>` : esc(label);
          } else out += inline(node);
        }
      }
      return out.replace(/\s+/g, " ").trim();
    };
    const blocks = (root) => {
      if (!root) return "";
      const out = [];
      const walk = (el) => {
        const tag = el.tagName;
        if (/SCRIPT|STYLE|SVG|BUTTON|IFRAME|FORM|NAV/.test(tag)) return;
        if (/^H[2-4]$/.test(tag)) {
          const heading = text(el);
          if (heading && !/^(about|experience|insights|recognition|activities and affiliations|more information)$/i.test(heading)) {
            out.push(`<h2>${esc(heading)}</h2>`);
          }
          return;
        }
        if (tag === "P") {
          const line = inline(el);
          if (line && !/^\{[0-9A-F-]{36}\}$/i.test(line)) out.push(`<p>${line}</p>`);
          return;
        }
        if (tag === "UL" || tag === "OL") {
          const items = [...el.querySelectorAll(":scope > li")].map((li) => inline(li)).filter((line) => line.length > 1);
          if (items.length) out.push(`<ul>${items.map((line) => `<li>${line}</li>`).join("")}</ul>`);
          return;
        }
        const kids = [...el.children];
        if (!kids.length) return;
        kids.forEach(walk);
      };
      [...root.children].forEach(walk);
      return out.join("");
    };
    const panel = (className) => blocks(document.querySelector(`.accor_parent.${className} .accrod_content_tab`) || document.querySelector(`.accor_parent.${className}`));
    const aside = document.querySelector("section.carousel_wrapper aside");
    const asideHtml = blocks(aside);
    const headingBlock = (label) => {
      const match = asideHtml.split(/<h2>/).find((part) => part.toLowerCase().startsWith(label.toLowerCase()));
      if (!match) return "";
      const body = match.slice(label.length).replace(/^<\/h2>/, "").split("<h2>")[0];
      return `<h2>${label}</h2>${body}`;
    };
    const photos = [...document.querySelectorAll("section.carousel_wrapper img")]
      .map((img) => img.getAttribute("src") || img.currentSrc || "")
      .filter((src) => /person-images/.test(src));
    const photo = photos.find((src) => !/hash=/.test(src)) || photos[0] || "";
    const phones = [...new Set((aside?.innerText || "").match(/[DM]\s*\+\s*[0-9][0-9\s().-]{5,}/g) || [])].map((line) => line.replace(/\s+/g, " ").trim());
    const office = text([...document.querySelectorAll("section.carousel_wrapper aside a")].find((link) => /global-presence/.test(link.getAttribute("href") || "")));
    const role = text(document.querySelector("section.carousel_wrapper .widgets-carousel small"));
    const name = text(document.querySelector("section.carousel_wrapper h1"));
    const mail = [...document.querySelectorAll("a[href^='mailto:']")].map((link) => link.getAttribute("href")).find(Boolean) || "";
    const languages = headingBlock("Languages").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/^Languages\s*/, "").trim();
    return {
      name,
      role,
      office,
      photo,
      email: mail.replace(/^mailto:/i, ""),
      phone: phones.join(" / "),
      bio: panel("About"),
      experience: panel("Experience"),
      recognition: panel("Insights") || panel("Recognition"),
      activities: panel("Activities_Affiliations") || panel("Activities"),
      education: [headingBlock("Areas of focus"), headingBlock("Education"), headingBlock("Admissions and qualifications")].filter(Boolean).join(""),
      languages,
    };
  });
}

async function readArticle() {
  return page.evaluate(() => {
    const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const text = (el) => (el?.textContent || "").replace(/\s+/g, " ").trim();
    const inline = (el) => {
      let out = "";
      for (const node of el.childNodes) {
        if (node.nodeType === 3) out += node.textContent.replace(/\s+/g, " ");
        else if (node.nodeType === 1) {
          if (node.tagName === "BR") out += " ";
          else if (node.tagName === "A") {
            const href = node.getAttribute("href") || "";
            const label = text(node);
            out += label && /^https?:/i.test(href) ? `<a href="${esc(href)}">${esc(label)}</a>` : esc(label);
          } else out += inline(node);
        }
      }
      return out.replace(/\s+/g, " ").trim();
    };
    const blocks = (root) => {
      if (!root) return "";
      const out = [];
      const walk = (el) => {
        const tag = el.tagName;
        if (/SCRIPT|STYLE|SVG|BUTTON|IFRAME|FORM/.test(tag)) return;
        if (/^H[2-4]$/.test(tag)) {
          const heading = text(el);
          if (heading) out.push(`<h2>${esc(heading)}</h2>`);
          return;
        }
        if (tag === "P") {
          const line = inline(el);
          if (line) out.push(`<p>${line}</p>`);
          return;
        }
        if (tag === "UL" || tag === "OL") {
          const items = [...el.querySelectorAll(":scope > li")].map((li) => inline(li)).filter(Boolean);
          if (items.length) out.push(`<ul>${items.map((line) => `<li>${line}</li>`).join("")}</ul>`);
          return;
        }
        [...el.children].forEach(walk);
      };
      [...root.children].forEach(walk);
      return out.join("");
    };
    const root = document.querySelector("section.carousel_wrapper .view-stories");
    const bodyRoot = root?.querySelector(".defaulttag") || root;
    const aside = document.querySelector("section.carousel_wrapper aside");
    const date = text(root?.querySelector(".datetime-insight"));
    const authors = blocks(aside);
    const relatedHeading = [...(aside?.querySelectorAll("h2,h3") || [])].find((heading) => /related/i.test(heading.textContent || ""));
    let related = "";
    if (relatedHeading) {
      const box = relatedHeading.closest("div") || relatedHeading.parentElement;
      const links = [...box.querySelectorAll("a")].map((link) => {
        const href = link.getAttribute("href") || "";
        const label = text(link);
        return label && /^https?:/i.test(href) ? `<li><a href="${esc(href)}">${esc(label)}</a></li>` : "";
      }).filter(Boolean);
      if (links.length) related = `<ul>${links.join("")}</ul>`;
    }
    return { date, body: blocks(bodyRoot), authors, related };
  });
}

const captured = { people: [], articles: [] };
for (const slug of people) {
  await open(`https://www.dentons.com/en/${slug}`);
  const profile = await readProfile();
  captured.people.push({ slug, ...profile, email: profile.email ? "yes" : "" });
  console.log("person", slug, "bio", profile.bio.length, "exp", profile.experience.length, "role", profile.role || "-", "photo", profile.photo ? "yes" : "no");
  const pagePath = `/sitecore/content/Dentons/Dentons/Home/our-professionals/${slug}`;
  const fields = [
    { name: "Role", value: profile.role },
    { name: "Office", value: profile.office },
    { name: "Phone", value: profile.phone },
    { name: "Bio", value: profile.bio },
    { name: "Experience", value: profile.experience },
    { name: "Recognition", value: profile.recognition },
    { name: "Activities", value: profile.activities },
    { name: "Education", value: profile.education },
    { name: "Languages", value: profile.languages },
  ];
  if (profile.email) fields.push({ name: "Email", value: `<link text="Email me" linktype="external" url="mailto:${profile.email}" />` });
  await writeFields(pagePath, fields);
  const directory = await gql(
    `query { item(where:{database:"master", path:"/sitecore/content/Dentons/Dentons/Data/ProfessionalDirectory/Our people", language:"en"}){ children { nodes { itemId name } } } }`
  );
  const child = directory.item.children.nodes.find((node) => node.name === safe(profile.name));
  if (child) {
    const childFields = [
      { name: "Role", value: profile.role },
      { name: "Office", value: profile.office },
    ];
    if (profile.email) childFields.push({ name: "Email", value: `<link text="Email me" linktype="external" url="mailto:${profile.email}" />` });
    const filledChild = childFields.filter((field) => field.value);
    if (filledChild.length) {
      const current = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ version } }`, { id: dash(child.itemId) });
      await gql(
        `mutation($id:ID!,$ver:Int,$fields:[FieldValueInput]){ updateItem(input:{itemId:$id,database:"master",language:"en",version:$ver,fields:$fields}){ item { itemId } } }`,
        { id: dash(child.itemId), ver: current.item.version, fields: filledChild }
      );
    }
  } else console.log("  no directory child", safe(profile.name));
  profile._pagePath = pagePath;
  profile._child = child ? dash(child.itemId) : "";
  captured.people[captured.people.length - 1] = { slug, name: profile.name, photo: profile.photo, pagePath, childId: child ? dash(child.itemId) : "" };
}

for (const [slug, url, title] of articles) {
  await open(url);
  const article = await readArticle();
  console.log("article", slug, "body", article.body.length, "date", article.date || "-");
  const itemName = safe(title);
  await writeFields(`/sitecore/content/Dentons/Dentons/Data/InsightArticle/${itemName}`, [
    { name: "Date", value: article.date },
    { name: "Body", value: article.body },
    { name: "Authors", value: article.authors },
    { name: "Related", value: article.related },
  ]);
  const lede = article.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 280);
  await writeFields(`/sitecore/content/Dentons/Dentons/Data/InsightResults/Knowledge results/${safe("Result " + title)}`, [
    { name: "Date", value: article.date },
    { name: "Summary", value: lede },
  ]);
  captured.articles.push({ slug, date: article.date, body: article.body.length });
}

await browser.close();

const photoDir = "/tmp/dentons-people";
mkdirSync(photoDir, { recursive: true });
for (const person of captured.people) {
  if (!person.photo) continue;
  const photoUrl = person.photo.startsWith("http") ? person.photo : `https://www.dentons.com${person.photo}`;
  const file = `${photoDir}/${person.slug}.ashx`;
  try {
    execFileSync("curl", ["-fsSL", "-A", "Mozilla/5.0", "-o", file, photoUrl], { stdio: "ignore" });
  } catch {
    console.log("photo download failed", person.slug);
    continue;
  }
  const output = execFileSync(
    "node",
    ["harness/scripts/content-hub-upload.mjs", "dentons", "--file", file, "--name", person.name, "--alt", person.name],
    { encoding: "utf8" }
  );
  const resultLine = output.trim().split("\n").find((line) => line.startsWith("RESULT "));
  if (!resultLine) {
    console.log("photo upload failed", person.slug);
    continue;
  }
  const xml = JSON.parse(resultLine.slice(7)).imageFieldXml;
  await writeFields(person.pagePath, [{ name: "Photo", value: xml }]);
  if (person.childId) {
    const current = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ version } }`, { id: person.childId });
    await gql(
      `mutation($id:ID!,$ver:Int,$value:String!){ updateItem(input:{itemId:$id,database:"master",language:"en",version:$ver,fields:[{name:"Photo",value:$value}]}){ item { itemId } } }`,
      { id: person.childId, ver: current.item.version, value: xml }
    );
  }
  console.log("photo", person.slug);
}

writeFileSync(
  new URL("./capture-body.json", import.meta.url),
  JSON.stringify({ capturedAt: new Date().toISOString(), people: captured.people.map(({ photo, ...rest }) => rest), articles: captured.articles }, null, 2)
);
console.log("done");
