# Gallagher — Build Plan

> **Source:** https://www.ajg.com
> **Analyzed:** 26 Aug 2026 (updated: Promo CTA for sections 5–7)
> **Sections:** 15 (15 template, 0 custom)
> **Library:** Financial/PLAY components already on this site — not the unused UIIM catalog
> **Content root:** `/sitecore/content/finance/gallagher`

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | *White header with Gallagher wordmark, Who We Are / What We Do / Industries / Insights, search, navy CTA* | Header | WithLogoImage | High | Already on the Header partial — do not add via API |
| 2 | *Split hero — “Your Trusted Partner for Insurance & Consulting” + office photo + two CTAs* | Hero Banner | Default | High | Split layout. Skip overlay Hero |
| 3 | *Centered intro: “Forge ahead knowing Gallagher helps you face any risk…”* | Heading CTA | Centered | High | |
| 4 | *Four metrics: 95+ years, 130+ countries, 1,116 offices, $13.8B revenue* | Four Column CTA | Default | High | Already on Home — rewire. Custom variant for number-only stats |
| 5 | *Insurance and Risk Management heading + copy + View all* | Promo CTA | Gallagher | High | Rewire existing. Shared service-pillar variant with #6 |
| 6 | *Benefits and Human Resources Consulting heading + copy + View all* | Promo CTA | Gallagher | High | Rewire existing. Same Gallagher variant as #5 |
| 7 | *The Gallagher Way + Pat Gallagher portrait with play button* | Promo CTA | GallagherVideo | High | Rewire existing. Distinct video variant with play overlay |
| 8 | *Insights heading* | Heading CTA | Compact | High | |
| 9 | *Featured insight — large horizontal article card* | Promo CTA | Gallagher | High | New instance (the three on Home are used for 5–7) |
| 10 | *Two smaller insight cards* | Two Column CTA | Default | High | New instance |
| 11 | *“Gallagher's Solutions for Your Industry” heading* | Heading CTA | Compact | High | |
| 12 | *Icon row: Construction, Education, Healthcare, Public Sector, Real Estate* | Five Column CTA | Default | Medium | Already on Home. Sixth industry needs a custom variant |
| 13 | *Two large tiles — Careers at Gallagher / Merge with Gallagher* | Two Column CTA | Default | High | Already on Home — rewire. Overlay tiles need a custom variant |
| 14 | *Centered “Start your journey today” + Find an office button* | Heading CTA | Centered | High | |
| 15 | *Navy footer with logo, four link columns, socials, legal* | Footer | Default | High | Already on the Footer partial — populate datasource only |

---

## Sections that need attention

> [!WARNING]
> These sections match a template but will look generic unless we add custom variants in Phase 5.5.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | *Four large stats* | Four Column CTA expects images and links | Custom `Gallagher` variant: big numbers + labels only |
| 5–6 | *Service pillars* | Default Promo CTA has dotted accents and a large display heading | Shared custom `Gallagher` Promo variant |
| 7 | *CEO video* | Needs a play-button overlay the service-pillar variant should not have | Custom `GallagherVideo` Promo variant + manual video upload |
| 12 | *Six industry icons* | Five Column CTA only has five slots | Custom `Gallagher` variant for six icons, or drop Transportation |
| 13 | *Full-bleed career tiles* | Default Two Column CTA puts text under the image | Custom `GallagherTiles` overlay variant |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | Only export that renders a logo image field |
| 3, 14 | Heading CTA | Centered | Intro line and pre-footer CTA are centered |
| 5, 6, 9 | Promo CTA | Gallagher | Shared service/article promo chrome — no dotted accents |
| 7 | Promo CTA | GallagherVideo | Same Promo fields, plus a circular play overlay on the portrait |
| 8, 11 | Heading CTA | Compact | Section titles without a large display treatment |
| 15 | Footer | Default | Four link columns match the screenshot (WithSocials only has two) |

---

## Components by type

### Will be added or rewired automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero Banner | Simple (1 item) |
| 3 | Heading CTA (intro) | Simple (1 item) |
| 4 | Four Column CTA (stats) | Simple (1 item) — rewire existing |
| 5 | Promo CTA (Insurance) | Simple (1 item) — rewire existing |
| 6 | Promo CTA (Benefits) | Simple (1 item) — rewire existing |
| 7 | Promo CTA (Gallagher Way) | Simple (1 item) — rewire existing |
| 8 | Heading CTA (Insights) | Simple (1 item) |
| 9 | Promo CTA (featured insight) | Simple (1 item) — new |
| 10 | Two Column CTA (insight cards) | Simple (1 item) |
| 11 | Heading CTA (industries) | Simple (1 item) |
| 12 | Five Column CTA | Simple (1 item) — rewire existing |
| 13 | Two Column CTA (Join Gallagher) | Simple (1 item) — rewire existing |
| 14 | Heading CTA (Find an office) | Simple (1 item) |

### Must be placed / edited on partials

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Header | Header partial | Update logo datasource; custom variant optional |
| 15 | Footer | Footer partial | Populate footer datasource; custom variant optional |

### Custom components needed

None — all sections matched template components. Pixel-perfect work is variant-level (Phase 5.5), not new templates.

---

## Leftovers on Home (manual cleanup)

The current Home page is still the PLAY Financial demo. After assembly, remove:

- Carousel
- Comparison (2, nested in Two Column CTA placeholders)
- Three Column CTA
- Article List
- Documents List
- App Promo

---

## Build Order

```
Phase 1 — Sitecore content (create Gallagher datasource items under /sitecore/content/finance/gallagher/Data):
  1. Hero Banner
  2. Heading CTA × 4
  3. Four Column CTA (rewire)
  4. Promo CTA × 4 (3 rewire for Insurance / Benefits / Gallagher Way, 1 new featured insight)
  5. Two Column CTA × 2 (1 new, 1 rewire)
  6. Five Column CTA (rewire)
  7. Header logo + Footer (partials)

Phase 2 — Apply theme (Gallagher Dark Blue #00263E + Montserrat on .site-financial)

Phase 3 — Custom components: none

Phase 5.5 — Custom Gallagher variants (if you want pixel-perfect)
```

---

## Theme (for review)

| Token | Value |
|-------|--------|
| Dark Blue (primary / footer) | `#00263E` |
| Primary Blue (accent) | `#6FACDE` |
| Mid Blue | `#0075BC` |
| Page background | `#FFFFFF` |
| Type | Gotham Narrow → **Montserrat** (Google Fonts) |
| Corners | `4px` (not the starter's 1rem) |

Code changes will go in `industry-verticals/gallagher` (`_colors.scss` + font load). Content items will go under `/sitecore/content/finance/gallagher`.

Content Hub image upload will use the verified `fols-ch` sandbox (the Gallagher example host returned 401).

---

## Approval Questions

1. **Does the build plan look correct? Approved to proceed?**
2. **Do you want pixel-perfect custom variants for each component (Phase 5.5), or are the generic template variants sufficient?**

> Reply "approved" to proceed, or describe any changes needed.
