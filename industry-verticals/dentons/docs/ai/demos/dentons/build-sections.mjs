/**
 * Create the six remaining Dentons components and place them.
 * Run from the repo root.
 */
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { ENV } from "../../../../../../harness/scripts/_lib.mjs";

const dash = (id) => {
  const h = String(id).replace(/[{}-]/g, "").toUpperCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};
const brace = (id) => `{${dash(id)}}`;
const TEMPLATE = "AB86861A-6030-46C5-B394-E8F99E8B87DB";
const SECTION = "E269FBB5-3750-427A-9149-7AA950B49301";
const FIELD = "455A3E98-A627-4B40-8035-E683A0331AC7";
const FOLDER = "0437FEE2-44C9-46A6-ABE9-28858D9FEE8C";
const JSON_RENDERING = "04646A89-996F-4EE7-878A-FFDBF1F0EF0D";
const VARIANT = "4D50CDAE-C2D9-4DE8-B080-8F992BFB1B55";
const BASE = "{1930BBEB-7805-471A-A3BE-4858AC7CF696}|{44A022DB-56D3-419A-B43B-E27E4D8E9C41}";
const PARAMS = "{4247AAD4-EBDE-4994-998F-E067A51B1FE4}|{5C74E985-E055-43FF-B28C-DB6C6A6450A2}|{44A022DB-56D3-419A-B43B-E27E4D8E9C41}|{3DB3EB10-F8D0-4CC9-BE26-18CE7B139EC8}";
const ROOTS = {
  templates: "DCE91318-8E4A-4C79-A01E-CAA586C59C3C",
  renderings: "94782A7A-DEF5-4326-8838-CFDAB76C6513",
  data: "59289F38-6D05-448B-89C4-BB67D8A641E8",
  variants: "EA1CE7A8-2545-4F43-B594-473C0B0C09F5",
  available: "65BF9BE3-83D2-42C0-83E4-D22D8B08A22D",
  person: "AABEA580-3918-41C7-8228-C4757D50C0D8",
  header: "00CF5F86-7FBF-4A61-862C-4FFD09107AAC",
};
const CTA = "{488B8AC0-0EF9-4F6F-8711-78BA182B2C4C}";
const PAGE_TITLE = "92DE728B-F057-4DED-9E79-03A97BEEF01E";
const DEVICE = "{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}";
const GRID = "%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D";
const demo = new URL("./", import.meta.url);
const pages = JSON.parse(readFileSync(new URL("./assemble-pages-result.json", import.meta.url), "utf8"));

const tr = await fetch(`${ENV.SITECORE_AUTH_HOST}/oauth/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: ENV.SITECORE_AUTOMATION_CLIENT_ID, client_secret: ENV.SITECORE_AUTOMATION_CLIENT_SECRET, grant_type: "client_credentials", audience: "https://api.sitecorecloud.io" }) });
const jwt = (await tr.json()).access_token;
const cm = String(ENV.SITECORE_CM_HOST).replace(/\/+$/, "");
const gql = async (query, variables) => {
  const r = await fetch(`${cm}/sitecore/api/authoring/graphql/v1/`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` }, body: JSON.stringify({ query, variables }) });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 500));
  return j.data;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function byPath(path) {
  const data = await gql(`query($path:String!){ item(where:{database:"master", path:$path, language:"en"}){ itemId path } }`, { path });
  return data.item;
}
async function create(name, template, parent, fields = []) {
  const data = await gql(`mutation($name:String!,$template:ID!,$parent:ID!,$fields:[FieldValueInput]){ createItem(input:{name:$name,templateId:$template,parent:$parent,language:"en",fields:$fields}){ item { itemId } } }`, { name, template, parent, fields });
  await sleep(60);
  return dash(data.createItem.item.itemId);
}
async function ensure(name, template, parent, fields = []) {
  const parentItem = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ path } }`, { id: parent });
  const existing = await byPath(`${parentItem.item.path}/${name}`);
  if (existing) return dash(existing.itemId);
  const id = await create(name, template, parent, fields);
  console.log("created", name, id);
  return id;
}
async function write(itemId, fields) {
  const cur = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ version } }`, { id: itemId });
  await gql(`mutation($id:ID!,$ver:Int,$fields:[FieldValueInput]){ updateItem(input:{itemId:$id,database:"master",language:"en",version:$ver,fields:$fields}){ item { itemId } } }`, { id: itemId, ver: cur.item.version, fields });
}
const safe = (value) => String(value).replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim().slice(0, 90) || "Item";
const link = (text, url) => `<link text="${text.replace(/"/g, "&quot;")}" anchor="" class="" title="" target="" querystring="" linktype="external" url="${url.replace(/"/g, "&quot;")}" />`;
const internal = (text, id) => `<link text="${text.replace(/"/g, "&quot;")}" anchor="" class="" title="" target="" querystring="" linktype="internal" id="${brace(id)}" />`;

