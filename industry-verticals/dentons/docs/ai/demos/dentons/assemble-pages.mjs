/**
 * One-shot assembler for the remaining Dentons pages and the shared-component sections.
 * Run from the repo root: node industry-verticals/dentons/docs/ai/demos/dentons/assemble-pages.mjs
 */
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { ENV } from "../../../../../../harness/scripts/_lib.mjs";

const HIDE = "{D063E9D1-C7B5-4B1E-B31E-69886C9C59F5}";
const PAGE = "97E1AA43-074C-44ED-A71A-CCC9F8EC037F";
const ARTICLE = "A017FD28-E461-4E27-AABD-2C0BE8AB1AE2";
const PERSON = "AABEA580-3918-41C7-8228-C4757D50C0D8";
const HOME = "81637C8D-9500-4432-BCA6-F441FE782F41";
const DATA = "59289F38-6D05-448B-89C4-BB67D8A641E8";
const PEOPLE = "B851D4ED-7AE8-47F6-BD86-A8FE5BEED876";
const DEVICE = "{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}";
const GRID = "%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D";

const R = {
  hero: "0E8CC47E-32D6-4F55-A7BF-E713ABD06323",
  four: "35075000-760E-4FF3-BD1C-F2EEBA251DCB",
  three: "AD385021-CE2B-4FC1-89AA-207D408034A8",
  heading: "89E1D547-7CD6-4EF0-9A27-1E99410797DD",
  cta: "488B8AC0-0EF9-4F6F-8711-78BA182B2C4C",
  two: "3A9A9D22-C092-4B54-9511-EB202CEABE8D",
};
const V = {
  hero: "5BEA04BD-7818-498E-9341-4119A4C73091",
  tiles: "55021545-CAAF-4445-99E5-DA9FC5BDB374",
  cards: "539B82CB-3202-461E-8DD5-57637954C9AB",
  cardRow: "085EA446-3650-4790-847F-3733C5CAF886",
  news: "7C9F336A-ABC8-4445-8AAC-76B6F45D6A33",
  newsRow: "2658E244-4B90-42E0-9677-15340A1CB8BF",
  heading: "FD10DA43-B0B4-42A6-B168-F6AC4F3F47D7",
  pageTitle: "92DE728B-F057-4DED-9E79-03A97BEEF01E",
  compact: "26F5630D-8F4E-4C86-B5D5-FE3AE647099D",
  cta: "1BC103F0-0037-41D7-A4C2-39D199230805",
  pair: "FABD3574-7DBC-4AF7-BA22-CBA95B4703AD",
  two: "2685C58D-6B22-45A0-9DD5-67EA0E320920",
};
const T = {
  hero: "0089BCB3-0117-43F2-A760-0771D5FF7417",
  four: "1B694EF9-154D-429A-9C3F-D7774CD4A852",
  three: "148D07BA-F923-4FB2-8907-0BD440D5DB44",
  heading: "FA136527-6302-471D-83AB-E66FC72BDA99",
  cta: "4900D7E5-61B0-483A-A9D6-69419D4D5982",
  two: "1812BF3E-6BDD-466D-99B2-0D7CEBB020FC",
};

const man = JSON.parse(readFileSync(new URL("./images/image-manifest.json", import.meta.url), "utf8"));
const img = (part) => man.find((e) => (e.src || "").includes(part) && e.imageFieldXml)?.imageFieldXml || "";
const HERO_IMG = `<Image src="https://fols-ch.sitecoresandbox.cloud/api/public/content/94905-dentons-hero?v=85e7d55f" dam-id="HfC-51a6SyCdOHVbQqFOMg" width="1900" height="1500" alt="Dentons" dam-content-type="Image" thumbnailsrc="https://fols-ch.sitecoresandbox.cloud/api/gateway/94905/thumbnail" />`;
const link = (text, url) => `<link text="${text.replace(/"/g, "&quot;")}" anchor="" class="" title="" target="" querystring="" linktype="external" url="${url.replace(/"/g, "&quot;")}" />`;
const internal = (text, id) => `<link text="${text.replace(/"/g, "&quot;")}" anchor="" class="" title="" target="" querystring="" linktype="internal" id="{${id.replace(/[{}]/g, "").toUpperCase()}}" />`;

