# Gallagher demo — manual tasks

## 1. Assign variants and datasources in Pages

The Agent API returned **500** on `add_component_on_page` and `set_component_datasource` for Home. Follow [variant-checklist.md](variant-checklist.md).

1. Open `/sitecore/content/finance/gallagher/Home` in Pages.
2. Rewire the existing Four Column, three Promo CTAs, Heading CTA, Five Column, and Two Column instances to the Gallagher datasources.
3. Add the missing components (Hero Banner, Insights heading, Featured insight, Insight cards, Industry heading, Find an Office).
4. Set **FieldNames** to the Gallagher / GallagherCentered / GallagherVideo / GallagherTiles variant listed in the checklist.
5. Reorder so the page reads: Hero → Forge Ahead → Stats → Insurance → Benefits → Gallagher Way → Insights → Featured → Cards → Industry heading → Industries → Join tiles → Find an Office.

## 2. Header partial

API returned **422** (“component does not accept a datasource”) for Header. In the **Header** partial design:

1. Select the Header rendering.
2. Set variant to **Gallagher** (`f82fad22-64f5-43d1-960c-ca9e139daf7a`).
3. Assign datasource **Gallagher - Header** (`7f3efaa6-8f5a-47a1-90da-0cc5a2b98e01`) if the editor allows it after the variant is set.
4. The Gallagher variant renders `LogoImage` instead of the `header-left` RichText wordmark.

## 3. Footer partial

Datasource **Gallagher - Footer** is already wired. Set FieldNames to **Gallagher** (`8fae01f9-d908-400e-9433-f67aedd3c6f3`).

## 4. Remove leftover PLAY components

Do **not** remove the third Promo CTA (it is The Gallagher Way). Remove:

- Carousel
- Comparison (x2, nested in the Two Column CTA placeholders)
- Three Column CTA
- Article List
- Documents List
- App Promo

After switching the Join Gallagher Two Column to **GallagherTiles**, the nested Comparisons will no longer render.

## 5. CEO video

Poster image is on **Gallagher - Gallagher Way** (`Image`). Do not download the mp4.

- Live player: Brightcove poster `https://cf-images.us-east-1.prod.boltdns.net/v1/static/972303393001/ec6b6efc-0b49-4f85-b49d-a37fabbfbaa1/8ad7c02f-ae93-4662-8888-88a33a2885c8/1280x720/match/image.jpg`
- Upload the video to Content Hub, create a public link, and attach it in Pages if you want playback (the GallagherVideo variant is a play-button overlay on the poster).

## 6. Restart the rendering host

From `industry-verticals/gallagher`:

```bash
npm run dev
```

Theme, Montserrat, and the named Gallagher exports load after restart.

## Personalization (optional)

Create additional datasource items in Home/Data using:

`Gallagher - <ComponentName> - <Segment>`
