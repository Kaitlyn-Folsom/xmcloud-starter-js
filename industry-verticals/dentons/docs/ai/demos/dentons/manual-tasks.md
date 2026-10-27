# Manual tasks — dentons

## Always (every demo)
- [ ] Add site thumbnail
- [ ] Add partial thumbnails
- [ ] Update layout icons (only if a NEW component was created, rather than new variants)

## Open (only what the tools could not do)
Core build work is never listed here: partial designs, page designs, templates, datasources, variants, theme, images, navigation flags and display names are BUILT by the run.
A line belongs here only as `- [ ] <what> — BLOCKED after 2 attempts: "<error text>"`, and only after both attempts were logged with `run-gate.mjs block`.

## Needs a person
(editing host, anything that needs a login or a device the tools cannot reach)

- [x] Editing host "dentons" was requested after login. It deploys from the repo and branch the project is linked to: push the code, then check the first build in Deploy.

## Missing assets
(written by the upload scripts: files too large for Experience Edge, with where they belong)

## Assumptions
Only decisions that the prospect's site, the transcript and the SE did not make. Never a statement about what the demo is or mirrors.

- Content Hub login returned HTTP 401 (two attempts: first with logo.ashx, second could not find the sniffed svg because the script left logo.ashx). Logo is not uploaded. The measured file is the Hong Kong SVG (`dentons-hong-kong-logo-rgb.ashx`): purple shape with white wordmark, which disappears on the white header. Confirm the global logo before it is attached.
- Header eyebrow styles used neutral defaults: header-styles.json has no eyebrow measurements.
- Navigation Filters folder is empty, so the main-menu filter is not set yet. Navigation on the header partial points at Home and the Dentons variant.
- Header LogoImage is empty until the logo upload succeeds.
- The measured footer is one row of legal links. The shared Footer has four columns, so the links are stored in Text1 and Text2 until the Dentons footer variant lays them out as one row.
- The visit rule and the experiment are not created in this environment.