const id = ENV.SITECORE_AUTOMATION_CLIENT_ID, secret = ENV.SITECORE_AUTOMATION_CLIENT_SECRET;
const tr = await fetch(`${ENV.SITECORE_AUTH_HOST}/oauth/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: id, client_secret: secret, grant_type: "client_credentials", audience: "https://api.sitecorecloud.io" }) });
if (!tr.ok) throw new Error("auth " + tr.status);
const jwt = (await tr.json()).access_token;
const cm = String(ENV.SITECORE_CM_HOST).replace(/\/+$/, "");
const gql = async (query, variables) => {
  const r = await fetch(`${cm}/sitecore/api/authoring/graphql/v1/`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` }, body: JSON.stringify({ query, variables }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors) throw new Error(JSON.stringify(j.errors || j).slice(0, 400));
  return j.data;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function byPath(path) {
  const data = await gql(`query($path:String!,$lang:String!){ item(where:{database:"master",path:$path,language:$lang}){ itemId name } }`, { path, lang: "en" });
  return data.item;
}
async function createItem(name, template, parent, fields) {
  const data = await gql(`mutation($name:String!,$template:ID!,$parent:ID!,$lang:String!,$fields:[FieldValueInput]){ createItem(input:{name:$name,templateId:$template,parent:$parent,language:$lang,fields:$fields}){ item { itemId name } } }`, { name, template, parent, lang: "en", fields });
  return data.createItem.item.itemId;
}
async function ensurePage(name, parentId, template, title, hide) {
  const parent = await gql(`query($id:ID!,$lang:String!){ item(where:{database:"master",itemId:$id,language:$lang}){ path } }`, { id: parentId, lang: "en" });
  const path = `${parent.item.path}/${name}`;
  const existing = await byPath(path);
  if (existing) return existing.itemId;
  const fields = [
    { name: "Title", value: title },
    { name: "NavigationTitle", value: title },
    { name: "__Display name", value: title },
  ];
  if (hide) fields.push({ name: "NavigationFilter", value: HIDE });
  const itemId = await createItem(name, template, parentId, fields);
  console.log("page", name, itemId);
  await sleep(150);
  return itemId;
}
async function ensureDs(name, template, fields) {
  const path = `/sitecore/content/Dentons/Dentons/Data/${name}`;
  const existing = await byPath(path);
  if (existing) return existing.itemId;
  const itemId = await createItem(name, template, DATA, fields);
  console.log("ds", name, itemId);
  await sleep(120);
  return itemId;
}
async function updateFields(itemId, fields) {
  const cur = await gql(`query($id:ID!,$lang:String!){ item(where:{database:"master",itemId:$id,language:$lang}){ version } }`, { id: itemId, lang: "en" });
  const ver = cur.item?.version || 1;
  await gql(`mutation($id:ID!,$lang:String!,$ver:Int,$fields:[FieldValueInput]){ updateItem(input:{itemId:$id,database:"master",language:$lang,version:$ver,fields:$fields}){ item { itemId } } }`, { id: itemId, lang: "en", ver, fields });
}
function rendering(renderingId, dsId, variantId, ph = "headless-main") {
  const uid = randomUUID().toUpperCase();
  const par = `GridParameters=${GRID}&amp;FieldNames=%7B${variantId}%7D&amp;DynamicPlaceholderId=1`;
  return `<r uid="{${uid}}" s:ds="{${dsId.replace(/[{}]/g, "").toUpperCase()}}" s:id="{${renderingId}}" s:par="${par}" s:ph="${ph}" />`;
}
async function layout(itemId) {
  const data = await gql(`query($id:ID!,$lang:String!){ item(where:{database:"master",itemId:$id,language:$lang}){ fields(ownFields:false){ nodes { name value } } } }`, { id: itemId, lang: "en" });
  return data.item.fields.nodes.find((f) => f.name === "__Final Renderings")?.value || "";
}
async function place(itemId, tags) {
  if (!tags.length) return;
  let xml = await layout(itemId);
  const fresh = tags.filter((t) => !xml.includes(t.slice(t.indexOf('s:id="'), t.indexOf('s:id="') + 50)));
  const add = tags.filter((t) => {
    const id = t.match(/s:id="([^"]+)"/)[1];
    const ds = t.match(/s:ds="([^"]+)"/)[1];
    return !xml.includes(id) || !xml.includes(ds);
  });
  if (!add.length) return;
  if (!xml.includes("<d ")) xml = `<r xmlns:p="p" xmlns:s="s" p:p="1"><d id="${DEVICE}">${add.join("")}</d></r>`;
  else xml = xml.replace("</d>", `${add.join("")}</d>`);
  await updateFields(itemId, [{ name: "__Final Renderings", value: xml }]);
  console.log("placed", itemId, add.length);
}

