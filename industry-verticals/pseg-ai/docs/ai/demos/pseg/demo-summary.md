# PSEG — Demo Build Summary

> **Client:** PSEG
> **Source:** https://nj.pseg.com/
> **Built:** 2026-08-17
> **Page:** /sitecore/content/Financial/ProsperaFinancial/Home

---

## Build Overview

| Metric | Count |
|--------|-------|
| Template components used | 12 |
| Custom components built | 0 (variants only) |
| Custom variants created | 10 |
| Datasource items created | 16 (11 parents + 5 carousel slides) |
| Fields populated | 48+ |
| Images uploaded | 19 / 19 |

---

## Component Inventory

| # | Component | Variant | Datasource | Status |
|---|-----------|---------|------------|--------|
| 1 | Eyebrow | UtilityBar | _context-only_ | ⚠️ Manual on header partial |
| 2 | Four Column CTA | Pseg | PSEG - Header Shortcuts `239a21be-4b1b-42d8-ae3d-78a62274a844` | ⚠️ Needs assembly |
| 3 | Navigation | Default | _context-only_ | ✅ On page |
| 4 | Carousel | Pseg | PSEG - Home Carousel `f6f6f52a-13a5-47bf-8861-f0a552473569` | ⚠️ Needs assembly |
| 5 | Five Column CTA | Pseg | PSEG - Welcome Tabs `1386e4b2-4a15-429b-826d-2e9c6b95a1ca` | ⚠️ Needs assembly |
| 6 | Two Column CTA | Pseg | PSEG - MyAlerts MyMeter `3bb0eaf3-36ac-4bd7-b5ac-5fca11de20d3` | ⚠️ Needs assembly |
| 7 | Promo CTA | PsegOverlay | PSEG - Business Needs `01e839f7-04dd-4d79-a209-a1d06cc15da1` | ⚠️ Needs assembly |
| 8 | Heading CTA | Pseg | PSEG - WorryFree Heading `8cda7068-a66f-4a98-bd02-034da8d90c9d` | ⚠️ Needs assembly |
| 8 | Three Column CTA | Pseg | PSEG - WorryFree Cards `aecf2e4c-a372-4fa4-963d-75b540803f3c` | ⚠️ Needs assembly |
| 9 | Promo CTA | Pseg | PSEG - Make an Appointment `400d28f2-baff-4315-8dd7-5aab4487c9a9` | ⚠️ Needs assembly |
| 10 | CTA Banner | Pseg | PSEG - Save Energy `486e167e-6f17-4638-be66-5f5b709457df` | ⚠️ Needs assembly |
| 11 | Promo CTA | PsegImageLeft | PSEG - In the Community `6b499e60-82f6-409d-bdf1-8dd4d4af8307` | ⚠️ Needs assembly |
| 12 | Promo CTA | Pseg | PSEG - Storm Preparation `3926fafb-f074-41f2-83b3-6bd19570fcad` | ⚠️ Needs assembly |
| 13 | Footer | Default | _context-only_ | ✅ On page |

Presentation APIs returned 404 (no rendering host). Content and variants are ready; wiring is in `manual-tasks.md`.

---

## Theme

| Property | Value |
|----------|-------|
| Primary color | `#1b3054` |
| Heading font | Open Sans |
| Body font | Open Sans |
| Delivery method | `site-pseg` SCSS + `--brand-*` on `.site-pseg` |
| Google Fonts | Already imported in `_fonts.scss` |

Restart the Next.js app to pick up the new homepage SCSS and named exports.

---

## Image Upload Summary

**Content Hub:** `https://pseg.sitecoresandbox.cloud`

| Result | Count |
|--------|-------|
| Uploaded + approved | 19 |
| Failed | 0 |
| **Total** | **19** |

All image fields on the new datasources are set.

---

## Manual Tasks

See `manual-tasks.md` and `variant-checklist.md`. The remaining work is Pages-editor assembly: assign the new datasources, pick the `Pseg*` variants, add Heading CTA / Save Energy / Storm if they are not already on Home, and hide leftover Comparison / Article List / App Promo blocks.
