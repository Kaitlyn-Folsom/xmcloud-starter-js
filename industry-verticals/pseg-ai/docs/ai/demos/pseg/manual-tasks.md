# PSEG — Manual Tasks

Presentation APIs (`get_components_on_page`, `add_component_on_page`, `set_component_datasource`) return 404 for ProsperaFinancial (no rendering host). Datasources, images, and variants are ready. Page assembly must be done in Pages / Content Editor.

## 1. Assemble Home

Path: `/sitecore/content/Financial/ProsperaFinancial/Home`

Home already has a financial-starter layout (carousel, five-column, three-column, two promo CTAs, two-column, article list, documents, app promo). Rewire those and add the missing pieces.

**Rewire existing components** (Content Editor presentation, or Pages):

| Existing rendering | Assign datasource | Set variant |
|--------------------|-------------------|-------------|
| Carousel on `headless-main` | `Home/Data/PSEG - Home Carousel` | Pseg |
| Five Column CTA | `Data/Promos/Five Column CTA/PSEG - Welcome Tabs` | Pseg |
| Two Column CTA | `Data/Promos/Two Column CTA/PSEG - MyAlerts MyMeter` | Pseg |
| Three Column CTA | `Data/Promos/Three Column CTA/PSEG - WorryFree Cards` | Pseg |
| Promo CTA (first) | `Data/Promos/Promo CTA/PSEG - Business Needs` | PsegOverlay |
| Promo CTA (second) | `Data/Promos/Promo CTA/PSEG - Make an Appointment` | Pseg |
| Promo CTA 1 (`local:/Data/Promo CTA 1`) | `Data/Promos/Promo CTA/PSEG - In the Community` | PsegImageLeft |
| Four Column CTA in header row | `Data/Promos/Four Column CTA/PSEG - Header Shortcuts` | Pseg |

**Add if missing:**

| Component | Datasource | Variant | Place |
|-----------|------------|---------|-------|
| Heading CTA | `Home/Data/PSEG - WorryFree Heading` | Pseg | Above WorryFree cards |
| Promo CTA | `Data/Promos/Promo CTA/PSEG - Storm Preparation` | Pseg | After community |
| CTA Banner | `Home/Data/PSEG - Save Energy` | Pseg | After appointment |

**Remove or hide leftover financial blocks:** Comparison tiles, Article List, Documents List, App Promo — they are not on nj.pseg.com.

## 2. Variant selection

See `variant-checklist.md`. Restart the Next.js app after pulling these code changes so the new `Pseg` exports are available.

## 3. Header / nav / footer (context-only)

- Eyebrow: dark navy utility bar (PSEG Corporate / PSE&G / Long Island / Power). Lives on the header partial.
- Header logo: use the uploaded PSEG logo (`83216-logo` in Content Hub) on Header WithLogoImage.
- Navigation: page-tree titles are already PSE&G from the earlier content pass.
- Footer: keep the existing PSE&G footer columns. EnergyLink is a signup CTA, not a working form.

## 4. Cleanup

- Hide Comparison components in the two-column placeholders under the hero.
- Confirm personalization rules on the existing Home carousel still make sense after the datasource change (or clear them).

## 5. Personalization (optional)

Create extra datasources as `PSEG - <Component> - <Segment>` in the same folders, then assign them in Pages → Personalize.