const stubs = [
  ["about-dentons", "About Dentons"],
  ["global-presence", "Global presence"],
  ["careers", "Careers"],
  ["find-your-dentons-team", "Practices"],
  ["services-and-solutions", "Services and solutions"],
  ["events", "Events"],
  ["recognition", "Recognition"],
  ["news", "News"],
  ["featured-insights", "Featured insights"],
  ["global-solutions", "Global solutions"],
];
const people = [
  ["martin-abadi", "Martin Abadi"],
  ["nathan-abbott", "Nathan Abbott"],
  ["majd-abdelhalim", "Majd Abd Elhalim"],
  ["ulugbek-abdullaev", "Ulugbek Abdullaev"],
  ["sadaf-abkenar", "Sadaf Abkenar"],
  ["dounia-abouarab", "Dounia Abouarab"],
  ["seth-abrams", "Seth K. Abrams"],
  ["stephanie-abrutyn", "Stephanie Abrutyn"],
  ["roger-abseher", "Roger Abseher"],
  ["diego-abuauad", "Diego Abuauad Truffello"],
  ["luisabundio-maldonado", "Luis Abundio Maldonado"],
  ["roberto-aburto", "Roberto Aburto"],
  ["daniela-acevedo", "Daniela Acevedo"],
  ["nastasia-achilles", "Dr. Nastasia Achilles"],
];
const articles = [
  ["balancing-innovation-and-competition", "Balancing innovation and competition: intellectual property rights under Tanzania's Fair Competition (Abuse of Dominant Position) Regulations, 2026"],
  ["ir-insights-podcast-industrial-relations-update", "IR Insights Podcast: Industrial relations update – key cases and developments"],
  ["misrepresentations-in-disclosure", "Misrepresentations in disclosure"],
  ["queensland-mining-reforms", "Queensland's Mining Reforms: standing, scrutiny, speed in approvals process"],
  ["related-party-transactions-in-canada", "Related party transactions in Canada: Special committee best practices"],
  ["dcaa-signals", "DCAA Signals How It Will Audit Nontraditional Defense Contractors After Section 1826"],
  ["dentons-digital-infrastructure-dispatch-october-2026", "Dentons' Digital Infrastructure Dispatch - October 2026"],
  ["the-government-postpones-the-entry-into-force-of-the-labor-assistance-fund", "The Government Postpones the Entry into Force of the Labor Assistance Fund to December 1, 2026"],
];

const ctaId = await ensureDs("Home Contact", T.cta, [
  { name: "Title", value: "How can the world's largest global law firm help you today ?" },
  { name: "Link", value: link("Contact us", "https://www.dentons.com/en/contact-us") },
]);

