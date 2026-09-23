---
version: beta
name: Szikszai-Zsu-art-design
description: Portfolio of Szikszai Zsu — visual artist and UX/UI designer working across traditional crafts (bead weaving, wax-resist egg decorating, felting) and digital work (campaigns, illustration, interfaces, AI). Apple-style structure (awesome-design-md/apple) — centred stacks, full-bleed alternating light/dark tiles, pill buttons, shadow only on photography — wearing the owner's own brand — a spaced Cormorant Garamond wordmark, Cormorant display type, Inter UI text and a single deep oxblood accent in place of Apple's blue. Trilingual (HU / EN / RO), static HTML/CSS/JS on Cloudflare Workers.

colors:
  accent: "#8f1f1f"
  accent-hover: "#681414"
  ink: "#171310"
  body-soft: "#3a332e"
  muted: "#6f655e"
  canvas: "#ffffff"
  parchment: "#f5f5f7"
  tile-dark: "#1d1a18"
  hairline: "rgba(0, 0, 0, .08)"
  hairline-dashed: "rgba(0, 0, 0, .14)"
  header-glass: "rgba(255, 255, 255, .8)"
  overlay: "rgba(16, 13, 11, .82)"
  on-dark: "#ffffff"
  on-dark-soft: "rgba(255, 255, 255, .78)"

