# Michigan State University — Build Plan

> **Source:** https://msu.edu
> **Analyzed:** 25 Aug 2026
> **Sections:** 15 (15 template, 0 custom)
> **Library:** Financial/PLAY components already on this site — not the unused UIIM catalog

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | *Solid green header with the MSU wordmark, search, and About / Admissions / Academics / Research / Campus Life / Athletics* | Header | WithLogoImage | High | Already on the Header partial — do not add via API |
| 2 | *Full-bleed photo of students with Sparty, large white “BE A SPARTAN”, Apply Today button* | Hero | Default | High | Hero is the overlay component. HeroBanner is a split layout — skip it |
| 3 | *Small uppercase heading “FUTURE SPARTANS, WE'RE HERE FOR YOU”* | Heading CTA | Compact | High | |
| 4 | *Three image-top cards: majors, request info, visit campus* | Three Column CTA | Default | High | One instance already on Home — rewire it |
| 5 | *“LATEST NEWS” heading* | Heading CTA | Compact | High | |
| 6 | *Three news cards with photos, headlines, and Read more* | Three Column CTA | Default | High | |
| 7 | *Mosaic of Beaumont Tower, statue, green “Top 50 / Top 30” tiles, Spartan helmet* | Stats Counter | Default | Medium | Closest match; mosaic layout needs a custom variant |
| 8 | *“MSU IN THE NEWS” heading* | Heading CTA | Compact | High | |
| 9 | *Three text columns of press mentions with Read more* | Three Column CTA | WithIconsCompact | Medium | Better as a text-only variant |
| 10 | *“Know a future Spartan?” with a circular student photo and a referral button* | CTA Banner | Default | High | |
| 11 | *Two large photo tiles — campus events and athletics announcement* | Two Column CTA | Default | High | Already on Home — rewire it. Overlay treatment needs a custom variant |
| 12 | *“CAMPUS INITIATIVES” heading* | Heading CTA | Compact | High | |
| 13 | *Three initiative cards: MSU 2030, Uncommon Will, campus survey* | Three Column CTA | Default | High | |
| 14 | *Three large arrow links: Learn about MSU, Academics, Research* | Three Column CTA | WithIconsCompact | Medium | Custom link-row variant would match better |
| 15 | *Dark green footer with logo, link columns, contact, socials, legal bar* | Footer | WithSocials | High | Already on the Footer partial — populate datasource only |

---

## Sections that need attention

> [!WARNING]
> These sections match a template but will look generic unless we add custom variants in Phase 5.5.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 7 | *Ranking mosaic (photos + green stat tiles)* | Stats Counter is a 3-number row with side images, not a 2x3 mosaic | Custom `Msu` variant on Stats Counter, or accept a simpler 3-stat row |
| 9 | *Press-mention text columns* | Three Column CTA still expects images | Custom `MsuStories` text-only variant |
| 11 | *Full-bleed photo tiles with text on the image* | Default Two Column CTA puts text under the image | Custom `Msu` overlay variant |
| 14 | *Large arrow text links* | No dedicated link-row component | Custom `MsuLinks` variant |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | WithLogoImage | Only export that renders a logo image field |
| 3, 5, 8, 12 | Heading CTA | Compact | Section titles without a large display treatment or button |
| 9, 14 | Three Column CTA | WithIconsCompact | Least image-heavy three-up for text/link rows |
| 15 | Footer | WithSocials | Only export that includes social icons |

---

## Components by type

### Will be added or rewired automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Hero | Simple (1 item) |
| 3 | Heading CTA (Future Spartans) | Simple (1 item) |
| 4 | Three Column CTA (Future Spartans) | Simple (1 item) — rewire existing |
| 5 | Heading CTA (Latest News) | Simple (1 item) |
| 6 | Three Column CTA (Latest News) | Simple (1 item) |
| 7 | Stats Counter | Simple (1 item) |
| 8 | Heading CTA (MSU in the News) | Simple (1 item) |
| 9 | Three Column CTA (Press) | Simple (1 item) |
| 10 | CTA Banner | Simple (1 item) |
| 11 | Two Column CTA | Simple (1 item) — rewire existing |
| 12 | Heading CTA (Initiatives) | Simple (1 item) |
| 13 | Three Column CTA (Initiatives) | Simple (1 item) |
| 14 | Three Column CTA (Quick links) | Simple (1 item) |

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
- Four Column CTA
- Five Column CTA
- Article List
- Documents List
- App Promo
- Extra Promo CTA instances (2)

---

## Build Order

```
Phase 1 — Sitecore content (create MSU datasource items under /sitecore/content/education/msu/Data):
  1. Hero
  2. Heading CTA × 4
  3. Three Column CTA × 5
  4. Stats Counter
  5. CTA Banner
  6. Two Column CTA
  7. Header logo + Footer (partials)

Phase 2 — Apply theme (Spartan Green + Metropolis on .site-financial)

Phase 3 — Custom components: none

Phase 5.5 — Optional pixel-perfect variants (Header, Hero, Three Column CTA, Stats Counter, CTA Banner, Two Column CTA, Footer)
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Compare the table above with the homepage screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5) **or are the generic template variants sufficient?**

> Reply "approved" to proceed, or describe any changes needed.
