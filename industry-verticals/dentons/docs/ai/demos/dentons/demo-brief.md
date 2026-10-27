# Demo brief — Dentons

> RFP-led. Method: `harness/reference/demo-method.md`. Facts are *stated* (opportunity brief or 26 October prep notes, reporting what Dentons said), *rfp* (demo spec), or *inferred*. Gaps stay gaps.

## 1. Who and why
- Inputs used: `Dentons Website Modernization Demo Spec Oct2026.pdf` (rfp); `Altudo_Dentons_SitecoreAI_Opportunity_Brief.docx` (supporting); `Demo Prep sync with Altudo.docx` (supporting, internal prep recap, 26 October 2026); `Altudo_Dentons_Demo_Deck.pdf` (supporting, August 2026). No Gong transcript. SE request: prospect Dentons, website https://www.dentons.com/ (loads, redirects to `/en/`, title "Dentons - Home").
- Prospect / industry: Dentons, the world's largest law firm. Stated estate: about 20 domains, 35 sub-brands, 40,000 pages, 11 languages, 85 offices, 12,000+ lawyers, 82+ countries, 300+ authors. Current platform Sitecore XP 10.4 on Azure IaaS, licensed through December 2028.
- Competitors / incumbent platform: Incumbent is Sitecore XP. The other live platform contender is Optimizely (do not name them in the room; the brief says keep that comparison indirect). Coveo is the named search benchmark. Five RFI responses; the field is two platforms. Decision is before the RFP, GBT-led.
- Compelling event / why now: Platform decision before the RFP is released. The 26 October prep notes say the client demo is Friday and the dry run is Thursday at 9:00 a.m. Kaitlyn's time. Optimizely's demo is the following week (prep notes).
- Situation slide: Dentons is choosing the platform for dentons.com and the global estate before an RFP, and this session is the scored product demonstration. Shane (GBT) needs a SaaS story he can trust on cost, and Carly (content) needs to see publishing without a developer. The board's stated first priority is AI search, the scorecard's heaviest weight is authoring, and personalization must use on-platform signals rather than CRM. We will show the public site, then the Sitecore screen that produced each result, and label anything that is custom or still on the roadmap.

### Audience (AAA)
| id | Who (name, role) | Annoyance (what bugs them today) | Afterward (their day once solved) |
|---|---|---|---|
| a1 | Carly, content owner (recently took over the content team; the digital marketing director role was eliminated) | Routine updates depend on a content team. She wants drag-and-drop editing, fast publishing, BD updating bios, and lawyers previewing insights. She has rated design work as too cookie-cutter. | She, or a business user, edits an insight on the page, previews it, and publishes without a developer or a ticket. |
| a2 | Shane, GBT decision-maker | SaaS-first, and still wary of Sitecore economics. A past IaaS-versus-PaaS case showed only about $200K savings over five years and was overruled. He will test every claim, including why conversational search is not out of the box. | The estate runs as SaaS under one license, with AI included, and search is described as what works today versus what is still custom. |

## 2. Chain of Pain (critical business issues, most painful first)

Ranked for this session by the demo spec's order and weights, not by the board's priority list. The conflict is explicit under Discovery gaps: the opportunity brief says the board's first priority is AI search.

| id | Critical business issue | Felt by | Why / source of the issue | Evidence | Basis | Impact / metric |
|---|---|---|---|---|---|---|
| c1 | Publishing an insight still depends on a content team and a long handoff | a1 | Distributed authors, central governance, and the current XP editing model. Carly asked for no-code publishing | "Wants easy content operations: drag-and-drop components, streamlined workflows, fast publishing." Opportunity brief §3 | stated | A 72-hour update baseline is in the opportunity brief §7.2. The August deck labels similar figures as illustrative benchmarks. Confirm before quoting 72 hours in the room |
| c2 | Content operations do not scale without human review the firm can trust | a1 | Lawyers request practice-page updates; bulk problems include duplicates, broken links, stale items, and translations. Agentic AI is a stated priority for cost and efficiency | "Lead with search, AI and content ops." Opportunity brief §2.2, and the prep notes on lawyer page-update requests | stated | not given for Dentons. An AmLaw-20 reference (about 85% accuracy, about 200 hours a month) is a proof point, not their number |
| c3 | Clients and the board cannot reliably find lawyers, expertise, and offices through the site | a2 | The global board's top stated priority is AI search. The desired experience is persistent and conversational. It is not available out of the box | "AI / RAG-style search — the global board’s top priority." Opportunity brief §2.2. Prep notes: Shane asked why the platform does not provide that experience out of the box | stated | Search is about 10% of the scoring criteria (prep notes). No business cost given |
| c4 | Content is not reliably discoverable by AI answer engines | a1 | AEO is a stated priority behind search, agentic AI, and personalization. Thin or unstructured pages get skipped | "AEO — making content discoverable by AI answer engines." Opportunity brief §2.2 | stated | not given |
| c5 | The site cannot adapt to an anonymous visitor without a CRM project the firm does not want | a1, a2 | Personalization is wanted on platform signals (location, visit, service line, campaign, audience). CRM identity resolution was set aside | "They are less focused on building a unified customer view from CRM data." Prep notes | stated | Ranked below search and AI (opportunity brief §2.2). No metric given |

