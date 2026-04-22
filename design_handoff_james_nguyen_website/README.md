# Handoff: James A. Nguyen — Personal Academic Website

## Overview

A personal website for James A. Nguyen, a Ph.D. student in Statistics at UC Irvine working on Bayesian inference. The site presents his research, writing, teaching, and CV in an editorial, handcrafted aesthetic — part academic journal, part design notebook. Visual vocabulary borrows from Japanese sashiko stitching (hand-drawn dashed dividers), architectural graph paper (subtle background grid), and Bayesian probability curves (the hero's animated posterior-update graphic).

## About the Design Files

The files in this bundle are **design references created as a self-contained HTML prototype**. They are not production code to ship directly. The goal of this handoff is to **recreate these designs in the target codebase's environment** — ideally a modern React + Vite (or Next.js) setup with CSS Modules / Tailwind / a styling solution of your choice — using the established patterns of that codebase.

The prototype uses React 18 loaded via a `<script>` tag with inline Babel. In production this should be compiled normally, and the components should be split into proper modules. Reuse the component boundaries (`HomeBlueprint`, `InstructionBlueprint`, `CVBlueprint`, `CollaboratorsBlueprint`, `GuideBlueprint`, `ProjectDetailEditorial`) as-is.

## Fidelity

**High-fidelity.** The prototype reflects final colors, typography, spacing, and micro-interactions. Recreate pixel-for-pixel using the codebase's existing libraries. Text content is placeholder-ish in a few spots (marked "tbd" or with placeholder projects) — keep the structure and ask James for final copy.

## Routing

Single-page app with hash-based routing:

| Hash | Component | Purpose |
|---|---|---|
| `#home` (default) | `HomeBlueprint` | Index / about / projects / instruction teaser / contact |
| `#instruction` | `InstructionBlueprint` | Teaching archive |
| `#cv` | `CVBlueprint` | Full curriculum vitae |
| `#collaborators` | `CollaboratorsBlueprint` | People James has worked with |
| `#guide` | `GuideBlueprint` | "A Student's Guide to Numerical Bayes" — longform writing |
| `#project/<id>` | `ProjectDetailEditorial` | Individual project pages (editorial serif treatment) |

When porting to Next.js or React Router, replace hash routing with real routes: `/`, `/instruction`, `/cv`, `/collaborators`, `/guide`, `/projects/[id]`.

## Design Tokens

All tokens live in `shared/tokens.jsx` on `window.JN_TOKENS`. Port to CSS custom properties or a theme object:

### Colors
```
--paper:       #f4f1ea    /* primary background (warm bone) */
--paper-warm:  #efeadf    /* alt bg */
--paper-cool:  #edeae3    /* cooler alt */
--ink:         #1a1a1c    /* near-black body text */
--ink-soft:    #2c2a28    /* slightly lighter body */
--mute:        #6e655a    /* warm muted gray */
--mute-cool:   #5a5c62    /* cool muted gray (eyebrow labels) */
--rule:        #cec8bb    /* rule / border */
--rule-soft:   #e2dccf    /* softer rule */

--red:         #7a1a1a    /* oxblood — primary accent, links, sashiko */
--red-ink:     #5e1515    /* deeper red */
--red-soft:    #a23d32    /* softer red */
--red-tint:    #e8d6d0    /* very light red for tinted backgrounds */

--blue:        #2b3f6b    /* muted indigo — secondary accent (likelihood curve) */
--blue-soft:   #4d6a9a
--blue-tint:   #d3dbe8
```

### Typography

Three font pairings are supported via a Tweaks panel in the prototype. **Primary pairing (default, use this):**

- **Serif (display + body):** `Libre Caslon Text`, fallback `Libre Baskerville`, then `Georgia, serif`
- **Mono (meta labels, small caps, data):** `IBM Plex Mono`, fallback `ui-monospace, Menlo, monospace`
- **Sans (eyebrows, UI labels):** `IBM Plex Sans`, fallback `system-ui, sans-serif`

Project-detail pages use an editorial variant: `Libre Baskerville` serif + `Archivo` sans + `IBM Plex Mono`.

All loaded from Google Fonts — see the `<link>` in `index.html` for the exact query.

### Type scale (home / blueprint pages)
- Hero H1: `clamp(40px, 6.4vw, 96px)`, line-height 1.02, letter-spacing -0.02em, weight 400
- Section H2: 44–56px serif, weight 400
- Body lead: 22px serif, line-height 1.45–1.5
- Body: 16–17px serif, line-height 1.65
- Eyebrow labels: 11px mono/sans, uppercase, letter-spacing 0.14–0.18em
- Small meta: 13px sans, letter-spacing 0.02em

### Spacing
- Page horizontal padding: **72px** (left and right)
- Section vertical padding: **72px** top and bottom
- Hero: 72px top, 48px bottom
- Grid gaps: 40–56px
- Content max-widths: 560px (prose), 680px (hero text), 960px (wide two-column)

### Border radius
Mostly **0** — this design is crisp and architectural. Rounded corners are avoided. A few exceptions: small pill buttons use 2px; hand-drawn circled accent (see `CircledWord`) uses an SVG ellipse with a slight tilt.

### Shadows
None on primary UI. The Tweaks panel uses `0 8px 32px rgba(0,0,0,0.25)`.

## Textures

Three custom textures are defined in `shared/tokens.jsx` under `window.JN_TEXTURES`. All are generated as inline SVG `data:` URIs.

### 1. Graph paper (page background)
Subtle warm grid, 26px squares, rule color `#8a7a60` at ~3.5% opacity. Applied as `background-image` to every page body. Creates the "academic notebook" base layer without drawing attention.

### 2. Sashiko running-stitch divider (`sashikoRule`)
Horizontal dashed rule that separates sections. Visually critical — **not a plain CSS dashed border**. Each stitch is hand-drawn:
- 11 stitches across a 200×12 tile, repeated horizontally
- Varied lengths (7–15px), varied stroke widths (0.9–1.6px) — pressure variation
- Each stitch is a quadratic bezier with a per-stitch wobble (not a straight line)
- Each stitch tilts slightly differently
- Small ink-bleed dots at endpoints (circles, 0.6–0.7× stroke width)
- Blurred bloom pass underneath (2.4× stroke width, filtered, 22% opacity) for ink bleed
- Full opacity — do not fade

Rendered via an SVG tile repeated on `background-image`, tile size 200×12px. Rendered as a 12px-tall div. The exact SVG is in `tokens.jsx` — lift directly.

### 3. Komorebi overlay
Soft warm dappled-light ellipses with Gaussian blur, layered with `mix-blend-mode: soft-light` at ~0.5 opacity. Applied only to the hero and collaborators sections. Creates the "sunlight through leaves" warmth without intruding.

## Screens / Views

### Home (`HomeBlueprint`)

**Top nav** (single row, sticky-feeling, sits at top):
- Left: wordmark `James A. Nguyen` — italic serif "James A." + red "Nguyen", 17px, no spacing quirks
- Right: plain serif text links — `index`, `about`, `projects`, `instruction`, `contact`. Hover: red underline, 1px, offset 3px.
- A hamburger opens secondary links: `CV`, `Collaborators`, `A Student's Guide to Numerical Bayes`.

**Hero** (`#index`):
- Full-width, padding `72px 72px 48px`
- Komorebi overlay behind (subtle warm light)
- Inside: relative container. Max-width text block on the left (680px).
  - `James A. Nguyen` H1 (huge serif, with "Nguyen" in italic wrapped in `<CircledWord>` — hand-drawn red ellipse circle around the word, slight tilt)
  - Intro paragraph: 22px serif, 560px max. Mentions advisors Eric Sudderth and Stephan Mandt in red.
  - Short 120px sashiko divider, 36px vertical margin.
  - Meta row: three blocks (Program / Advisors / Cohort) — eyebrow label 11px mono uppercase + value 13px sans.
- **Bayesian hero graphic**: `BayesianHero` component absolutely positioned `right: -24px, bottom: 0` at `width: min(560px, 55%)`, `height: 220px`, z-index 2 (renders on TOP of the heading text, intentionally). 90% opacity. Plays a load animation on first paint.

**Sashiko divider** between every section.

**About** (`#about`):
- Padding `72px 72px`
- `SheetHeaderB` — section marker: tiny italic serif `§ I` + red sashiko accent + section title ("About") + subtitle italic "A few words"
- Two-column: 420px photo (saturate 0.7, contrast 1.02) + caption in italic, right col is prose + interests eyebrow

**Projects** (`#projects`):
- Section header "Projects" / "Selected work, 2023–2025"
- List of project rows. Each row:
  - Left: project number (small mono) + title (32px serif) + one-line description (17px serif ink-soft) + tags (11px mono uppercase, mute color)
  - Right: date stamp + arXiv/PDF links in red with subtle underline + `read →` CTA linking to `#project/<id>`
  - 1px top border in `rule` color between rows
- Project data in `shared/data.jsx` under `window.JN_DATA.projects`

**Instruction teaser** → link to `/instruction`.

**Contact** (`#contact`):
- Plain email + social links in red

### Instruction (`InstructionBlueprint`)
Teaching archive. Same chrome. Section headers for each course; rows of term + course code + title + role (TA / instructor). Direct, no-nonsense.

### CV (`CVBlueprint`)
Full academic CV. Sections: Education, Publications, Talks, Awards, Service. Same sashiko dividers. Mono for year columns, serif for titles.

### Collaborators (`CollaboratorsBlueprint`)
Grid of people James has worked with. Small portraits (placeholder avatars okay), name, affiliation, link.

### Guide (`GuideBlueprint`)
Longform writing: "A Student's Guide to Numerical Bayes". Narrow column, 680px max, larger line-height (1.7), pull quotes in italic, section numbers.

### Project Detail (`ProjectDetailEditorial`)
**Different visual language** — uses Editorial / A treatment:
- `Libre Baskerville` serif + `Archivo` sans
- More generous type, drop cap on first paragraph, italic pull quotes
- Figure captions center-aligned italic
- Back link (`← all projects`) in red
- Contains: title, subtitle, date, collaborators, arXiv/PDF buttons, abstract, body prose, figures

## Interactions & Behavior

### Hero animation (`BayesianHero`)
On first page load this session, animates over 2.6s:
1. Prior (wide red bell curve) fades in 0–45%
2. Likelihood (narrower blue dashed curve, shifted right) fades in 35–80%
3. Posterior (narrow red filled curve, between prior and likelihood by Bayes rule) emerges 55–100%
4. Monospace labels fade in 80–100% (hidden in current hero variant; set `showCaption={true}` to show)

Easing: `easeOutCubic`. Uses `sessionStorage` keyed on the `seed` prop to avoid replaying on navigation within a session. The hero uses `seed="hero3"` — change this to force a replay.

### Scroll
All nav anchors use `scroll-margin-top: 64px` so the sticky nav doesn't overlap.

### Hover states
- Text links: red underline, 1px, 3px offset, no color change
- Project rows: no hover on the whole row; only the `read →` link underlines
- `CircledWord` is decorative only — not interactive

### Click / nav
- Nav items call `nav(page, id)` which sets `window.location.hash` and scrolls to top
- Project rows call `nav('project', p.id)`
- Hash changes are listened to so back/forward work

### Page transitions
None — snappy hash change, instant re-render, scroll-to-top.

## State Management

Almost entirely stateless. The only persistent state:
- `window.location.hash` → current route (via custom `useRoute` hook)
- `sessionStorage['jn_hero_played_hero3']` → whether the hero animation has played this session
- The prototype's Tweaks panel persists a `fontPairB` / `fontPairA` choice via `window.parent.postMessage` — **remove this in production**; pick one font pair and commit to it.

## Assets

In `assets/`:
- `about_banner.jpg` — James at UCI Rowland Hall (used in About section)
- `hero_original.png` — reference image, not used in current design
- `name_logo.png` — reference, not used

Replace with final photos from James. The About photo is rendered at `saturate(0.7) contrast(1.02)` — keep that filter.

## Files in this bundle

- `index.html` — full self-contained prototype, open in a browser to see the final result
- `shared/tokens.jsx` — design tokens + SVG texture generators (sashiko, graph paper, komorebi)
- `shared/data.jsx` — all copy (projects, publications, courses, collaborators, CV entries)
- `shared/BayesianHero.jsx` — the animated distribution curves component
- `shared/CircledWord.jsx` — hand-drawn SVG ellipse wrapper for inline text emphasis
- `pages/JamesWebsite.jsx` — all page components + routing + nav chrome

## Recommended production stack

- **Framework:** Next.js 15 (app router) or Vite + React Router
- **Styling:** CSS Modules or Tailwind with the color/spacing tokens above as custom properties
- **Fonts:** `next/font` or self-host the Google Fonts listed
- **Images:** `next/image` with blur placeholders for the About photo
- **Deploy:** Vercel or Netlify (it's a small static site)

## Notes

- **Do not add back** the visual elements that were explicitly removed in design review: blueprint grid, `DOC/REV/SHEET` meta bar, large mono section numbers (`01`, `02`), coordinate labels (`N 33.645°`), roman-numeral footer, caption bars like `FIG. 01 / BAYES UPDATE`. The design is intentionally quieter than those earlier iterations.
- Sashiko stitches must remain **hand-drawn and full opacity** — don't swap to a CSS `border-bottom: dashed`; it will not look right.
- The Bayesian hero graphic deliberately renders on top of the heading text (z-index 2). Do not move it behind.
- Keep left/right page padding at 72px — narrower margins feel cramped.
