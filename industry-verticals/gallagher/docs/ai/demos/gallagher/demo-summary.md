# Arthur J. Gallagher & Co. — Demo Build Summary

> **Client:** Gallagher
> **Source:** https://www.ajg.com
> **Built:** 2026-08-26
> **Page:** `/sitecore/content/finance/gallagher/Home`

---

## Build Overview

| Metric | Count |
|--------|-------|
| Template components used | 9 (Header, Hero Banner, Heading CTA, Four Column CTA, Promo CTA, Two Column CTA, Five Column CTA, Footer) |
| Custom components built | 0 |
| Custom variants created | 8 named exports (`Gallagher`, `GallagherCentered`, `GallagherVideo`, `GallagherTiles`) |
| Datasource items created | 15 |
| Images uploaded | 22 / 22 |

---

## What is done

- Live content extracted from ajg.com and mapped in `content-map.yaml`
- 15 datasource items created under `/sitecore/content/finance/gallagher/Home/Data`
- 22 images uploaded to Content Hub, approved, and written as DAM XML
- Gallagher Dark Blue (`#00263E`) + Primary Blue (`#6FACDE`) applied on `.site-financial`
- Montserrat loaded as the Gotham Narrow substitute
- Pixel-perfect variants in React + `_component-gallagher.scss`
- Sitecore Variant Definition items created under Presentation/Headless Variants
- Footer partial datasource already assigned

## What you need to do in Pages

The Sitecore Agent API returned **500** on Home `add_component_on_page` / `set_component_datasource`. Assemble using [variant-checklist.md](variant-checklist.md) and [manual-tasks.md](manual-tasks.md).

Restart `npm run dev` in `industry-verticals/gallagher` so the theme and Gallagher exports load.

## Theme

| Property | Value |
|----------|-------|
| Primary | `#00263E` (PMS 2965 C) |
| Accent | `#6FACDE` (PMS 2142 C) |
| Header | White / navy text |
| Footer | `#00263E` |
| Type | Gotham Narrow → Montserrat |
| Radius | `4px` |

## Datasource IDs (quick copy)

| Item | ID |
|------|-----|
| Gallagher - Header | `7f3efaa6-8f5a-47a1-90da-0cc5a2b98e01` |
| Gallagher - Hero Banner | `87d38337-9873-4843-af46-47da8f4907ad` |
| Gallagher - Forge Ahead Heading | `0cc13da0-8c53-48c1-b32d-1a848e470c00` |
| Gallagher - Stats | `9a9e933b-9801-4db6-8390-dfd24e9c0a1e` |
| Gallagher - Insurance | `e026fe6b-82e3-4819-ae03-96daa50b92bb` |
| Gallagher - Benefits | `7d7a9840-e202-4713-8c8a-fbc08fc23c12` |
| Gallagher - Gallagher Way | `e09637cb-d19e-4876-9987-14cbcb4fb3fe` |
| Gallagher - Insights Heading | `d1671dc7-a51f-43ff-a4ee-d09578f1dd38` |
| Gallagher - Featured Insight | `05a6cf74-de35-421d-ad84-403698a59bd6` |
| Gallagher - Insight Cards | `75c9eea4-73e7-43bb-9ae2-234faf1dadb2` |
| Gallagher - Industry Heading | `71aefe9e-f058-4264-8d0f-5adc3c9198a6` |
| Gallagher - Industries | `e53c18e4-a2de-436c-89fd-496a46537df5` |
| Gallagher - Join Gallagher | `3a41b7f9-8ece-4201-a7f3-183e78cb0b9c` |
| Gallagher - Find an Office | `9d4168d1-8607-4397-99e2-66639e0b3e73` |
| Gallagher - Footer | `4ced1862-4805-47f6-a934-a4e851d5c3d3` |