const pages = {};
for (const [name, title] of stubs) pages[name] = await ensurePage(name, HOME, PAGE, title, true);
pages.insights = await ensurePage("insights", HOME, PAGE, "Knowledge", true);
pages["client-experience"] = (await byPath("/sitecore/content/Dentons/Dentons/Home/client-experience")).itemId;
pages["global-sectors"] = (await byPath("/sitecore/content/Dentons/Dentons/Home/global-sectors")).itemId;
pages["our-professionals"] = PEOPLE;
for (const [name, title] of people) pages[name] = await ensurePage(name, PEOPLE, PERSON, title, true);
for (const [name, title] of articles) pages[name] = await ensurePage(name, pages.insights, ARTICLE, title, true);

async function titleAndCta(pageId, title) {
  const ds = await ensureDs(`Title ${title}`.slice(0, 80).replace(/[^\w ]/g, ""), T.heading, [{ name: "Heading", value: title }]);
  await place(pageId, [rendering(R.heading, ds, V.pageTitle), rendering(R.cta, ctaId, V.cta)]);
}

for (const [name, title] of [...stubs, ...people, ...articles]) await titleAndCta(pages[name], title);

await updateFields("4853D785-E27F-4579-A06B-4020FDEC7A6D", [{ name: "Image", value: HERO_IMG }]);

const four = await ensureDs("Home Tiles", T.four, [
  { name: "Title1", value: "Grow" }, { name: "Link1", value: link("Learn more", "https://s10-eucd1.dentons.com/en/services-and-solutions/grow") },
  { name: "Title2", value: "Protect" },
  { name: "Title3", value: "Operate" },
  { name: "Title4", value: "Finance" },
]);
const row1 = await ensureDs("Home Cards", T.three, [
  { name: "Text1", value: "Register now for our CX webinar program" }, { name: "Link1", value: link("Explore more", "https://www.dentons.com/en/client-experience/webinar-insights-program") }, { name: "Image1", value: img("cx-webinar") },
  { name: "Text2", value: "Global supply chain disruption report" }, { name: "Link2", value: link("Learn more", "https://www.dentons.com/en/services-and-solutions/digital-solutions/all-knowledge-hubs/global-trade-and-legal-risk") }, { name: "Image2", value: img("butterflies") },
  { name: "Text3", value: "Global class and collective actions" }, { name: "Link3", value: link("Visit here", "https://www.dentons.com/en/services-and-solutions/global-class-and-collective-actions") }, { name: "Image3", value: img("adobestock_134537443") },
]);
const row2 = await ensureDs("Home Card Row", T.three, [
  { name: "Text1", value: "2026 global AI trends: Six key developments shaping the next phase of AI" }, { name: "Link1", value: link("Learn more", "https://www.dentons.com/en/insights/articles/2026/january/20/2026-global-ai-trends") }, { name: "Image1", value: img("adobestock_114680146") },
  { name: "Text2", value: "Ukraine transformation and rebuild" }, { name: "Link2", value: link("Learn more", "https://www.dentons.com/en/Ukraine-transformation-and-rebuild") }, { name: "Image2", value: img("adobestock_289880144") },
  { name: "Text3", value: "Global tax guide to doing business in..." }, { name: "Link3", value: link("Access now", "https://www.dentons.com/en/services-and-solutions/global-tax-guide-to-doing-business-in") }, { name: "Image3", value: img("global-tax") },
]);
const newsHead = await ensureDs("Home News Heading", T.heading, [{ name: "Heading", value: "Dentons' news from around the world" }]);
const news1 = await ensureDs("Home News", T.three, [
  { name: "Text1", value: "Leading with Clarity in Times of Complexity" }, { name: "Image1", value: img("adobestock_495404709") },
  { name: "Text2", value: "Behind the big screen: Dentons HPRP joins the conversation on the Future of Indonesia's film industry" }, { name: "Link2", value: link("Read more", "https://dentons.hprplawyers.com/en/about-dentons-hprp/news/2026/october/dentons-hprp-joins-the-conversation-on-the-future-of-indonesias-film-industry") }, { name: "Image2", value: img("adobestock_101098994") },
  { name: "Text3", value: "Dentons advises mBank and Bank Millennium on financing of 135 MW solar photovoltaic" }, { name: "Link3", value: link("Read more", "https://www.dentons.com/en/about-dentons/news-events-and-awards/news/2026/october/dentons-advises-mbank-and-bank-millennium-on-financing--of-135-mw-solar-photovoltaic-project") }, { name: "Image3", value: img("istock-1152338619") },
]);
const news2 = await ensureDs("Home News Row", T.three, [
  { name: "Text1", value: "Dentons Prevails at the Iowa Court of Appeals" }, { name: "Link1", value: link("Read more", "https://www.dentons.com/en/about-dentons/news-events-and-awards/news/2026/october/dentons-prevails-at-the-iowa-court-of-appeals") }, { name: "Image1", value: img("adobestock_362570416") },
  { name: "Text2", value: "IFLR1000 2027 recognizes Dentons' transactional strength across Western Europe" }, { name: "Link2", value: link("Read more", "https://www.dentons.com/en/about-dentons/news-events-and-awards/news/2026/october/iflr1000-2027-recognizes-dentons-transactional-strength-across-western-europe") }, { name: "Image2", value: img("adobestock_131495735") },
  { name: "Text3", value: "Dentons advises Uzbekistans Tourism and Entertainment Group" }, { name: "Link3", value: link("Read more", "https://www.dentons.com/en/about-dentons/news-events-and-awards/news/2026/october/dentons-advises-uzbekistans-tourism-and-entertainment-group") },
]);
const loadMore = await ensureDs("Home Load More", T.heading, [
  { name: "Link", value: link("Load more", "#") },
]);