const componentsFolder = await ensure("Components", FOLDER, ROOTS.templates);
const paramsFolder = await ensure("Rendering Parameters", FOLDER, ROOTS.templates);
const renderingsFolder = await ensure("Renderings", FOLDER, ROOTS.renderings);
const pageContentTemplates = await ensure("Page Content", FOLDER, componentsFolder);
const pageContentParams = await ensure("Page Content", FOLDER, paramsFolder);
const pageContentRenderings = await ensure("Page Content", FOLDER, renderingsFolder);
const variantFolderTemplate = (await gql(`query { item(where:{database:"master", itemId:"8473A710-D863-4DE5-AEC3-21A35A434103", language:"en"}){ template { templateId } } }`)).item.template.templateId;

async function fieldsOn(sectionId, specs) {
  for (const [name, type] of specs) {
    const id = await ensure(name, FIELD, sectionId);
    await write(id, [{ name: "Type", value: type }]);
  }
}
async function standardValues(templateId, masters) {
  const id = await ensure("__Standard Values", templateId, templateId);
  await write(templateId, [{ name: "__Standard values", value: brace(id) }]);
  if (masters) await write(id, [{ name: "__Masters", value: brace(masters) }]);
  return id;
}

const personSection = await ensure("Person Data", SECTION, ROOTS.person);
await fieldsOn(personSection, [
  ["Name", "Single-Line Text"], ["Role", "Single-Line Text"], ["Office", "Single-Line Text"],
  ["Photo", "Image"], ["Email", "General Link"], ["Phone", "Single-Line Text"],
  ["Bio", "Rich Text"], ["Experience", "Rich Text"], ["Recognition", "Rich Text"],
  ["Activities", "Rich Text"], ["Education", "Rich Text"], ["Languages", "Single-Line Text"],
]);

const specs = [
  {
    name: "ProfessionalDirectory",
    query: true,
    parentFields: [["Title", "Single-Line Text"], ["Intro", "Single-Line Text"]],
    childFields: [["Name", "Single-Line Text"], ["Role", "Single-Line Text"], ["Office", "Single-Line Text"], ["Photo", "Image"], ["Email", "General Link"], ["Link", "General Link"]],
    queryText: `query ProfessionalDirectory($datasource: String!, $language: String!) { datasource: item(path: $datasource, language: $language) { title: field(name: "Title") { jsonValue } intro: field(name: "Intro") { jsonValue } children { results { id name: field(name: "Name") { jsonValue } role: field(name: "Role") { jsonValue } office: field(name: "Office") { jsonValue } photo: field(name: "Photo") { jsonValue } email: field(name: "Email") { jsonValue } link: field(name: "Link") { jsonValue } } } } }`,
  },
  {
    name: "SectorGroupList",
    query: true,
    parentFields: [["Title", "Single-Line Text"]],
    childFields: [["Group", "Single-Line Text"], ["Image", "Image"], ["Label", "Single-Line Text"], ["Link", "General Link"]],
    queryText: `query SectorGroupList($datasource: String!, $language: String!) { datasource: item(path: $datasource, language: $language) { title: field(name: "Title") { jsonValue } children { results { id group: field(name: "Group") { jsonValue } image: field(name: "Image") { jsonValue } label: field(name: "Label") { jsonValue } link: field(name: "Link") { jsonValue } } } } }`,
  },
  {
    name: "InsightResults",
    query: true,
    parentFields: [["Title", "Single-Line Text"]],
    childFields: [["Title", "Single-Line Text"], ["Date", "Single-Line Text"], ["Type", "Single-Line Text"], ["Summary", "Single-Line Text"], ["Link", "General Link"]],
    queryText: `query InsightResults($datasource: String!, $language: String!) { datasource: item(path: $datasource, language: $language) { title: field(name: "Title") { jsonValue } children { results { id title: field(name: "Title") { jsonValue } date: field(name: "Date") { jsonValue } type: field(name: "Type") { jsonValue } summary: field(name: "Summary") { jsonValue } link: field(name: "Link") { jsonValue } } } } }`,
  },
  {
    name: "InsightArticle",
    query: false,
    parentFields: [["Title", "Single-Line Text"], ["Date", "Single-Line Text"], ["Type", "Single-Line Text"], ["Body", "Rich Text"], ["Authors", "Rich Text"], ["Related", "Rich Text"]],
  },
  {
    name: "ProfessionalProfile",
    context: true,
  },
  {
    name: "SiteSearch",
    context: true,
  },
];

