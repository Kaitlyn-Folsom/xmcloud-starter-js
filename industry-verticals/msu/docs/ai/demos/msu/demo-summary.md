# Michigan State University — Demo Build Summary

> **Client:** Michigan State University
> **Source:** https://msu.edu
> **Built:** 2026-08-25
> **Page:** `/sitecore/content/education/msu/Home`

---

## Build Overview

| Metric | Count |
|--------|-------|
| Template components used | 8 (Hero, Heading CTA, Three Column CTA, Stats Counter, CTA Banner, Two Column CTA, Header, Footer) |
| Custom components built | 0 |
| Custom variants created | 8 (`Msu`) |
| Datasource items created | 15 |
| Images uploaded | 28 / 28 |

---

## What is done

- Live content extracted from msu.edu and mapped in `content-map.yaml`
- All homepage datasources created under `/sitecore/content/education/msu/Home/Data` (Header/Footer under site `Data`)
- 28 images uploaded, approved, and written as DAM XML on those items
- Spartan Green theme applied in `_colors.scss` and Metropolis/Montserrat in `_fonts.scss`
- Pixel-perfect `Msu` variants added in React + SCSS (`_component-msu.scss`)
- Sitecore Variant Definition items created under Presentation/Headless Variants

## What you need to do in Pages

The Sitecore Agent API returned **500** on `add_component_on_page` and `set_component_datasource`, so Home still has the PLAY Financial leftovers. Assemble using [variant-checklist.md](variant-checklist.md):

1. Open Home in Pages.
2. Add each component in order (Hero → headings → cards → rankings → news → CTA → stories → initiatives → find-out-more).
3. Assign the matching **MSU - …** datasource and set **FieldNames** to **Msu**.
4. On the Header and Footer **partial designs**, assign `MSU - Header` / `MSU - Footer` and the **Msu** variant.
5. Remove leftover PLAY renderings: Carousel, Promo CTA, Comparison, Five Column CTA, Article List, Documents List, App Promo, unused Four Column CTA.

## Theme

| Property | Value |
|----------|-------|
| Primary color | `#18453B` (Spartan Green) |
| Accent | `#7BBD00` (Lime) |
| Heading / body font | Metropolis (Content Hub) with Montserrat fallback |
| Delivery method | `.site-financial` CSS variables + `--brand-*` |
| Corners | `0px` |

Restart `npm run dev` in `industry-verticals/msu` so the theme and `Msu` exports load.

## Datasource IDs (quick copy)

| Item | ID |
|------|-----|
| MSU - Hero | `732b407a-0633-4980-b16c-73c304196a32` |
| MSU - Future Spartans Heading | `3f414363-60f8-408e-aa31-4471ebb384bc` |
| MSU - Future Spartans Cards | `5df87799-a3ba-4179-964c-20fd629a58c5` |
| MSU - Latest News Heading | `37640edf-f36c-4921-8703-302ad950db7f` |
| MSU - Latest News Cards | `9043f415-e85b-423f-8a52-3e5dba252eeb` |
| MSU - Rankings Mosaic | `895f8e12-d98b-476c-8829-51150c616966` |
| MSU - In The News Heading | `8b1baab1-9733-4ed6-9d49-c359aa8f6c54` |
| MSU - In The News Features | `09774ac7-df2d-458f-a06d-7c8b3ee8cbe6` |
| MSU - Refer a Student | `31b87352-be7c-4738-97eb-7b8caebdf2e1` |
| MSU - Campus Stories | `66f70f72-38fb-4f4a-aa86-eb7ebf7fee95` |
| MSU - Campus Initiatives Heading | `35908c8e-8b49-4290-a127-f670125858e8` |
| MSU - Campus Initiatives Cards | `b4470cf0-c345-4ab3-bca9-3c35807b61cf` |
| MSU - Find Out More Links | `8e0469c0-3ed7-420e-b995-828119a404a7` |
| MSU - Header | `55ef6bce-dc4b-4d16-b83a-a475c21c2a64` |
| MSU - Footer | `3384d71c-d2a2-4a95-b232-55affb0f7136` |
