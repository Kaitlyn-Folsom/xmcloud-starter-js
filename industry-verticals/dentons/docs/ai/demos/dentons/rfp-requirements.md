# Dentons demo requirements

Source: `Dentons Website Modernization Demo Spec Oct2026.pdf` (kind: rfp). 5 pages. This is Dentons' short-form product demo specification and scoring guide (October/November 2026), not a commercial RFP. The scoring sheet on pages 4–5 repeats the same 11 assessment areas and is not counted again.

Supporting context (not a second requirements list): `Altudo_Dentons_SitecoreAI_Opportunity_Brief.docx`.

**24 requirements.** Coverage below is the plan for this site build: a skinned copy of the public English site, with no personalization added (stated by the SE).

| id | Requirement | Source | Category | Weight | Coverage |
|---|---|---|---|---|---|
| R-001 | Show authoring and publishing across a global, multi-site, multi-language, multi-brand estate: regional autonomy with central governance, reuse, taxonomy, reference data and brand consistency. | PDF p2 §4.1.1 | DEMO | 25% | partly — m1, /Home → /Home/global-sectors, the published estate. Live authoring and workflow are Pages, not a public page. |
| R-002 | Show management and reuse of images, documents and other media, and say what is native versus a separate DAM. | PDF p2 §4.1.2 | DEMO | 7% | partly — m2, published images on /Home. DAM administration is not a public page. |
| R-003 | Show practical AI help for authors (creation, metadata, taxonomy, translation or workflow) with human review, and distinguish included use from extra consumption. | PDF p2 §4.1.3 | DEMO | 10% | partly — m3, /Home → /Home/insights → /Home/insights/balancing-innovation-and-competition. The published article is the output. The AI steps themselves are not a public page. |
| R-004 | Show how a visitor finds lawyers, expertise, locations and content, from ordinary search through semantic or generated answers where that exists today. | PDF p2 §4.1.4 | DEMO | 10% | partly — m4, /Home → /Home/our-professionals → /Home/our-professionals/martin-abadi, plus the header search. Generated AI answers are not on the public site and are not added. |
| R-005 | Show how authors and administrators support SEO, AEO and content discoverability, and how that is governed. Dentons design recommendations are not required. | PDF p2 §4.1.5 | DEMO | 5% | partly — m5, /Home → /Home/client-experience. Author SEO tools are not a public page. |
| R-006 | Show the author or marketer view of performance, search insight, and experimentation or personalization results, and what needs external analytics. | PDF p2 §4.1.6 | DEMO | 8% | written response only — m6 names Home as the content that would be measured. The analytics screen is not a public page. |
| R-007 | Show a path from geography and anonymous behaviour to audience experiences: a business user creates and governs a personalized experience or experiment, sees results, and controls the fallback. | PDF p2 §4.1.7 | DEMO | 10% | written response only — m7. The spec requires it. The SE said not to add personalization at the start. Nothing is added unless they confirm it at approval. |
| R-008 | Explain administration, security, monitoring and operations for a global estate. | PDF p3 §4.2.1 | technical | 8% | written response only — the spec puts this in the opening overview, not a detailed live demo. |
| R-009 | Explain hosting and delivery: what the subscription includes and what is separate infrastructure or licensing. | PDF p3 §4.2.2 | technical | 7% | written response only — overview, not a page. |
| R-010 | Explain integrations and how supporting services can be connected or replaced. | PDF p3 §4.2.3 | technical | 5% | written response only — overview, not a page. |
| R-011 | Highlight roadmap themes and separate generally available capability from announced or planned capability. | PDF p3 §4.2.4 | other | 5% | written response only — overview, not a page. |
| R-012 | Run about 90 minutes: about 10 minutes of platform context, about 70 minutes for the seven live scenarios (about 10 minutes each), about 10 minutes for questions and differentiators. | PDF p1 §3 | DEMO | | written response only — session shape for the presenter. The site supports the visitor half of the scenarios that can be shown. |
| R-013 | Use scenarios that fit a global, multi-site, multi-language professional-services site and distributed content teams. | PDF p1 principles | DEMO | | shown — the mirrored pages are the public Dentons site. |
| R-014 | Demonstrate the actual experience. Label anything that is concept, roadmap, partner customization or a third party. | PDF p1 principles | DEMO | | shown — the site is the live public experience. Platform items that are not on that site stay in the written response. |
| R-015 | For each scenario, say whether it is native, configured, licensed separately, integrated or custom-built. | PDF p1 principles | other | | written response only — a presenter callout, not a page. |
| R-016 | Where it matters, show both the visitor experience and the author or administrator experience. | PDF p1 principles | DEMO | | partly — this build is the visitor site. The author side is Pages, not a public page. |
| R-017 | Keep the same scenario order. Extra differentiators come at the end. | PDF p1 principles | DEMO | | written response only — presenter order. Moment 1 on the site is still the discovery outcome (last thing first). |
| R-018 | For every scenario, say whether it is in the core licence, an add-on, a third party, custom, or roadmap, and the pricing unit if it is not core. Detailed pricing is not required. | PDF p3 callout | commercial | | written response only — presenter callout. |
| R-019 | Answer: what did we just see that is available in the proposed product today? | PDF p3 §5 | other | | written response only — question for the presenter. |
| R-020 | Answer: what additional products, SKUs, credits or third-party services are required? | PDF p3 §5 | commercial | | written response only — question for the presenter. |
| R-021 | Answer: what implementation or configuration effort is required before Dentons could use it? | PDF p3 §5 | technical | | written response only — question for the presenter. |
| R-022 | Answer: what would a typical Dentons author or administrator need to learn or do differently? | PDF p3 §5 | other | | written response only — question for the presenter. |
| R-023 | Answer: what are the material limitations, scale considerations or dependencies? | PDF p3 §5 | technical | | written response only — question for the presenter. |
| R-024 | Do not reference Dentons design concepts, design-system materials, Figma files, prototypes or recommendations. | PDF p3 note | other | | shown — the build copies the public website only. |

Coverage roll-up: **3 shown** (R-013, R-014, R-024), **6 partly** (R-001, R-002, R-003, R-004, R-005, R-016), **15 written-response only**.

Mandatory live scenarios that are not shown in full, and why:

- R-001 authoring and workflow (25%, m1): the public site shows Global sectors as the published result. The editor is Pages.
- R-002 DAM (7%, m2): homepage images only. DAM administration is not a public page.
- R-003 AI-assisted content operations (10%, m3): Knowledge and one article are the published output. The AI steps are not a public page.
- R-004 generated AI answers (part of the 10% search scenario, m4): people search opens Martin Abadi. Generated answers are not on the public site and are not added.
- R-005 author SEO controls (5%, m5): Client experience is the published page. Author tools are not a public page.
- R-006 analytics (8%, m6): not a public page.
- R-007 personalization and experimentation (10%, m7): the spec requires it. The SE said not to add it at the start. Nothing is added unless they confirm it.
