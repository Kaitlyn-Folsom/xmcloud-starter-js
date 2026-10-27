# Story plan — dentons

Show this on the approval screen. Method: harness/reference/demo-method.md

## Situation slide
Dentons is choosing the platform for dentons.com and the global estate before an RFP, and this session is the scored product demonstration. Shane in GBT needs a SaaS story he can trust on cost, and Carly, who owns content, needs to see publishing without a developer. The board's stated first priority is AI search, the scorecard's heaviest weight is authoring, and personalization must use on-platform signals rather than CRM.

## Chain of Pain
| CBI | Critical business issue | Felt by | Why / source | Evidence | Basis | Impact |
|---|---|---|---|---|---|---|
| c1 Publishing speed | Publishing an insight still depends on a content team and a long handoff | Carly, content owner | Distributed authors and the current XP editing model. Carly asked for no-code publishing | Wants easy content operations: drag-and-drop components, streamlined workflows, fast publishing. | stated | A 72-hour baseline is in the opportunity brief; the August deck labels similar figures illustrative. Confirm before quoting it |
| c2 Trusted content ops | Content operations do not scale unless a person still reviews the draft | Carly, content owner | Lawyers request practice-page updates, and agentic AI is a stated priority for cost and efficiency | Lead with search, AI and content ops. | stated | not given |
| c3 Expertise discovery | The board wants visitors to find lawyers, expertise, and offices through conversational search the product does not ship | Shane, GBT decision-maker | AI search is the global board's top stated priority, and Shane asked why it is not out of the box | AI / RAG-style search — the global board's top priority. | stated | Search is about 10% of the scoring criteria. No business cost given |
| c4 Discoverability | Content is not reliably discoverable by AI answer engines | Carly, content owner | AEO is a stated priority, behind search and agentic AI | AEO — making content discoverable by AI answer engines. | stated | not given |
| c5 Anonymous relevance | The site cannot adapt to an anonymous visitor without a CRM project the firm does not want | Carly, content owner; Shane, GBT decision-maker | They want location, visit, service line, and campaign signals, and they do not want CRM identity resolution | They are less focused on building a unified customer view from CRM data. | stated | Ranked below search and AI. No metric given |

## Audience (AAA)
| Audience | Annoyance | Afterward |
|---|---|---|
| Carly, content owner | Routine updates still depend on a content team, and she wants drag-and-drop publishing without a developer | She edits an insight on the page, previews desktop and mobile, and publishes it herself |
| Shane, GBT decision-maker | He is SaaS-first and still wary of Sitecore economics after a past case showed only about $200K of savings over five years | He sees one SaaS license and an honest line between search that works today and conversational search that does not |

## Message map
- Before: dentons.com runs on Sitecore XP 10.4. Publishing waits on a content team, the board wants conversational search the product does not ship, and personalization must not become a CRM project.
- Required capabilities: A business user publishes an insight without a developer; A person still approves anything an agent drafts; Visitors find expertise with today's search, with a clear line around what is custom; Authors govern how a page is discovered; A marketer changes one block for an anonymous visitor from a page visit
- After: Shane sees a SaaS estate and an honest search story. Carly sees an insight she can edit and a homepage block that changes after a relevant visit.
- Metrics: not given as business KPIs; the session is scored, with authoring at 25%
- Differentiators: SaaS, with CMS, CDP, personalization, search, Agentic Studio, and DAM in one license and AI included; Content and authoring skills stay in the Sitecore family
- Proof points: AmLaw-20 reference in the opportunity brief: about 85% accuracy over four months and about 200 hours a month, with human review. Not a Dentons result
- Why now: Platform decision before the RFP. Client demo Friday. The other platform presents the following week.

## Demo flow (last thing first)
| # | Moment | CBI | Audience | Annoyance → Afterward | Capability | Must be visible | Check-in |
|---|---|---|---|---|---|---|---|
| m1 (WOW) | Publish the insight | c1 Publishing speed, c2 Trusted content ops | a1, a2 | An insight waits on the content team, and the image and the draft sit in that same queue → She researches the topic, approves the draft and the channel, then reviews the page, adds the image, and a person publishes it | Research and drafting with a human at every step, then page review, the library image, and workflow publish | The live infrastructure article, then Market Signals, the approved draft, the approved website channel, the page builder edits, the library image, and the workflow approval | Is this the publishing loop you want: research, approve the draft and the channel, then review the page and publish through a person? |
| m2 | Find the insight, then see why it can be cited | c3 Expertise discovery, c4 Discoverability | a2, a1 | The board wants a conversational answer the product does not ship, and thin pages get skipped by answer engines → A visitor finds the insight with today's search, and the page's title, summary, and links are fields an author governs | Search and expertise discovery, then governed discoverability | Search results for infrastructure, then the article's title, summary, and related links, then search configuration and the metadata fields | Does this draw the right line between today's search and a generated answer, and are these the fields authors should own? |
| m3 | Measure the insight, then change the homepage | c4 Discoverability, c5 Anonymous relevance | a1, a2 | Marketers cannot see whether an insight is working, and relevance would require a CRM feed they will not connect → She sees this page's performance, then one homepage block follows the visit, with a test and a fallback | Analytics on the insight, then personalization and experimentation | The article, the author performance view, then the homepage block after the visit, the experiment, and the default fallback | Is a visit to a practice topic a signal you would use, once you can see the page performing? |

