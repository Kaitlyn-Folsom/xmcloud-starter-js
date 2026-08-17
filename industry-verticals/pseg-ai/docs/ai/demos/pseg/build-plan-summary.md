# PSEG — Build Plan

> **Source:** https://nj.pseg.com/
> **Analyzed:** 2026-08-17
> **Sections:** 13 (12 template, 1 custom)
> **Library:** pseg-ai financial starter components (not the leftover uiim catalog)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Dark navy strip with PSEG Corporate / PSE&G / Long Island / Power on the left, and search, Español, Contact Us, Report an Emergency on the right_ | Eyebrow | Default → UtilityBar | Medium | Header partial; not API-addable |
| 2 | _White bar with orange sun + PSEG logo, plus Pay Bill / Outages / Safety / Help icon shortcuts_ | Header + Four Column CTA | WithLogoImage + HeaderShortcuts | Medium | Header is context-only |
| 3 | _White text nav: My Account, Customer Support, PowerNow, Save Energy & Money, Safety & Reliability, Business & Resources, Home Services, In the Community_ | Navigation | Default | High | Driven by the page tree |
| 4 | _Navy band: J.D. Power headline, gold trophy, Login / Register box, faint carousel arrows_ | Carousel | JdPowerHero (new) | Low | No existing hero looks like this |
| 5 | _Five text tabs under the hero: Welcome, Report an Outage, Pay Bill / Billing, Start/Stop/Move, Energy Efficiency_ | Five Column CTA | UnderlineTabs (new) | Medium | Default is image cards, not tabs |
| 6 | _Two white cards — My Account (man with phone) and Bill Advice (woman with laptop), each with Log In_ | Two Column CTA | Default | High | Fields map 1:1 |
| 7 | _Full-width agent photo with navy overlay: We Understand Your Needs + Find Help With Your Bill_ | Promo CTA | WithBackgroundImage → OverlayCta | High | Overlay box is the gap |
| 8 | _WorryFree® Appliance Service heading and three photo cards: Repair, Protect, Replace_ | Heading CTA + Three Column CTA | Centered + Default | High | Two components, one section |
| 9 | _Make an Appointment copy and button on the left, headset agent on the right_ | Promo CTA | Default | High | Layout already matches |
| 10 | _Dark navy band: Little Changes Mean Big Savings on the left, Energy Saving Tips links on the right_ | CTA Banner | EnergyTips (new) | Medium | Default expects a photo, not a link list |
| 11 | _Community photo on the left, In the Community / PSE&G is Powering the Future on the right_ | Promo CTA | ImageLeft (new) | Medium | Default is image-on-right |
| 12 | _Storm Preparation copy on the left, emergency-kit photo on the right_ | Promo CTA | Default | High | Layout already matches |
| 13 | _Navy footer: EnergyLink signup, latest news, links, logo/social, copyright_ | Footer | Default | Medium | Footer partial; signup is a CTA, not a form |

---

## Sections that need attention

> [!WARNING]
> These sections have low confidence or need custom work. Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 4 | _Navy J.D. Power hero with trophy and Login / Register_ | Carousel Default is a full-bleed photo slider. Hero Banner is a split financial promo. Neither is a 3-column navy band. | Phase 5.5 `JdPowerHero` variant on Carousel. Login/Register are buttons — not a working login form. |
| 5 | _Underline tab strip_ | Five Column CTA renders five image cards. | Phase 5.5 `UnderlineTabs` variant, or accept icon/image tiles as a looser match. |
| 10 | _Dark energy-savings band with a tips list_ | CTA Banner expects an image column. | Phase 5.5 `EnergyTips` variant, or put the tips in the rich-text field. |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Eyebrow | UtilityBar (new) | Screenshot is a compact dark navy corporate-site bar, not the financial starter eyebrow |
| 2 | Header | WithLogoImage | Logo is a Sitecore image field, not only a placeholder |
| 2 | Four Column CTA | HeaderShortcuts (new) | Compact icon + label row, not four large cards |
| 4 | Carousel | JdPowerHero (new) | Theme `heroStyle: gradient` — navy band, trophy, login card, arrows |
| 5 | Five Column CTA | UnderlineTabs (new) | Text tabs with a navy underline, flush under the hero |
| 7 | Promo CTA | WithBackgroundImage / OverlayCta | Full-bleed photo CTA; overlay panel if pixel-perfect |
| 8 | Heading CTA | Centered | WorryFree title sits above the three cards |
| 11 | Promo CTA | ImageLeft (new) | Screenshot is photo left / copy right |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 2 | Four Column CTA (shortcuts) | Simple (1 item) |
| 4 | Carousel (J.D. Power hero) | List (parent + 1+ slides) |
| 5 | Five Column CTA (tabs) | Simple (1 item) |
| 6 | Two Column CTA (account cards) | Simple (1 item) |
| 7 | Promo CTA (customer service) | Simple (1 item) |
| 8 | Heading CTA (WorryFree title) | Simple (1 item) |
| 8 | Three Column CTA (WorryFree cards) | Simple (1 item) |
| 9 | Promo CTA (appointment) | Simple (1 item) |
| 10 | CTA Banner (save energy) | Simple (1 item) |
| 11 | Promo CTA (community) | Simple (1 item) |
| 12 | Promo CTA (storm preparation) | Simple (1 item) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 1 | Eyebrow | Header partial design | Restyle / assign links in the partial. API add will fail. |
| 2 | Header | Header partial design | Assign PSEG logo on WithLogoImage. |
| 3 | Navigation | Header / main partial | Page tree already uses PSE&G nav titles. |
| 13 | Footer | Footer partial design | Update columns for EnergyLink, news, links, social. |

### Custom components needed

None as net-new Sitecore renderings. The hero is a **Carousel variant**, not a new component. Login/Register stay as buttons.

If Phase 5.5 is approved, these variants will be added to existing components:

| # | What's on the page | Suggested approach | Fields needed |
|---|-------------------|-------------------|---------------|
| 4 | J.D. Power + login hero | `JdPowerHero` on Carousel | Existing slide fields + second CTA for Register |
| 5 | Tab strip | `UnderlineTabs` on Five Column CTA | Existing Text/Link fields; hide images |
| 7 | Overlay CTA | `OverlayCta` on Promo CTA | Existing fields |
| 10 | Energy tips band | `EnergyTips` on CTA Banner | Existing fields; tips in Text |
| 11 | Community (image left) | `ImageLeft` on Promo CTA | Existing fields |

---

## Build Order

```
Phase 1 — Sitecore content (create datasource items):
  1. FourColumnCta (header shortcuts)
  2. Carousel (J.D. Power hero)
  3. FiveColumnCta (tab strip)
  4. TwoColumnCta (account cards)
  5. PromoCta (customer service)
  6. HeadingCta (WorryFree title)
  7. ThreeColumnCta (WorryFree cards)
  8. PromoCta (appointment)
  9. CtaBanner (save energy)
  10. PromoCta (community)
  11. PromoCta (storm preparation)

Phase 2 — Apply theme (CSS variables + fonts on site-pseg)

Phase 3 — Custom variants (only if you choose pixel-perfect)
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?** Look at the table above and compare against the screenshot.
2. **Do you want pixel-perfect custom variants** (Phase 5.5) or are the generic template variants sufficient?

> Reply "approved" to proceed, or describe any changes needed.
