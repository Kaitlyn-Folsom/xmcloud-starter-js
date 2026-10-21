# Demo brief — Dentons

> Filled from the demo specification and the Altudo opportunity brief. No discovery transcript. Method: `harness/reference/demo-method.md`.
> Facts are marked *rfp* (demo spec) or taken from the opportunity brief and marked in the plan as *rfp* with the file named in the evidence. The SE's instructions are marked *stated by the SE*. Gaps stay gaps.

## 1. Who and why
- Inputs used: `Dentons Website Modernization Demo Spec Oct2026.pdf` (rfp, demo specification and scoring guide); `Altudo_Dentons_SitecoreAI_Opportunity_Brief.docx` (supporting, account and demo brief, 17 September 2026). No transcript. SE request: build the public site, do not add personalization.
- Prospect / industry: Dentons, the world's largest law firm (opportunity brief). Public site https://www.dentons.com/ (English site https://www.dentons.com/en).
- Competitors / incumbent platform: Current platform Sitecore XP 10.4, licensed through December 2028 (opportunity brief). Live contenders Sitecore and Optimizely (opportunity brief; the spec does not name them). Coveo has been named as a search benchmark (opportunity brief).
- Compelling event / why now: Platform decision before the RFP, in separate presentations to Shane and Carly (opportunity brief). The October/November 2026 demo spec is the evaluation script for that demonstration.
- Situation slide: Dentons will score this demonstration on the October 2026 demo spec. About 90 minutes: 10 minutes of context, 70 minutes for seven live scenarios in a fixed order, 10 minutes for questions. Authoring and global experience management carries 25 percent. Shane and Carly are the attendees named in the supporting brief, not in the spec. The site is the public English site. A scenario is shown on a page only when that page exists on dentons.com.

### Audience (AAA)
| id | Who (name, role) | Annoyance (what bugs them today) | Afterward (their day once solved) |
|---|---|---|---|
| a1 | Shane, GBT decision-maker (opportunity brief; the spec does not name him) | Every scenario has to say what is core licence, an add-on, a third party, custom or roadmap (spec callout). | He can score search, analytics, DAM and personalization without a feature being implied. |
| a2 | Carly, content owner (opportunity brief; the spec does not name her) | Authors need regional publishing with central governance, and AI help that a person still approves (spec §4.1.1 and §4.1.3). | She sees the published global pages and knows which authoring steps happen in Pages. |

## 2. Chain of Pain (critical business issues, most painful first)
| id | Critical business issue | Felt by (audience ids) | Why / source of the issue | Evidence (quote) | stated / inferred | Impact / metric |
|---|---|---|---|---|---|---|
| c1 | Authoring and publishing across a global, multi-site, multi-language, multi-brand estate. | a2, a1 | Regions need autonomy with central governance, reuse, taxonomy and brand consistency. First live scenario, weight 25%. | "Show how the platform supports authoring and publishing across a global, multi-site, multi-language and multi-brand estate." (spec §4.1.1) | rfp | not given |
| c2 | Images, documents and other media have to be managed and reused. | a1 | Native DAM has to be separated from a separately licensed product. | "Distinguish native functionality from a separately licensed DAM product or third-party service." (spec §4.1.2) | rfp | not given |
| c3 | Authors need practical AI help with a person still reviewing. | a2 | Creation, metadata, taxonomy, translation or workflow, plus human approval. | "Demonstrate human review and approval, brand or knowledge grounding, controls, and auditability." (spec §4.1.3) | rfp | not given |
| c4 | Visitors need to find lawyers, expertise, locations and content. | a1, a2 | From conventional search through generated answers, and what is production-ready. | "Show how the platform supports visitors in finding and discovering relevant lawyers, expertise, locations and content." (spec §4.1.4) | rfp | not given |
| c5 | Content has to stay discoverable for SEO and AEO, under governance. | a2 | Author and administrator support. Dentons-specific SEO designs are not required. | "Dentons-specific designs or completed SEO/AEO recommendations are not required." (spec §4.1.5) | rfp | not given |
| c6 | Authors and marketers need a native view of performance and search insight. | a1 | What feeds enterprise reporting, and what needs external analytics. | "Show the native author and marketing view of site and content performance." (spec §4.1.6) | rfp | not given |
| c7 | A business user has to govern personalization and its fallback. | a1, a2 | The spec asks for this. The SE said at the start not to add personalization. | "Show how a business user creates and governs a personalized experience or experiment." (spec §4.1.7) | rfp | not given |