const made = {};
for (const spec of specs) {
  const paramsId = await ensure(spec.name, TEMPLATE, pageContentParams);
  await write(paramsId, [{ name: "__Base template", value: PARAMS }]);
  let renderingFields = [
    { name: "componentName", value: spec.name },
    { name: "Parameters Template", value: brace(paramsId) },
    { name: "AddFieldEditorButton", value: "1" },
  ];
  if (!spec.context) {
    const parentId = await ensure(spec.name, TEMPLATE, pageContentTemplates);
    await write(parentId, [{ name: "__Base template", value: BASE }]);
    const sectionId = await ensure("Data", SECTION, parentId);
    await fieldsOn(sectionId, spec.parentFields);
    let childId = "";
    if (spec.childFields) {
      childId = await ensure(`${spec.name} Item`, TEMPLATE, pageContentTemplates);
      await write(childId, [{ name: "__Base template", value: BASE }]);
      const childSection = await ensure("Data", SECTION, childId);
      await fieldsOn(childSection, spec.childFields);
      await standardValues(childId);
      await standardValues(parentId, childId);
    } else {
      await standardValues(parentId);
    }
    const folderId = await ensure(`${spec.name} Folder`, TEMPLATE, pageContentTemplates);
    await standardValues(folderId, parentId);
    const dataFolder = await ensure(spec.name, folderId, ROOTS.data);
    await write(dataFolder, [{ name: "__Masters", value: brace(parentId) }]);
    renderingFields = renderingFields.concat([
      { name: "Datasource Template", value: `/sitecore/templates/Project/Dentons/Components/Page Content/${spec.name}` },
      { name: "Datasource Location", value: `query:$site/*[@@name='Data']/*[@@templatename='${spec.name} Folder']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${spec.name} Folder']` },
      { name: "Enable Datasource Query", value: "1" },
    ]);
    if (spec.queryText) renderingFields.push({ name: "ComponentQuery", value: spec.queryText });
    made[spec.name] = { parentId, childId, dataFolder, folderId };
  }
  const renderingId = await ensure(spec.name, JSON_RENDERING, pageContentRenderings, renderingFields);
  await write(renderingId, renderingFields);
  const variantContainer = await ensure(spec.name, variantFolderTemplate, ROOTS.variants);
  const variantId = await ensure("Dentons", VARIANT, variantContainer);
  made[spec.name] = { ...(made[spec.name] || {}), renderingId, variantId };
  console.log("rendering", spec.name, renderingId);
}