Discovery gaps:
- Confirm Friday's attendees. The September brief names Shane and Carly. The 26 October notes do not restate the room.
- Confirm whether "72 hours" is Dentons' figure or an illustrative benchmark. The brief states it; the deck marks similar numbers illustrative.
- Stephen (the brief) and Steven (the prep notes) are treated as one person. He guided the August demo, including "skip a live A/B." It is not confirmed that he is in Friday's room. The story still includes the experiment. The visit rule is not created in this environment yet.
- Jennifer's governance concern (shared structured data) is in the brief. It is not confirmed that she attends. m1 still shows a locked shared field.
- Which single language, if any, to show beside English. The estate has 11 languages; the public header shows EN, IT, FR, FR-CA, ES, DE, PL. This story stays in English.
- The main header measured by the nav script is four items: Global sectors, Global solutions, Client experience, Our people. Knowledge, Featured insights, About Dentons, Global presence, Careers, Practices, Services and solutions, Events, Recognition, News, and Contact us are in the hamburger panel, read from the live page. The language switcher is separate.

### RFP requirements
Full list: `rfp-requirements.md`. 29 rows.
- The spec prescribes a 90-minute scored demo, seven live scenarios in a fixed order, then questions. Overview topics (admin, hosting, integrations, roadmap) are leave-behinds, not live scenes. Do not use design files.
- Coverage: 25 shown, 0 partly, 4 written-response only. Written only: administration, hosting, extensibility, and roadmap (the spec says these are leave-behinds). The seven live scenarios are m1–m7.