Discovery gaps:
- The spec does not name who scores the demo. The opportunity brief says the presentation is to Shane and Carly. Stephen, Jennifer and Michelle are named in the brief and are not planned as audience members.
- No Dentons quote in their own words (no transcript). Evidence is the spec and the Altudo brief.
- Generated AI answers, DAM, agentic workflows, analytics and personalization are not on the public site. They are not invented as pages.

### RFP requirements (only when an RFP exists; full list in `rfp-requirements.md`)
- Demo requirements the spec prescribes: seven live scenarios in this order — authoring and global experience (25%), DAM (7%), AI-assisted content operations (10%), search and expertise discovery (10%), SEO/AEO (5%), analytics (8%), personalization and experimentation (10%). Then four overview topics. About 90 minutes (10 / 70 / 10). Source: demo spec pages 1–3.
- How many requirements the demo covers: 24 requirements. 3 shown, 6 partly, 15 written-response only. The seven live scenarios are m1–m7 in the spec's order. Not shown in full: the authoring UI (m1), DAM admin (m2), the AI steps (m3), generated answers (m4), author SEO tools (m5), analytics (m6), personalization (m7, held until you confirm).

## 3. Message map (Command of the Message)
- Before: The spec says the RFI showed several platforms could support the modernization. This demonstration has to prove practical fit on seven scenarios, in one order.
- Required capabilities: Author and publish with governance. Reuse media and separate native DAM from a separate product. Give authors AI help with human review. Help visitors find lawyers, expertise, locations and content. Keep content discoverable. Show performance to authors. Let a business user govern personalization. Each item is a spec scenario.
- After: A walkthrough in the spec's order. The public site carries the visitor half.
- Metrics they will use: Spec weights — authoring 25%, AI operations 10%, search 10%, personalization 10%, analytics 8%, DAM 7%, SEO/AEO 5%. No Dentons cost figure is in the spec.
- Differentiators: The spec requires each scenario to say core licence, add-on, third party, custom or roadmap. The opportunity brief's licence argument is presenter context, not a page.
- Proof points: none in the demo spec.
- Why now: The October/November 2026 spec is the evaluation script.

## 4. Demo flow
Order: the spec's seven live scenarios, in the spec's order. Moment 1 is also last-thing-first for the top weighted issue (authoring): the published Global sectors page, before any editor.

