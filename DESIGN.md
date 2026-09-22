---
version: alpha
name: Szikszai-Zsu-portfolio
description: A quiet, editorial portfolio for Szikszai Zsu — visual artist and UX/UI designer who works across traditional crafts (bead weaving, wax-resist egg decorating, felting) and digital work (campaigns, illustration, interfaces, AI). White canvas, warm near-black ink and a single deep oxblood accent. Display type is Cormorant Garamond (high-contrast Garamond serif, often italic); UI and body type is Inter. The signature detail, taken from the wordmark, is a short 1px oxblood hairline in front of widely letter-spaced uppercase microcopy. Trilingual (HU / EN / RO), static HTML/CSS/JS on Cloudflare Workers.

colors:
  accent: "#8f1f1f"
  accent-hover: "#681414"
  ink: "#171310"
  muted: "#6f655e"
  canvas: "#ffffff"
  surface-soft: "#f7f3f1"
  surface-contact: "#f1f1ef"
  surface-footer: "#e6e5e1"
  surface-dark: "#171310"
  hairline: "rgba(23, 19, 16, .14)"
  hairline-strong: "rgba(23, 19, 16, .20)"
  overlay: "rgba(16, 13, 11, .82)"
  watermark: "rgba(104, 20, 20, .04)"
  on-dark: "#ffffff"
  on-dark-soft: "rgba(255, 255, 255, .85)"