## Click path and show → reveal, per moment

### m1 (WOW, last thing first): Publish the insight
- **Show first (front end):** The live article Structuring bankable infrastructure investment across Africa, with its headline, body, practice tags, and image, as a visitor sees the finished page
- **Then reveal (how it is built):** Tell the path in this order, and keep a person on every step. Scenario 4.1.3 starts in Agentic Studio: a market signal on infrastructure is the research, she accepts it, and the draft is proposed for review before anything is saved. She can apply, skip, or decline. Metadata and a translation hold stay on that same review. The brand kit grounds the draft. The tool list is the audit. The Asana connector is partner customization and is not this path. She then approves the website as the channel. The agent can name other channels, and a person decides which ones are created. Scenario 4.1.1 is the page builder: she updates the draft, drags a component, checks desktop and mobile, and sets the practice tags. A role that cannot edit a locked shared field is the central governance. Scenario 4.1.2 is the image she adds there, from the library, included in the license. Publish goes through workflow. A person approves it. The agent does not publish. No code on screen.
- **Talk track:** Tell: today this page waits on a content team, for the research, the words, the image, and the review. Show: here it is, already live. Tell: a market signal started the research, she approved the draft and the website channel, then in the page builder she changed the copy, added the library image, and a person published it.
- **Click path:**
  1. /Home
  2. /Home/insights (click: Knowledge in the menu)
  3. /Home/insights/structuring-bankable-infrastructure-investment-across-africa (click: Structuring bankable infrastructure investment across Africa)
- **Check-in:** Is this the publishing loop you want: research, approve the draft and the channel, then review the page and publish through a person?

### m2: Find the insight, then see why it can be cited
- **Show first (front end):** Search results for infrastructure, then the same article with its title, summary, and related links
- **Then reveal (how it is built):** Tell the line, in spec order. Scenario 4.1.4: this is site search that is production-ready today. Generated or conversational answers are custom or roadmap, and Coveo may be named as the benchmark. Scenario 4.1.5: the metadata fields on that article. A GEO check can be a native agent skill. Scrunch is an add-on and is not in this site.
- **Talk track:** Tell: Shane asked why conversational search is not in the box, and Carly needs pages an answer engine can use. Show: a visitor searches infrastructure and opens this insight. Tell: that search is what ships today, and the title, summary, and links are fields her team governs.
- **Click path:**
  1. /Home
  2. /Home/search-results (search: infrastructure)
  3. /Home/insights (click: Knowledge in the menu)
  4. /Home/insights/structuring-bankable-infrastructure-investment-across-africa (click: Structuring bankable infrastructure investment across Africa)
- **Check-in:** Does this draw the right line between today's search and a generated answer, and are these the fields authors should own?

### m3: Measure the insight, then change the homepage
- **Show first (front end):** The infrastructure article a visitor just read, then the homepage, where the featured block now matches that topic and the default is still available
- **Then reveal (how it is built):** Tell the two screens, in spec order. Scenario 4.1.6 first: the native author view of this article and of the infrastructure search. Enterprise reporting still needs external BI, and that is called out. Scenario 4.1.7 next: Pages, Personalize on the homepage block, the visit rule, an experiment on that block, and the default fallback. No CRM. The visit rule is told in the room. It is not created in this environment yet.
- **Trigger:** a visit to the infrastructure insight
- **Talk track:** Tell: before we change the homepage, look at whether this insight is earning the visit. Show: they read it, and the homepage block followed, with the default still there. Tell: that performance view is the author screen, and the block is a visit rule she can test or turn off.
- **Click path:**
  1. /Home
  2. /Home/insights (click: Knowledge in the menu)
  3. /Home/insights/structuring-bankable-infrastructure-investment-across-africa (click: the article)
  4. /Home (click: the logo)
- **Check-in:** Is a visit to a practice topic a signal you would use, once you can see the page performing?

## Recap
c1 Publishing speed and c2 Trusted content ops: loop 1 showed the live insight, then the market signal, the approved draft, the website channel, the page builder, the library image, and a person on the publish. c3 Expertise discovery and c4 Discoverability: loop 2 showed infrastructure search and the metadata on that article, with generated answers labeled custom or roadmap. c5 Anonymous relevance: loop 3 showed the author view of that page, then one homepage block after the visit, a test, and no CRM. The visit rule is not created in this environment yet.
