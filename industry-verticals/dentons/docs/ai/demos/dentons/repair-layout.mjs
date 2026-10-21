import { readFileSync } from "node:fs";
import { ENV } from "../../../../../../harness/scripts/_lib.mjs";

const dash = (id) => {
  const h = String(id).replace(/[{}-]/g, "").toUpperCase();
  if (!/^[0-9A-F]{32}$/.test(h)) return null;
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};
const pages = JSON.parse(readFileSync(new URL("./assemble-pages-result.json", import.meta.url), "utf8"));
const ids = [...new Set(Object.values(pages).concat([
  "81637C8D-9500-4432-BCA6-F441FE782F41",
  "B851D4ED-7AE8-47F6-BD86-A8FE5BEED876",
]))];

const tr = await fetch(`${ENV.SITECORE_AUTH_HOST}/oauth/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: ENV.SITECORE_AUTOMATION_CLIENT_ID, client_secret: ENV.SITECORE_AUTOMATION_CLIENT_SECRET, grant_type: "client_credentials", audience: "https://api.sitecorecloud.io" }) });
const jwt = (await tr.json()).access_token;
const cm = String(ENV.SITECORE_CM_HOST).replace(/\/+$/, "");
const gql = async (query, variables) => {
  const r = await fetch(`${cm}/sitecore/api/authoring/graphql/v1/`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` }, body: JSON.stringify({ query, variables }) });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 500));
  return j.data;
};
async function writeFields(itemId, fields) {
  const cur = await gql(`query($id:ID!,$lang:String!){ item(where:{database:"master",itemId:$id,language:$lang}){ version } }`, { id: itemId, lang: "en" });
  await gql(`mutation($id:ID!,$lang:String!,$ver:Int,$fields:[FieldValueInput]){ updateItem(input:{itemId:$id,database:"master",language:$lang,version:$ver,fields:$fields}){ item { itemId } } }`, { id: itemId, lang: "en", ver: cur.item.version, fields });
}

let fixed = 0;
for (const itemId of ids) {
  const data = await gql(`query($id:ID!,$lang:String!){ item(where:{database:"master",itemId:$id,language:$lang}){ fields(ownFields:false){ nodes { name value } } } }`, { id: itemId, lang: "en" });
  const xml = data.item.fields.nodes.find((f) => f.name === "__Final Renderings")?.value || "";
  const next = xml.replace(/s:ds="\{([0-9A-Fa-f]{32})\}"/g, (_, h) => `s:ds="{${dash(h)}}"`);
  if (next !== xml) {
    await writeFields(itemId, [{ name: "__Final Renderings", value: next }]);
    fixed += 1;
  }
}
console.log("layouts fixed", fixed);

const dataRoot = await gql(`query { item(where:{database:"master", itemId:"59289F38-6D05-448B-89C4-BB67D8A641E8", language:"en"}){ children { nodes { itemId name template { name } } } } }`);
const junk = /lorem ipsum|example\.com|suscipit lectus|four-col-promo/i;
let cleared = 0;
for (const child of dataRoot.item.children.nodes) {
  const item = await gql(`query($id:ID!){ item(where:{database:"master", itemId:$id, language:"en"}){ fields(ownFields:true){ nodes { name value } } } }`, { id: child.itemId });
  const fields = item.item.fields.nodes.filter((f) => junk.test(f.value || "")).map((f) => ({ name: f.name, value: "" }));
  if (!fields.length) continue;
  await writeFields(child.itemId, fields);
  cleared += 1;
  console.log("cleared", child.name, fields.map((f) => f.name).join(","));
}
console.log("datasources cleared", cleared);

const header = await gql(`query { item(where:{database:"master", itemId:"00CF5F86-7FBF-4A61-862C-4FFD09107AAC", language:"en"}){ fields(ownFields:false){ nodes { name value } } } }`);
let hxml = header.item.fields.nodes.find((f) => f.name === "__Final Renderings").value;
const patched = hxml.replace("&amp;Filter=&amp;", "&amp;Filter=%7BD063E9D1-C7B5-4B1E-B31E-69886C9C59F5%7D&amp;");
if (patched !== hxml) {
  await writeFields("00CF5F86-7FBF-4A61-862C-4FFD09107AAC", [{ name: "__Final Renderings", value: patched }]);
  console.log("nav filter set");
} else console.log("nav filter already set or pattern missing");

const logo = `<Image src="https://fols-ch.sitecoresandbox.cloud/api/public/content/94163-unknown-image2?v=d93f90e1" dam-id="Mr5CJevaQpChNPS3myUBRg" alt="Dentons" />`;
const link = (text, url) => `<link text="${text}" anchor="" class="" title="" target="" querystring="" linktype="external" url="${url}" />`;
const footerLinks = [
  ["Legal notices", "https://www.dentons.com/en/legal-notices/legal-notices"],
  ["Client extranets", "https://www.dentons.com/en/client-extranets"],
  ["Cookies", "https://www.dentons.com/en/use-of-cookies"],
  ["Privacy", "https://www.dentons.com/en/privacy-policy"],
  ["Terms of use", "https://www.dentons.com/en/terms-of-use"],
  ["Modern Slavery Statement", "https://www.dentons.com/en/modern-slavery-and-human-trafficking-statement"],
  ["SRA Regulation", "https://www.dentons.com/en/global-presence/united-kingdom"],
  ["Fraud Alert", "https://www.dentons.com/en/footer/fraud-alert"],
  ["Web Accessibility", "https://www.dentons.com/en/footer/web-accessibility"],
  ["Tax Strategy Statement", "https://www.dentons.com/en/tax-strategy-statement"],
];
await writeFields("62F1EA4F-A620-474E-A2EB-9B94C04A2E7C", [
  { name: "Image1", value: logo },
  { name: "Title1", value: "" }, { name: "Title2", value: "" }, { name: "Title3", value: "" }, { name: "Title4", value: "" },
  { name: "Text1", value: footerLinks.slice(0, 4).map(([t, u]) => `<p><a href="${u}">${t}</a></p>`).join("") },
  { name: "Text2", value: footerLinks.slice(4, 7).map(([t, u]) => `<p><a href="${u}">${t}</a></p>`).join("") },
  { name: "Text3", value: footerLinks.slice(7).map(([t, u]) => `<p><a href="${u}">${t}</a></p>`).join("") },
  { name: "Text4", value: "" },
  { name: "Copyright", value: "© 2026 Dentons. All rights reserved. Attorney Advertising." },
  { name: "Link1", value: link("Privacy", "https://www.dentons.com/en/privacy-policy") },
  { name: "Link2", value: link("Terms of use", "https://www.dentons.com/en/terms-of-use") },
]);
console.log("footer updated");