function rendering(renderingId, variantId, dsId, ph = "headless-main") {
  const ds = dsId ? ` s:ds="${brace(dsId)}"` : "";
  return `<r uid="{${randomUUID().toUpperCase()}}"${ds} s:id="${brace(renderingId)}" s:par="GridParameters=${GRID}&amp;FieldNames=%7B${dash(variantId)}%7D&amp;DynamicPlaceholderId=1" s:ph="${ph}" />`;
}
async function layoutOf(itemId) {
  const data = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ fields(ownFields:false){ nodes { name value } } } }`, { id: itemId });
  return data.item.fields.nodes.find((f) => f.name === "__Final Renderings")?.value || "";
}
async function place(itemId, tag, { stripTitle = false } = {}) {
  let xml = await layoutOf(itemId);
  if (xml.includes(tag.match(/s:id="([^"]+)"/)[1])) return;
  if (stripTitle) xml = xml.replace(new RegExp(`<r [^>]*FieldNames=%7B${PAGE_TITLE}%7D[^>]*/>`, "g"), "");
  if (!xml.includes("<d ")) xml = `<r xmlns:p="p" xmlns:s="s" p:p="1"><d id="${DEVICE}">${tag}</d></r>`;
  const ctaAt = xml.indexOf(`s:id="${CTA}"`);
  if (ctaAt > 0) {
    const start = xml.lastIndexOf("<r ", ctaAt);
    xml = xml.slice(0, start) + tag + xml.slice(start);
  } else xml = xml.replace("</d>", `${tag}</d>`);
  await write(itemId, [{ name: "__Final Renderings", value: xml }]);
  console.log("placed", itemId);
}

const roleFrom = (summary) => {
  const s = summary.toLowerCase();
  if (s.includes("partner")) return "Partner";
  if (s.includes("associate")) return "Associate";
  return "";
};
const people = ["martin-abadi", "nathan-abbott", "majd-abdelhalim", "ulugbek-abdullaev", "sadaf-abkenar", "dounia-abouarab", "seth-abrams", "stephanie-abrutyn", "roger-abseher", "diego-abuauad", "luisabundio-maldonado", "roberto-aburto", "daniela-acevedo", "nastasia-achilles"];
const names = { "martin-abadi": "Martin Abadi", "nathan-abbott": "Nathan Abbott", "majd-abdelhalim": "Majd Abd Elhalim", "ulugbek-abdullaev": "Ulugbek Abdullaev", "sadaf-abkenar": "Sadaf Abkenar", "dounia-abouarab": "Dounia Abouarab", "seth-abrams": "Seth K. Abrams", "stephanie-abrutyn": "Stephanie Abrutyn", "roger-abseher": "Roger Abseher", "diego-abuauad": "Diego Abuauad Truffello", "luisabundio-maldonado": "Luis Abundio Maldonado", "roberto-aburto": "Roberto Aburto", "daniela-acevedo": "Daniela Acevedo", "nastasia-achilles": "Dr. Nastasia Achilles" };

const directoryId = await ensure("Our people", made.ProfessionalDirectory.parentId, made.ProfessionalDirectory.dataFolder, [
  { name: "Title", value: "Our people" },
  { name: "Intro", value: "Filter list by last names starting with the selected letter" },
]);
for (const slug of people) {
  const file = JSON.parse(readFileSync(new URL(`./sections-${slug}.json`, demo), "utf8"));
  const links = file.sections[0].links || [];
  const office = (links.find((item) => (item.href || "").includes("/global-presence/")) || {}).text || "";
  const share = links.find((item) => (item.href || "").includes("summary="));
  const summary = share ? decodeURIComponent((share.href.split("summary=")[1] || "").split("&")[0].replace(/\+/g, " ")) : "";
  const role = roleFrom(summary);
  const child = await ensure(safe(names[slug]), made.ProfessionalDirectory.childId, directoryId, [
    { name: "Name", value: names[slug] },
    { name: "Role", value: role },
    { name: "Office", value: office },
    { name: "Link", value: internal(names[slug], pages[slug]) },
  ]);
  await write(pages[slug], [
    { name: "Name", value: names[slug] },
    { name: "Role", value: role },
    { name: "Office", value: office },
    { name: "Bio", value: summary ? `<p>${summary.replace(/</g, "")}</p>` : "" },
  ]);
  console.log("person", slug, child);
}

const sectorId = await ensure("Global sectors", made.SectorGroupList.parentId, made.SectorGroupList.dataFolder, [{ name: "Title", value: "Global sectors" }]);
const sectorFile = JSON.parse(readFileSync(new URL("./sections-global-sectors.json", demo), "utf8"));
const sectorEls = sectorFile.sections.find((s) => s.index === 3).elements.filter((e) => e.role === "link");
const groups = { 44: [], 764: [] };
let current = { 44: "", 764: "" };
for (const el of sectorEls) {
  const column = el.x < 400 ? 44 : 764;
  if (["Capital", "Consumer", "Government", "Resources"].includes(el.text) && el.y === 164 || ["Government", "Resources"].includes(el.text) && el.y === 651) {
    current[column] = el.text;
    continue;
  }
  if (!current[column]) continue;
  groups[column].push({ group: current[column], text: el.text, href: el.href });
}
let n = 0;
for (const column of [44, 764]) {
  for (const item of groups[column]) {
    n += 1;
    await ensure(safe(`${item.group} ${n}`), made.SectorGroupList.childId, sectorId, [
      { name: "Group", value: item.group },
      { name: "Label", value: item.text },
      { name: "Link", value: link(item.text, item.href) },
    ]);
  }
}

const insightsId = await ensure("Knowledge results", made.InsightResults.parentId, made.InsightResults.dataFolder, [{ name: "Title", value: "Knowledge" }]);
const hubs = [
  ["AI – everything you need to know", "https://www.dentons.com/en/services-and-solutions/digital-solutions/all-knowledge-hubs/ai-hub"],
  ["Global tax guide to doing business in...", "https://www.dentons.com/en/services-and-solutions/global-tax-guide-to-doing-business-in"],
  ["Global in-house legal insights survey 2023", "https://www.dentons.com/en/client-experience/clientsurvey2023"],
];
for (const [title, href] of hubs) {
  await ensure(safe(title), made.InsightResults.childId, insightsId, [
    { name: "Title", value: title }, { name: "Type", value: "Hub" }, { name: "Link", value: link(title, href) },
  ]);
}
const articles = [
  ["balancing-innovation-and-competition", "Balancing innovation and competition: intellectual property rights under Tanzania's Fair Competition (Abuse of Dominant Position) Regulations, 2026", "sections-balancing-innovation-and-competition.json"],
  ["ir-insights-podcast-industrial-relations-update", "IR Insights Podcast: Industrial relations update – key cases and developments", "sections-ir-insights-podcast-industrial-relations-update.json"],
  ["misrepresentations-in-disclosure", "Misrepresentations in disclosure", "sections-misrepresentations-in-disclosure.json"],
  ["queensland-mining-reforms", "Queensland's Mining Reforms: standing, scrutiny, speed in approvals process", "sections-queensland-mining-reforms.json"],
  ["related-party-transactions-in-canada", "Related party transactions in Canada: Special committee best practices", "sections-related-party-transactions-in-canada.json"],
  ["dcaa-signals", "DCAA Signals How It Will Audit Nontraditional Defense Contractors After Section 1826", "sections-dcaa-signals.json"],
  ["dentons-digital-infrastructure-dispatch-october-2026", "Dentons' Digital Infrastructure Dispatch - October 2026", "sections-dentons-digital-infrastructure-dispatch-october-2026.json"],
  ["the-government-postpones-the-entry-into-force-of-the-labor-assistance-fund", "The Government Postpones the Entry into Force of the Labor Assistance Fund to December 1, 2026", "sections-labor-assistance-fund.json"],
];
for (const [slug, title, fileName] of articles) {
  const file = JSON.parse(readFileSync(new URL(`./${fileName}`, demo), "utf8"));
  const texts = [];
  for (const section of file.sections) {
    for (const el of section.elements || []) {
      const text = (el.text || "").trim();
      if (!text || text.length < 40) continue;
      if (/copyright|cookie|contact us or find|global sectors|how can the world/i.test(text)) continue;
      texts.push(text);
    }
  }
  const date = (texts.find((t) => /^October \d/.test(t)) || "");
  const body = texts.find((t) => !/^October /.test(t) && !/Email me|Partner,|Managing Partner/.test(t)) || "";
  const author = texts.find((t) => /Email me|Partner,|Managing Partner/.test(t)) || "";
  const articleItem = await ensure(safe(title), made.InsightArticle.parentId, made.InsightArticle.dataFolder, [
    { name: "Title", value: title },
    { name: "Date", value: date },
    { name: "Type", value: "Article" },
    { name: "Body", value: body ? `<p>${body.replace(/</g, "")}</p>` : "" },
    { name: "Authors", value: author ? `<p>${author.replace(/</g, "")}</p>` : "" },
  ]);
  await ensure(safe(`Result ${title}`), made.InsightResults.childId, insightsId, [
    { name: "Title", value: title },
    { name: "Date", value: date },
    { name: "Type", value: "Article" },
    { name: "Summary", value: body },
    { name: "Link", value: internal(title, pages[slug]) },
  ]);
  await place(pages[slug], rendering(made.InsightArticle.renderingId, made.InsightArticle.variantId, articleItem), { stripTitle: true });
}

await place(pages["our-professionals"], rendering(made.ProfessionalDirectory.renderingId, made.ProfessionalDirectory.variantId, directoryId), { stripTitle: true });
for (const slug of people) {
  await place(pages[slug], rendering(made.ProfessionalProfile.renderingId, made.ProfessionalProfile.variantId), { stripTitle: true });
}
await place(pages["global-sectors"], rendering(made.SectorGroupList.renderingId, made.SectorGroupList.variantId, sectorId));
await place(pages.insights, rendering(made.InsightResults.renderingId, made.InsightResults.variantId, insightsId));
await place(ROOTS.header, rendering(made.SiteSearch.renderingId, made.SiteSearch.variantId, "", "/headless-header/header-right-0-2"));

const renderingsField = (await gql(`query { item(where:{database:"master", itemId:"${ROOTS.available}", language:"en"}){ fields(ownFields:false){ nodes { name value } } } }`)).item.fields.nodes.find((f) => f.name === "Renderings")?.value || "";
const additions = specs.map((spec) => brace(made[spec.name].renderingId)).filter((id) => !renderingsField.toUpperCase().includes(id));
if (additions.length) await write(ROOTS.available, [{ name: "Renderings", value: `${renderingsField}|${additions.join("|")}`.replace(/^\|/, "") }]);
console.log(JSON.stringify(Object.fromEntries(specs.map((spec) => [spec.name, made[spec.name].renderingId])), null, 2));
console.log("done");
