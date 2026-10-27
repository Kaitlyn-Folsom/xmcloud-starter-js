# Theme proposal — Dentons

Source: https://www.dentons.com/en/  
Screenshot: `industry-verticals/dentons/docs/ai/demos/dentons/theme/screenshot-desktop.png`  
Confidence: **medium**. Purple, white, and the card pattern are consistent. The header background in `header-styles.json` (`#000000`) does not match the white bar in the crop or in `extracted-styles.json`.

## Colours

| Variable | Hex | Where it shows |
|---|---|---|
| `--text-body` | `#545859` | Headings and card text |
| `--text-body-inverted` | `#FFFFFF` | Text on purple and on the hero |
| `--text-colored` | `#702082` | Links and the brand purple |
| `--text-accent` | `#702082` | Buttons and the logo |
| `--text-footer` | `#545859` | Footer text |
| `--bg-body` | `#FFFFFF` | Page background |
| `--bg-footer` | `#EFEFEF` | Footer |
| `--bg-main` | `#FFFFFF` | Default sections |
| `--bg-main-alt` | `#EFEFEF` | Card wells |
| `--bg-color` | `#F6F0F8` | Light purple tint |
| `--bg-saturated` | `#702082` | Purple buttons and the help band |
| `--bg-accent` | `#702082` | Same purple |
| `--border-color` | `#E5E5E5` | Dividers |
| `--hr-color` | `#E5E5E5` | Rules |
| `--roundness` | `30px` | Pill buttons |

## Type

| Role | Face | Substitute |
|---|---|---|
| Headings | Dentons Sans, 600 | Source Sans 3 |
| Body | Dentons Sans, 400 | Source Sans 3 |

Dentons Sans is a proprietary webfont. The demo loads Source Sans 3 from Google Fonts.

## Tone

Light, formal, photographic. The hero is a full-bleed carousel with one pill button and four topic tiles. Cards are image, eyebrow, title, excerpt, and a purple pill. The header is a white bar: purple logo, four links, language, search, hamburger.

Compare the screenshot above with the live site before the build is approved.