await place(HOME, [
  rendering(R.four, four, V.tiles),
  rendering(R.three, row1, V.cards),
  rendering(R.three, row2, V.cardRow),
  rendering(R.heading, newsHead, V.heading),
  rendering(R.three, news1, V.news),
  rendering(R.three, news2, V.newsRow),
  rendering(R.heading, loadMore, V.compact),
  rendering(R.cta, ctaId, V.cta),
]);

const cxHero = await ensureDs("Client Experience Hero", T.hero, [
  { name: "Title", value: "Client experience (CX)" },
  { name: "Image", value: img("cx-webinar") || HERO_IMG },
]);
await place(pages["client-experience"], [rendering(R.hero, cxHero, V.hero), rendering(R.cta, ctaId, V.cta)]);
const gsHero = await ensureDs("Global Sectors Hero", T.hero, [
  { name: "Title", value: "Global sectors" },
  { name: "Image", value: img("istock-898703156") || HERO_IMG },
]);
await place(pages["global-sectors"], [rendering(R.hero, gsHero, V.hero), rendering(R.cta, ctaId, V.cta)]);
const kHero = await ensureDs("Knowledge Hero", T.hero, [
  { name: "Title", value: "Knowledge" },
  { name: "Image", value: HERO_IMG },
]);
await place(pages.insights, [rendering(R.hero, kHero, V.hero), rendering(R.four, four, V.tiles), rendering(R.cta, ctaId, V.cta)]);
const peopleHead = await ensureDs("Our People Heading", T.heading, [{ name: "Heading", value: "Our people" }]);
await place(PEOPLE, [rendering(R.heading, peopleHead, V.pageTitle), rendering(R.cta, ctaId, V.cta)]);

writeFileSync(new URL("./assemble-pages-result.json", import.meta.url), JSON.stringify(pages, null, 2));
console.log("done", Object.keys(pages).length);