## 3. Message map
- Before: dentons.com and a large multi-site estate run on Sitecore XP 10.4. Publishing waits on a content team, the board wants AI search the product does not ship as a conversational experience, and personalization must not become a CRM project.
- Required capabilities: business users publish an insight without a developer; a person still approves anything an agent drafts; visitors find expertise with the search that exists today, with a clear line around what is custom; authors can govern how a page is discovered; a marketer can change one block for an anonymous visitor using on-platform signals.
- After: Shane sees a SaaS estate with one license and an honest search story. Carly sees an insight she can edit, preview, and publish, and a homepage block that changes after a relevant visit.
- Metrics: not given as business KPIs. The session itself is scored (authoring 25%, AI operations 10%, search 10%, personalization 10%, analytics 8%, DAM 7%, admin 8%, hosting 7%, AEO 5%, extensibility 5%, roadmap 5%).
- Differentiators (Altudo's arguments in the opportunity brief, not Dentons quotes): SaaS rather than another infrastructure move; CMS, CDP, personalization, search, Agentic Studio, and DAM in one license with AI included; content and skills stay in the Sitecore family; Altudo already runs the estate.
- Proof points: AmLaw-20 reference in the opportunity brief (about 85% accuracy over four months, about 200 hours a month, human review kept). Altudo's prior SitecoreAI sessions on 7 and 21 August 2026. Neither is a Dentons production result.
- Why now: the platform decision is before the RFP; the client demo is Friday; the other platform presents the following week.

## 4. Demo flow

Opening (about 10 minutes, not a site moment): SaaS, what the license includes, XP 10.4 still capable, then into the site. This covers R-021 and the start of R-020, R-022, and R-023. Do not name Optimizely. Do not open with a client portal.

Three tell-show-tell loops. The seven live scenarios stay in spec order inside the loops. Moment 1 is the finished insight (last thing first for c1).

| Loop | Spec | CBI | Audience | Tell | Show | Tell | Check-in |
|---|---|---|---|---|---|---|---|
| 1 (WOW) | 4.1.1, 4.1.2, 4.1.3 | c1, c2 | a1, a2 | The research, the words, the image, and the review all wait on the content team | The live infrastructure article | Agentic Studio from a market signal, a person approves the draft and the website channel, then the page builder: edit, add the library image, publish through workflow | Is this the publishing loop you want: research, approve the draft and the channel, then review the page and publish through a person? |
| 2 | 4.1.4, 4.1.5 | c3, c4 | a2, a1 | Conversational search is not in the box, and thin pages get skipped | Search results for infrastructure, then the article's title, summary, and links | Today's search, with generated answers labeled. Then the metadata fields. Scrunch is an add-on | Does this draw the right line on search, and are these the fields authors should own? |
| 3 | 4.1.6, 4.1.7 | c4, c5 | a1, a2 | See whether the insight is working before changing the homepage | The article, then the homepage block that matches that visit, default still available | Author performance view, then the visit rule, an experiment, and the fallback. No CRM. The visit rule is not created in this environment yet | Is a visit to a practice topic a signal you would use, once you can see the page performing? |

**Click path**

| Loop | Step | Page | What is clicked | What must be visible |
|---|---|---|---|---|
| 1 | 1 | /Home | start | Homepage |
| 1 | 2 | /Home/insights | Knowledge in the menu | Insight listing |
| 1 | 3 | /Home/insights/structuring-bankable-infrastructure-investment-across-africa | the infrastructure article | The full article |
| 2 | 1 | /Home | start | Search in the header |
| 2 | 2 | /Home/search-results | Search, submit infrastructure | Results for this topic |
| 2 | 3 | /Home/insights | Knowledge in the menu | Insight listing |
| 2 | 4 | the infrastructure article | the article | Title, summary, related links |
| 3 | 1 | /Home | start | Default homepage block |
| 3 | 2 | /Home/insights | Knowledge in the menu | Listing |
| 3 | 3 | the infrastructure article | the article | The visit that triggers the change. Analytics opens on this page |
| 3 | 4 | /Home | the logo | The featured block matches that topic; the default remains |

- Recap: loop 1 covers the market signal, the approved draft, the website channel, the page builder, the library image, and a person on the publish. Loop 2 covers today's search and the metadata on that article. Loop 3 covers the author performance view, then one homepage block after the visit, a test, and no CRM. The visit rule is not created in this environment yet.
- Walkthrough: three loops, spec order kept inside each loop. The opening 10 minutes still carries SaaS, license, admin, integrations, and roadmap.

## 5. Site shape
- New site: collection **Legal** (new; it is not one of the collections already in this environment), template **Empty**, site name **Dentons**. Folder: `industry-verticals/dentons`.
- Page tree: not planned until the story is approved. Click-path pages that will be built in full: Home, Knowledge (`/insights`), the infrastructure article, and search results. Other menu items become navigation stubs unless you say you will click them.
- Languages: English (`en`).
- Must not show: Optimizely by name, design files or Figma, a generic non-legal demo, CRM identity, a client portal as the headline, visible code or configuration, a fake conversational-search chat presented as shipping product.

## 6. Brand
- Source URL: https://www.dentons.com/en/
- Colors / fonts / logo: extract from the URL after the story is approved.
- Tone: global law firm. Formal, plain, no invented case results.

## 7. Content
- Real copy and images come from the public pages on the click path. The August deck's "72 hrs / 5+ handoffs / 80+ offices" slide is labeled illustrative there; do not treat it as Dentons fact unless you confirm the 72-hour baseline.
- The personalization rule (this topic, this block) is part of the story. It is not created in this environment yet.

## 8. Constraints
- Demo date / time budget: Friday client demo, 90 minutes, dry run Thursday 9:00 a.m. Kaitlyn's time (26 October prep notes). Sitecore presents; Altudo listens.
- Must-have: three tell-show-tell loops covering spec 4.1.1–4.1.7 in that order. No CRM. The visit rule is not created in this environment yet.
- Must not: see section 5.