typography:
  display-hero:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: clamp(70px, 9vw, 141px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
  display-section:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: clamp(48px, 6vw, 102px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
  display-card:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: clamp(38px, 4.4vw, 77px)
    fontWeight: 500
    lineHeight: 1.02
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.1
  lead-italic:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: clamp(26px, 2.6vw, 37px)
    fontStyle: italic
    fontWeight: 500
    lineHeight: 1.2
  quote-italic:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: clamp(19px, 1.8vw, 22px)
    fontStyle: italic
    fontWeight: 500
  quote-band:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: clamp(26px, 3.4vw, 45px)
    fontStyle: italic
    fontWeight: 500
  number-italic:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 18px
    fontStyle: italic
    fontWeight: 600
  wordmark:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 21.6px
    fontWeight: 600
    letterSpacing: 0.2em
    textTransform: uppercase
  wordmark-subline:
    fontFamily: "Inter, sans-serif"
    fontSize: 9.3px
    fontWeight: 700
    letterSpacing: 0.28em
    textTransform: uppercase
  body:
    fontFamily: "Inter, SF Pro Text, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.47
  eyebrow:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    letterSpacing: 0.28em
    textTransform: uppercase
  label-accent:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    letterSpacing: 0.24em
    textTransform: uppercase
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 12.8px
    fontWeight: 400
    letterSpacing: 0
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 17px
    fontWeight: 400
    letterSpacing: 0
  text-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 15.2px
    fontWeight: 400
  form-label:
    fontFamily: "Inter, sans-serif"
    fontSize: 11.2px
    fontWeight: 700
    letterSpacing: 0.2em
    textTransform: uppercase

rounded:
  md: 18px
  pill: 999px
  full: 50%

spacing:
  xs: 8px
  sm: 14px
  md: 24px
  lg: 32px
  xl: 56px
  section: 104px
  section-mobile: 64px
  hero: 96px 104px
  container: min(1180px, calc(100% - 48px))
  container-text: 980px

components:
  site-header:
    backgroundColor: "{colors.header-glass} + saturate(180%) blur(20px)"
    border: 1px solid {colors.hairline} (bottom, full-bleed)
    height: 64px (60px mobile)
    position: sticky
  wordmark:
    typography: "{typography.wordmark}"
    accentText: "ZSU in {colors.accent}"
    subline: "ART & DESIGN — {typography.wordmark-subline} in {colors.muted}, led by an 18px × 1px {colors.accent} hairline"
  nav-link:
    typography: "{typography.nav-link}"
    textColor: "rgba(23,19,16,.82)"
    hoverColor: "{colors.accent}"
  language-dropdown:
    toggle: "pill with 1px hairline, current language + chevron (all screen sizes)"
    panel: "white, hairline border, rounded 16px, soft shadow; active option = {colors.accent} pill"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-dark}"
    hoverBackground: "{colors.accent-hover}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
    active: scale(.95)
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    border: inset 1px {colors.accent}
    rounded: "{rounded.pill}"
    hover: "fills with {colors.accent}, white text"
  eyebrow:
    typography: "{typography.eyebrow}"
    textColor: "{colors.muted}"
    decoration: "20px × 1px {colors.accent} hairline before the text; centred in centred sections"
  hero:
    layout: "centred stack: eyebrow → name ({typography.display-hero}, {colors.accent}) → italic lead → body → two pill buttons → italic quote → portrait"
    portrait: "min(460px, 100%) wide (360px mobile), 4:5, rounded {rounded.md}, photo shadow; enters with a 1.2s fade/rise, then a 14s 'breathing' zoom (scale 1 → 1.045) inside the fixed frame; no motion with prefers-reduced-motion"
  quote-band:
    backgroundColor: "{colors.tile-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.quote-band}"
    padding: 80px 24px (56px 20px mobile)
  about:
    backgroundColor: "{colors.parchment} (full-bleed tile)"
    rows: "number ({typography.number-italic}, accent) | title ({typography.title}) | text column; extra paragraphs stay in the text column"
  gateway-card:
    backgroundColor: "{colors.canvas}"
    border: 1px solid {colors.hairline}
    rounded: "{rounded.md}"
    padding: 32px (24px mobile)
    hover: "no lift, no shadow; image scale(1.03)"
  gallery-item:
    aspectRatio: 1 / 1
    rounded: "{rounded.md}"
    grid: "2 columns, max 760px, 28px gap; 1 column on mobile; keep an even count"
  gallery-slot:
    purpose: "placeholder for a work that has no photo yet"
    backgroundColor: "{colors.parchment}"
    border: 1px dashed {colors.hairline-dashed}
    rounded: "{rounded.md}"
    label: "'Hamarosan' / 'Coming soon' / 'În curând' in {typography.eyebrow} with the accent hairline"
  gallery-preview:
    overlay: "{colors.overlay} + 7px blur"
    desktop: "hover / focus"
    touch: "tap to open, swipe to page (wraps), '2 / 6' counter, tap to close"
  contact-section:
    backgroundColor: "{colors.tile-dark}"
    textColor: "{colors.on-dark}"
    form: "white card, rounded {rounded.md}, no shadow, underline-only inputs, full-width primary button, privacy-notice link below"
  footer:
    backgroundColor: "{colors.parchment}"
    columns: "wordmark + italic tagline | page links | contact + social circles"
    bottom: "copyright · Adatvédelem link · back to top · visit counter"
---

## Overview

The site is a quiet gallery for one person's work. Structure and rhythm follow Apple's product pages: every section is a centred stack or a full-bleed tile, tiles alternate light and dark so the colour change itself separates sections, buttons are pills, and the only shadow in the system sits under photographs. The brand on top of that chassis is the owner's own: the spaced Cormorant Garamond wordmark `SZIKSZAI ZSU` with its `ART & DESIGN` subline, Cormorant for everything expressive, Inter for everything functional, and one oxblood accent (`{colors.accent}` — #8f1f1f) doing the job Apple gives to blue.

**Key Characteristics:**
- Page rhythm: white hero → dark quote band → parchment About → white Work → dark Contact → parchment footer.
- One accent only. Oxblood marks the name, "ZSU", hairlines, links, active states and primary buttons. Never a large background.
- Display serif (Cormorant Garamond 500/600, often italic); UI/body sans (Inter 400, 17px, line-height 1.47). Small uppercase microcopy is tracked 0.2–0.28em and led by a red hairline, like the wordmark subline.
- Radius 18px on photos, cards and slots; pills for buttons and toggles.
- Shadow only on photography: `3px 5px 30px rgba(0,0,0,.22)`. Cards are flat with a hairline.
- Empty spots are shown honestly as dashed "Hamarosan" slots — never with stock or unrelated images.

## Colors
- **Accent** `#8f1f1f` / **Accent hover** `#681414` — the single interactive and brand colour.
- **Ink** `#171310` — headings and primary text. **Body soft** `#3a332e` — card and About paragraphs. **Muted** `#6f655e` — eyebrows, captions, notes.
- **Canvas** `#ffffff`, **Parchment** `#f5f5f7` (About, footer, slots), **Tile dark** `#1d1a18` (quote band, Contact).
- **Hairline** `rgba(0,0,0,.08)`; dashed slot border `rgba(0,0,0,.14)`.

## Typography
- Fonts are self-hosted in `public/assets/`: `inter-variable.woff2`, and Cormorant Garamond as four variable files (roman/italic × latin/latin-ext). latin-ext is required for Hungarian ő/ű and Romanian ș/ț. Never load fonts from Google at runtime.
- Serif for meaning (name, headings, lead, quotes, numbers, footer tagline); sans for function (nav, buttons, labels, body).
- Headings: weight 500, tracking -0.01em. No heavy Inter weights (800–900) anywhere.
- Buttons and nav links are sentence case (Apple grammar); eyebrows, card labels and form labels are spaced uppercase (brand grammar).

## Layout
- Container `min(1180px, 100% − 48px)`; text stacks max 980px, centred.
- Section padding 104px (64px mobile); hero 96/104px; quote band 80px.
- Section headings are centred: eyebrow on its own line, then the serif heading.
- Category and detail pages: centred hero (back link → eyebrow → h1 → meta pills), then image, copy and gallery.

## Elevation & Motion
- Photo shadow only. Header uses frosted glass. Dropdown panel has a soft functional shadow.
- Motion: reveal on scroll (fade + 24px rise), button press `scale(.95)`, card image zoom 1.03, hero portrait entrance + slow breathing zoom. Everything respects `prefers-reduced-motion`.

## Components
See the `components:` block above. Notes:
- **Language dropdown**: one toggle (`HU ˅`) on every screen size; options HU/EN/RO.
- **Hero** has two CTAs: "Dolgozzunk együtt ↗" (primary → #contact) and "Munkáim" (secondary → #work).
- **Gallery** item counts should be even (2-column grid) — 4 or 6 works best.
- **Privacy notice** lives at `/adatvedelem/` (`.legal` modifier: smaller serif h2s, "last updated" note).

## Do's and Don'ts
### Do
- Keep the alternating tile rhythm when adding sections (light ↔ dark / parchment).
- Start every section with an eyebrow + serif heading.
- Use `.gallery-slot` placeholders until real photos exist.
- Add every visible Hungarian string to `public/language.js` (HU → EN) and its English value to `public/romanian.js` (EN → RO), including image `alt` texts. Keys must match the text node exactly (quotes included).
- Bump the `?v=` query of `styles.css` / `script.js` / `language.js` / `romanian.js` in all HTML files after editing them.
- Ship images as WebP (≤ 1400px long side); keep `og-image.jpg` and `favicon.png` as JPG/PNG.

### Don't
- Don't add a second accent colour, gradients (except the project-card image overlay) or shadows on cards/buttons/text.
- Don't use the serif for body copy or buttons, or the sans for headings.
- Don't publish copy the owner hasn't approved — show text and screenshots first, deploy only after a yes.
- Don't load third-party fonts, scripts or trackers (the privacy notice promises none).

## Responsive Behavior
- **≤ 820px**: menu pill + floating nav panel, single-column grids, 64px sections, header 60px, portrait max 360px.
- **≤ 380px**: smaller wordmark (0.98rem, 0.13em) so it fits beside the two pills at 320px.
- `(hover: none), (pointer: coarse)`: gallery switches to tap + swipe.
- `html, body { overflow-x: clip }` prevents sideways scrolling from full-bleed pseudo-elements.

## Implementation Notes
- `public/styles.css` = base rules + an **"Apple-style layer"** block near the end that overrides layout, buttons, tiles and radii. New structural rules belong in that layer (or after it); the base rules still define typography and components.
- `public/script.js`: menu, reveal-on-scroll, gallery preview/swipe. `public/language.js` + `public/romanian.js`: HU/EN/RO switching via `?lang=` and localStorage. `public/visits.js`: visit counter.
- SEO: every page has Open Graph tags (`assets/og-image.jpg`, 1200×630), hreflang links (hu / en `?lang=en` / ro `?lang=ro` / x-default); `sitemap.xml` and `robots.txt` at the root; `404.html` is `noindex` and uses absolute links.

## Known Gaps
- `ART & DESIGN` under the wordmark is English in every language (CSS `content`).
- Three digital category cards link to the same page (`/art-work/fragments-of-tomorrow/`).
- 16 "Hamarosan" slots are waiting for real photos (digital categories, social media, UX/UI, felting).
- Unused original PNGs are still in `public/assets/` next to their WebP versions.
