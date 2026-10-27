# Demo script — Dentons

Situation: Dentons is choosing the platform for dentons.com and the global estate before an RFP. Shane (GBT) needs a SaaS story he can trust. Carly (content) needs publishing without a developer. Do not name the other platform. The visit rule is told in the room and is not created in this environment yet.

Local pages are served from the Dentons app (`npm run dev` in `industry-verticals/dentons`).

## Loop 1 — Authoring, DAM, AI operations

Tell: The research, the words, the image, and the review all wait on the content team.

| Step | Page | Click | Must be visible |
|---|---|---|---|
| 1 | http://localhost:3000/ | start | Homepage |
| 2 | http://localhost:3000/insights | Knowledge | Insight listing |
| 3 | http://localhost:3000/insights/structuring-bankable-infrastructure-investment-across-africa | the infrastructure article | The article |

Show: the live infrastructure article, then Agentic Studio from a market signal. A person approves the draft and the website channel, then the page builder: edit the copy, add the library image, and publish through workflow. A person is on every step.

Check-in: Is this the publishing loop you want: research, approve the draft and the channel, then review the page and publish through a person?

## Loop 2 — Search, SEO and AEO

Tell: Conversational search is not in the box, and thin pages get skipped.

| Step | Page | Click | Must be visible |
|---|---|---|---|
| 1 | http://localhost:3000/ | start | Search in the header |
| 2 | http://localhost:3000/search-results | Search, submit infrastructure | Results for this topic |
| 3 | http://localhost:3000/insights | Knowledge | Insight listing |
| 4 | the infrastructure article | the article | Title, summary, related links |

Show: today's search, with generated answers labeled as custom or roadmap. Then the metadata fields on the article. Scrunch is an add-on. Coveo may be named.

Check-in: Does this draw the right line on search, and are these the fields authors should own?

## Loop 3 — Analytics, then personalization and an experiment

Tell: See whether the insight is working before changing the homepage.

| Step | Page | Click | Must be visible |
|---|---|---|---|
| 1 | http://localhost:3000/ | start | Default homepage |
| 2 | http://localhost:3000/insights | Knowledge | Listing |
| 3 | the infrastructure article | the article | The visit that would trigger the change |
| 4 | http://localhost:3000/ | the logo | The homepage. The visit rule is described, not built |

Show: the author performance view, then the visit rule, an experiment, and the fallback. No CRM. Do not open a personalization component, a variant rule, or an experiment item. Those are not in this environment yet.

Check-in: Is a visit to a practice topic a signal you would use, once you can see the page performing?

## Recap

Loop 1 is the market signal, the approved draft, the website channel, the page builder, the library image, and a person on the publish. Loop 2 is today's search and the metadata on that article. Loop 3 is the author performance view, then one homepage block after the visit, a test, and no CRM.