| # | Moment | CBI | Audience | Annoyance → Afterward | Capability | Talk track | Must be visible on screen | Check-in question |
|---|---|---|---|---|---|---|---|---|
| m1 (WOW) | Authoring, workflow and global experience | c1 | a2, a1 | Regions need to publish without losing governance → a sector page stays on brand | Authoring and publishing across the estate | Open Home, then Global sectors. This is the published result. The editor is Pages. | Home and Global sectors | Is this the global experience you want regions to publish into? |
| m2 | Digital asset management | c2 | a1 | Media must be reused, and native DAM separated from another licence → the same photography is across the homepage | Reuse of published images | Stay on Home. Point at the hero and the cards. DAM admin is not a page. | Homepage images | Where do you still need the DAM conversation? |
| m3 | AI-assisted content operations | c3 | a2 | Authors need help, with a person still approving → Knowledge opens a published article | AI help for authors | The AI steps are not on the public site. Open Knowledge, then one article. | Knowledge and one article | Which AI steps do you need to see in Pages? |
| m4 | Search, expertise discovery and AI answers | c4 | a1, a2 | Visitors need one way to find a lawyer → search opens a profile | Conventional discovery | Home, then Our people, then Martin Abadi. Generated answers are not on the live site. | Header search, the directory, and Martin Abadi | Is people search enough, or do you need generated answers called out as absent? |
| m5 | SEO, AEO and content discoverability | c5 | a2 | Published content has to be findable → a program page is live | Discoverable published content | Home, then Client experience. The spec does not require an SEO design. | Client experience page | Is the published page enough, or do you need metadata controls in Pages? |
| m6 | Analytics, measurement and optimization | c6 | a1 | Authors need a native performance view → Home is what would be measured | Performance view for authors | No analytics screen is on the site. Say what would be measured and what needs external BI. | Home | Which numbers belong in the product? |
| m7 | Personalization and experimentation | c7 | a1, a2 | A business user needs to govern a personalized experience → not built, unless you confirm | Personalization, as specified | The spec scores this. You asked at the start not to add it. | Home, with no personalization rules | Should this scenario be added, or kept as a written response? |

- Recap: c1 Home and Global sectors (m1). c2 homepage images (m2). c3 Knowledge and one article, not the AI workflow (m3). c4 Our people, then Martin Abadi (m4). c5 Client experience (m5). c6 analytics named against Home (m6). c7 personalization not added until you confirm (m7).
- Walkthrough: follow spec §4.1.1 through §4.1.7. The opportunity brief's narrative (Pages, then AI search, then agentic ops, then personalization) is supporting context. Where it disagrees with the spec, the spec wins.

## 5. Site shape
- New site: new collection named Dentons, template Empty, site name Dentons (stated by the SE). Folder: `industry-verticals/dentons`.
- Confirmed page tree: proposed from the English header. Main menu (nav.json): Global sectors, Global solutions, Client experience, Our people. The hamburger also lists Knowledge, Featured insights, About Dentons, Global presence, Careers, Practices, Services & solutions, Events, Recognition, News.
- Mirrored: /Home, /Home/global-sectors, /Home/client-experience, /Home/our-professionals, /Home/insights, the first screen of insight articles, and the first screen of lawyer profiles as Person Page children of /Home/our-professionals.
- Stubs: Global solutions, Featured insights, and the other hamburger destinations. Load-more results and the rest of the directory use the same templates and are not copied.
- Pages assumed NOT needed: other languages (the demo is English). Login, cart, and a separate search-results page (the header keeps the search control). No personalization variants.
- Gaps raised and how they were resolved: www.dentons.com is a language picker. The English site is https://www.dentons.com/en. A cookie dialog covered the first homepage crops; section text still comes from the page. Personalization is not added.
- Languages: English only.

## 6. Brand
- Source URL: https://www.dentons.com/en
- Colors / fonts / logo: measured from the live site (purple actions, black header, Dentons Sans). Theme proposal follows the scrape.
- Tone of copy: the live site's copy. Nothing invented for mirrored pages.

## 7. Content
- Real vs. illustrative figures: estate figures and the 72-hour baseline are from the opportunity brief and are not printed on the site as new claims. Mirrored pages use the live copy. Stub pages are a title only (illustrative label, no fake body).
- Imagery: images from the live pages, uploaded to Content Hub when the build runs.

## 8. Constraints
- Demo date / time budget: spec suggests 90 minutes. The brief said Carly was away the week of 17 September 2026; that date has passed. No new date was given.
- Must-have components or integrations: the public header (logo, four links, language pill, search, hamburger) and the homepage bands.
- Must NOT show until you confirm otherwise: personalization rules (you asked for none at the start; spec §4.1.7 still scores them, moment m7). Unpublished Dentons design files (spec R-024). Site copy stays the live site's own words.