typography:
  display-hero:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(70px, 9vw, 141px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
  display-section:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(48px, 6vw, 102px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
  display-card:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(38px, 4.4vw, 77px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
  title:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  lead-italic:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(26px, 2.4vw, 37px)
    fontStyle: italic
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  quote-italic:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(19px, 1.8vw, 22px)
    fontStyle: italic
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0
  quote-band:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(26px, 3.4vw, 45px)
    fontStyle: italic
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0
  number-italic:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: 18px
    fontStyle: italic
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  wordmark:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 21.6px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.2em
    textTransform: uppercase
  wordmark-subline:
    fontFamily: "Inter, sans-serif"
    fontSize: 9.3px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.28em
    textTransform: uppercase
  body:
    fontFamily: "Inter, SF Pro Text, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 17.3px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  eyebrow:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: 0.28em
    textTransform: uppercase
  label-accent:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: 0.24em
    textTransform: uppercase
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.8px
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: 0.2em
    textTransform: uppercase
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.8px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.2em
    textTransform: uppercase
  form-label:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: 0.2em
    textTransform: uppercase
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 12.8px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

rounded:
  sm: 16px
  md: 18px
  lg: 24px
  pill: 999px
  full: 50%

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 18px
  lg: 24px
  xl: 30px
  xxl: 42px
  card-gap: 28px
  block: 70px
  section-mobile: 85px
  section: 130px
  container: min(1180px, calc(100% - 48px))
  container-mobile: min(calc(100% - 30px), 680px)

components:
  site-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 84px
    heightMobile: 70px
    border: 1px solid {colors.hairline} (bottom, full-bleed)
    position: sticky
  wordmark:
    textColor: "{colors.ink}"
    accentText: "ZSU in {colors.accent}"
    typography: "{typography.wordmark}"
    subline: "ART & DESIGN — {typography.wordmark-subline}, {colors.muted}, preceded by an 18px × 1px {colors.accent} hairline"
  nav-link:
    textColor: "{colors.ink}"
    hoverColor: "{colors.accent-hover}"
    typography: "{typography.nav-link}"
    underline: 1px {colors.accent}, grows left→right on hover / active
  language-dropdown:
    toggle: "pill, 1px {colors.hairline} border, padding 10px 14px, current language + chevron"
    panel: "{colors.canvas}, 1px {colors.hairline} border, rounded {rounded.sm}, shadow, 6px padding, options stacked"
    activeOption: "{colors.accent} background, {colors.on-dark} text, pill"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    hoverBackground: "{colors.accent}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 20px
    gap: 26px (label ↔ ↗ arrow)
    hover: translateY(-2px)
  eyebrow:
    textColor: "{colors.muted}"
    typography: "{typography.eyebrow}"
    decoration: "20px × 1px {colors.accent} hairline on the left, 30px text indent"
  hero:
    layout: "photo column clamp(300px, 30vw, 420px) + copy column 1fr, vertically centred, exactly one viewport tall (100svh − header)"
    photo: "rounded {rounded.lg}, soft shadow, height = copy block height + 2cm top + 2cm bottom (set via --hero-copy-height)"
    name: "{typography.display-hero} in {colors.accent}"
    lead: "{typography.lead-italic}, always a single line on desktop (font-size scales with the column: min(2.3rem, 6cqi), RO 5cqi)"
  quote-band:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.quote-band}"
    padding: 28px 24px
  about-row:
    layout: "grid 48px number | 180px title | 1fr text, 22px gap, 30px vertical padding, 1px {colors.hairline} rules between rows"
    number: "{typography.number-italic} in {colors.accent}"
    title: "{typography.title}"
    text: "{typography.body} in {colors.muted}"
  gateway-card:
    backgroundColor: "{colors.surface-soft}"
    border: 1px solid {colors.hairline}
    rounded: "{rounded.lg}"
    image: "1:1, full-bleed top"
    padding: 30px
    label: "{typography.label-accent} in {colors.accent}"
    title: "{typography.display-card}"
    hover: "card translateY(-5px) + shadow, image scale(1.025)"
  project-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    minHeight: 520px
    overlay: "linear-gradient(transparent, rgba(0,0,0,.86)) over the lower 65%"
    hover: "text block slides up 48px, description fades in, image scale(1.035)"
  gallery-item:
    rounded: "{rounded.sm}"
    border: 1px solid {colors.hairline}
    aspectRatio: 1 / 1
    grid: "2 columns, max 760px wide, 28px gap (1 column on mobile)"
  gallery-preview:
    backgroundColor: "{colors.overlay} + 7px backdrop blur"
    image: "contain, max 720px, rounded {rounded.md}"
    desktop: "opens on hover / focus"
    touch: "opens on tap, swipe left/right to page (wraps), tap to close, '2 / 6' counter pill at the bottom"
  contact-section:
    backgroundColor: "{colors.surface-contact}"
    padding: 120px 0
  contact-form:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: 32px
    label: "{typography.form-label}"
    input: "transparent, no box, 1px {colors.hairline} bottom border only; focus → {colors.accent}"
  footer:
    backgroundColor: "{colors.surface-footer}"
    border: 1px solid {colors.hairline-strong} (top)
    watermark: "huge serif 'SZ' in {colors.watermark}, bottom-right, clipped"
    tagline: "{typography.quote-italic} in {colors.ink}"
    columnHeading: "{typography.label-accent} in {colors.accent}"
    social: "48px circles, 1px {colors.hairline}, white; hover {colors.accent} fill + white icon"
---

## Overview

The portfolio reads like a small printed catalogue for an artist: generous white space, a warm near-black ink, one deep **oxblood** accent (`{colors.accent}` — #8f1f1f) and a high-contrast Garamond for everything that should feel "made by hand". It must sit comfortably next to both kinds of work shown on the site — beaded bands and wax-decorated eggs on one side, digital campaigns and UI on the other — so the chrome stays quiet and lets the photographs carry colour.

The whole system is derived from the **wordmark**: `SZIKSZAI ZSU` in widely spaced Cormorant Garamond capitals (ZSU in oxblood), with `ART & DESIGN` underneath in tiny spaced Inter capitals, introduced by a short oxblood hairline. That hairline + spaced-caps combination is repeated for every eyebrow on the site, and the spaced-caps treatment is reused for navigation, buttons and form labels. Big statements use the serif; everything functional uses Inter.

**Key Characteristics:**
- White canvas (`{colors.canvas}`) with warm ink (`{colors.ink}` — #171310) and warm grey secondary text (`{colors.muted}` — #6f655e). Never cool greys.
- One accent only: oxblood `{colors.accent}` — used for the name in the hero, "ZSU" in the wordmark, hairlines, small labels, active states and hover fills. It is never used as a large background.
- Display serif: **Cormorant Garamond** 500 (600 for small titles), often *italic* for leads, quotes and numbers.
- UI/body sans: **Inter**. Body at 400; all microcopy in spaced uppercase (0.2–0.28em tracking) at 600–700. No heavy 800–900 weights anywhere.
- Signature detail: a 1px oxblood hairline (18–20px long) leading into spaced uppercase microcopy.
- Large radii (`{rounded.lg}` 24px) on photos and cards; pills for buttons and toggles.
- Photography does the colour work: dark studio portraits, beadwork on warm neutral sets, digital artwork.

## Colors

### Brand & Accent
- **Oxblood / Accent** (`{colors.accent}` — #8f1f1f): the hero name, "ZSU", eyebrow/label hairlines, section numbers, category labels, active language, button hover, social hover, form focus.
- **Accent Hover** (`{colors.accent-hover}` — #681414): nav link hover.

### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): default page and header background.
- **Surface Soft** (`{colors.surface-soft}` — #f7f3f1): gateway cards on the homepage.
- **Surface Contact** (`{colors.surface-contact}` — #f1f1ef): contact section band.
- **Surface Footer** (`{colors.surface-footer}` — #e6e5e1): footer, with a faint inset shadow at the top.
- **Surface Dark** (`{colors.surface-dark}` — #171310): quote band, project cards, primary buttons.
- **Overlay** (`{colors.overlay}`): gallery preview backdrop (with blur).

### Text
- **Ink** (`{colors.ink}`): headings, nav, primary text.
- **Muted** (`{colors.muted}`): body paragraphs, eyebrows, wordmark subline, captions, footer links.
- **On Dark** (`{colors.on-dark}` / `{colors.on-dark-soft}`): text on dark cards and the quote band.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — ink at 14%): header bottom, about rows, cards, inputs, pills.
- **Hairline Strong** (`{colors.hairline-strong}` — ink at 20%): footer top border.
- **Accent hairline**: 1px oxblood, 18–22px long, only as the lead-in for spaced-caps microcopy and as the nav underline.

## Typography

### Font Family
- **Cormorant Garamond** — self-hosted variable woff2 (`public/assets/cormorant-garamond-*.woff2`), roman + italic, split into latin and latin-ext by `unicode-range`. latin-ext is required for Hungarian ő/ű and Romanian ș/ț.
- **Inter** — self-hosted variable woff2 (`public/assets/inter-variable.woff2`), 100–900.
- Fonts are never loaded from Google Fonts at runtime (privacy + speed).

### Hierarchy
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero name (h1) | Cormorant | clamp(4.4rem, 9vw, 8.8rem) | 500 | oxblood, lh 1.02 |
| Section heading (h2) | Cormorant | clamp(3rem, 6vw, 6.4rem) | 500 | `em` inside → italic |
| Card / category title | Cormorant | ~2.4–4.8rem clamps | 500 | |
| About row title (h3) | Cormorant | 1.75rem | 600 | |
| Hero lead | Cormorant *italic* | min(2.3rem, 6cqi) | 500 | single line on desktop |
| Quotes | Cormorant *italic* | 1.2–1.4rem / band 1.6–2.8rem | 500 | |
| Section numbers 01/02/03 | Cormorant *italic* | 1.15rem | 600 | oxblood |
| Wordmark | Cormorant caps | 1.35rem (1.12 mobile) | 600 | 0.2em tracking |
| Body | Inter | 1rem (hero 1.08, detail 1.1–1.35) | 400 | lh 1.6, muted |
| Eyebrow | Inter caps | .7rem | 700 | 0.28em, muted, oxblood hairline |
| Labels (cards, footer) | Inter caps | .7rem | 700 | 0.24em, oxblood |
| Nav / buttons / back links | Inter caps | .74rem | 600 | 0.2em |
| Form labels | Inter caps | .7rem | 700 | 0.2em |

### Principles
- Serif for **meaning** (names, statements, titles, quotes); sans for **function** (navigation, labels, buttons, body copy).
- Serif headings sit at weight 500 with almost no negative tracking (-0.01em). Do not reuse the old tight -0.055em Inter tracking.
- Italic Cormorant is the "voice" of the artist: leads, quotes, numbers, footer tagline.
- All uppercase microcopy is tracked 0.2em or more and never larger than ~12px.

### Note on Font Substitutes
If Cormorant Garamond is unavailable, fall back to Georgia / Times New Roman; if Inter is unavailable, to SF Pro / Helvetica Neue / Arial. Keep the same weights and tracking.

## Layout

### Spacing System
Section padding 130px desktop / 85px mobile (contact 120 / 80). Card padding 30px (24px mobile). Grid gaps 28px for card grids, 70px between the about photo and text. Eyebrow → heading 20px.

### Grid & Container
Container `min(1180px, 100% − 48px)`; on ≤820px `min(100% − 30px, 680px)`. The sticky header uses the same width, with its white background and bottom hairline stretched full-bleed via a `::before`.

### Whitespace Philosophy
Let one thing speak per viewport. The hero is exactly one screen tall on desktop; sections are separated by generous padding and a single hairline, not by colour blocks (the only bands are the dark quote band, the contact band and the footer).

## Elevation & Depth
- Standard shadow: `0 18px 50px rgba(42, 24, 13, .12)` — hero photo, contact form, dropdown panel, card hover.
- Gallery item hover: `0 18px 45px rgba(23, 19, 16, .18)`.
- Motion: reveal on scroll (opacity 0 → 1, translateY 24px → 0, .7s ease); hover lifts of 2–5px; image zooms of 1.025–1.035.

### Decorative Depth
The footer carries a giant serif "SZ" watermark in oxblood at 4% opacity, bottom-right and clipped. It is the only decorative element; do not add others.

## Shapes

### Border Radius Scale
- `{rounded.lg}` 24px — photos, gateway/project/category cards, contact form.
- `{rounded.md}` 18px — gallery preview image.
- `{rounded.sm}` 16px — gallery thumbnails, dropdown panel.
- `{rounded.pill}` — buttons, language toggle, meta tags, counter.
- `{rounded.full}` — social icons.

### Photography Geometry
Hero portrait uses `object-fit: cover` and follows the text height (+2cm each side). Gateway and gallery images are 1:1. Detail hero images max 80vh. Images are not draggable / not right-clickable.

## Components

### Top Navigation
Sticky white header (84px / 70px mobile): wordmark left, spaced-caps nav links, then the language dropdown. On ≤820px the nav collapses behind a "Menü" pill button that opens a floating white panel.

### Language Dropdown
One pill toggle showing the current language (`HU ˅`) on every screen size. Tap/click opens a small white panel with HU / EN / RO; the active one is an oxblood pill. Closes on choice, outside click or Escape.

### Buttons
Primary: ink pill, white spaced-caps label + ↗ arrow, 14px 20px padding; hover → oxblood background and 2px lift. There is no secondary filled colour.

### Cards & Containers
- **Gateway card** (homepage "Digitális munkák" / "Hagyományos technikák"): soft surface, 1:1 image on top, oxblood label, serif title, muted description, spaced-caps "Belépés a kategóriákhoz ↗".
- **Project card**: dark, full-bleed image with bottom gradient; text slides up and description fades in on hover (always visible on mobile).
- **About rows**: number / serif title / muted text, separated by hairlines.

### Inputs & Forms
Underline-only inputs (1px hairline bottom, oxblood on focus), spaced-caps labels, white rounded card with the standard shadow. Submission goes through FormSubmit.

### Gallery
2-column square thumbnails (1 column on mobile). Preview overlay: hover on desktop; on touch devices tap to open, swipe to page, counter pill at the bottom, tap to close.

### Footer
Three columns: wordmark + serif italic tagline + description; page links; contact + social circles. Bottom row: copyright, visit counter, back-to-top link.

## Do's and Don'ts

### Do
- Start every section with an eyebrow (hairline + spaced caps) followed by a serif heading.
- Keep the accent for small things: words, hairlines, states.
- Use italic Cormorant for anything that is the artist's voice (lead, quotes, tagline, numbers).
- Keep the hero lead on one line on desktop in all three languages.
- Add every new visible Hungarian string to `public/language.js` (HU → EN) and its English value to `public/romanian.js` (EN → RO).
- Bump the `?v=` query on `styles.css` / `script.js` / `language.js` / `romanian.js` in every HTML file after editing them.
- Self-host any new font and include the latin-ext subset.

### Don't
- Don't introduce new accent colours, gradients (other than the image overlay) or glossy effects.
- Don't use heavy Inter weights (800–900) or tight negative tracking on headings.
- Don't set body copy in the serif, or navigation/buttons in the serif.
- Don't use the accent as a large background fill.
- Don't load fonts or scripts from third-party CDNs.
- Don't publish rewritten personal copy without the owner's approval — layout/CSS fixes are fine, wording changes must be shown first.

## Responsive Behavior

### Breakpoints
- **≥1000px** — two-column hero fitted to the viewport; lead forced to one line.
- **821–999px** — hero stacks (text, then photo max 420px wide).
- **≤820px** — mobile: menu pill, single-column grids, reduced paddings, footer in one column.
- **≤380px** — smaller wordmark (0.98rem, 0.13em tracking) so it fits next to the two pills on 320px screens.
- `(hover: none), (pointer: coarse)` — gallery switches from hover preview to tap + swipe.

### Touch Targets
Pills and toggles are ≥40px tall; dropdown options 40px; social icons 48px.

### Collapsing Strategy
Nav → floating panel; language list → dropdown; about rows → number + (title / text stacked); project card text always visible.

### Image Behavior
Hero photo height follows the copy on desktop and is 4:5 on mobile. `html/body` clip horizontal overflow (`overflow-x: clip`) so full-bleed pseudo-elements never cause sideways scrolling.

## Iteration Guide
1. New page → copy an existing page from `public/art-work/*/index.html` so header, footer, fonts and scripts come along.
2. Structure: eyebrow → serif h1/h2 → muted body → content grid → footer.
3. Check 320px, 375px, 1024px, 1366px and 1920px, in HU, EN and RO.
4. Deploy = push to `main` on GitHub; Cloudflare Workers publishes in ~30–45 seconds.

## Known Gaps
- `ART & DESIGN` under the wordmark is the same in all languages (CSS `content`).
- The footer still shows the phone number; the contact section no longer does.
- `README.md` describes a Cloudflare Pages setup, but the site actually runs on Cloudflare Workers (`wrangler.jsonc`).
