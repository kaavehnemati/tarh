# V2 PAGE BLUEPRINT
Planning template — fill this in **before** writing code for a new V2 page.
One row per section. Copy this table for the page being migrated.

## VISUAL RHYTHM (fill in before requesting approval — V2.1)

Chapter sequence — one row per chapter, using `V2_SPATIAL_ARCHETYPES.md`'s archetypes (A–J):

| # | Archetype | Surface sequence | Primary focus | Calm/Focus role | Visual event | Media | Scale state | Spatial interaction | Mobile translation |
|---|---|---|---|---|---|---|---|---|---|
| 01 | | | | | | | | | |

**Visual density map** — a compact summary, e.g.:
```
01 Editorial Hero        LIGHT     TYPE
02 Full Media            MEDIA     IMAGE
03 Split Narrative       LIGHT     IMAGE + TEXT
04 Structured Field      TONAL     DATA
05 Dark Interlude        DARK      STATEMENT
06 Index + Preview       LIGHT     INTERACTIVE MEDIA
07 Closing               LIGHT     TYPE + AMBIENT
```

**WHITE-STACK CHECK** — walk the sequence pairwise; flag any two consecutive chapters that are
both Surface 0/1, text-dominant, without meaningful media, without a structural change, and
without interaction or a significant scale shift (`V2_MIGRATION_PRINCIPLES.md` Principle 01).
Resolve every flag or document why the silence is deliberate before requesting approval.

**BUSYNESS / CALM-FOCUS CHECK** — for every chapter, name its one Primary Focus (Principle
01b: at most one of strong media / strong typography / strong interaction / strong surface
change / strong motion, without an exceptional reason). Then read the Calm/Focus role column
top to bottom and flag any run of 2+ consecutive FOCUS chapters (Principle 01c) — a run of
CALM chapters is fine; a run of FOCUS chapters reads as busy, not rich.

## NARRATIVE SCROLL (V2.2 — fill in for any long-form / high-density page)

- **Interaction density**: LOW / MEDIUM / MEDIUM-HIGH / HIGH — see Principle 12.
- **Active chapter system**: yes/no — if yes, confirm chapters are read from real `data-sec`
  markers already in the DOM (content-aware), never hardcoded per page.
- **Scroll progress**: yes/no.
- **Sticky story**: yes/no — which chapter(s).
- **Scroll-responsive media**: which specific media moments (hero, one/two expansion moments,
  next-content) — budget 3–5 meaningful moments per long-form page, not every image.
- **Page transition**: shared-element or crossfade, applicable only where a real relationship
  (e.g. archive row → detail hero) justifies it.
- **Mobile translation**: compact chapter pill (not a tall rail); sticky→sequential; full-bleed
  media respecting safe areas.
- **Reduced-motion fallback**: no parallax/depth/width-interpolation/drawing-build; chapter
  counter transitions become instant; shared-element transition becomes a plain crossfade; all
  content remains immediately accessible.

## DEPENDENCIES (fill in before requesting approval)

- [ ] Presentation: `../design-system/tokens-v2.css`, `base-v2.css`,
      `responsive-v2.css` only — **NO V1 PRESENTATION DEPENDENCIES**
      (no `../../v1/tokens-v2.css`, `../../v1/responsive.css`,
      `../../v1/ambient.js`, `../../v1/layout-mode.js` — V1's own frozen
      copies, under `v1/` as of cleanup pass 3; `bidi.js`/`reveal.js` no
      longer exist there at all, removed as unused dead weight in pass 2).
- [ ] Runtime: which of `../runtime/{layout-mode,bidi,ambient,reveal,ui-strings}.js`
      the page actually loads (list them — don't load ones it doesn't read).
- [ ] Shared data: which root `*-data.js` / `site-data.js` / `media-utils.js`
      modules the page reads.
- [ ] Shared components: which `../components/*.dc.html` the page imports
      (e.g. `HeaderNav`) — and confirm via `v2/V2_ARCHITECTURE.md` §4 before
      inventing a new one.
- [ ] Confirmed against `v2/V2_ARCHITECTURE.md` §3 — zero root presentation
      imports.

| # | Section purpose | Content type | Surface | Ambient (auto/override) | Motion family | Grid role | 3×3 motif? | Reveal | Reusable component | RTL notes | Responsive change | Reduced-motion fallback |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | | editorial / structured / media / dark / interactive | 0–4 | full/soft/minimal/off — state override reason if not the surface default | reveal / image-depth / transition / interaction | label / body / lead / wide / index / preview / full | yes/no + reason | media/content/group/none + reason | | | | |

**Content type** — pick the closest: `editorial` (statement/prose),
`structured` (register/archive/facts), `media` (image-led), `dark` (Surface
4), `interactive` (form/filter/chronology).

**Ambient** — leave as "auto" (derived from the surface per Principle 01)
unless the section has a specific compositional reason to override; write
that reason down, don't just pick a stronger value because it "should pop."

**3×3 motif** — total across the page should land at 2–4, never one per
section (Principle 04). Decide placements across the whole blueprint before
building any single section. **Motif mode** per motif: `none` / `static` /
`reactive` — if reactive, name its **state source** (selection / local
interaction / narrative chapter) and **why** the movement communicates
meaningful state (never add reactive behavior just because it's available).

**Reveal** — `media` / `content` / `group` / `none`; write the reason.
Dense archive rows, repeated list items, forms and orientation-critical
content (header, H1, primary controls) default to `none` (Principle 07).

**Reusable component** — check `V2_MIGRATION_PRINCIPLES.md` → "Optional
reusable patterns" first: archive filter, chronology/active year,
recognition row, shared image/media treatment, index-with-preview. Only
build something new if none fits.

## SYSTEM CAPABILITIES (fill in for every page — don't infer from other docs)

- **Header theme**: `canvas` (default) or `transparent-dark` — the latter only if this page's
  hero renders full-bleed *under* the sticky header (an overlay-hero layout, not the normal
  stacked flow); state the reason if using it.
- **Contextual cursor**: none, or which actions (`explore`/`view`/`read`/`open`/`select`/
  `next`) on which elements — never applied to every link.
- **Section tracking**: none / local (page-specific, document why the shared tracker doesn't
  fit) / shared (`TA_SECTION_TRACKER`, name the scrollRoot and what UI presents its state).
- **Motif mode**: none / static / reactive — if reactive, name the state source (selection /
  local interaction / narrative chapter) and why the movement communicates meaningful state.
- **Interaction density**: LOW / MEDIUM / MEDIUM-HIGH / HIGH (Principle 12).
- **Mobile translation**: how each of the above adapts below 767px (compact indicators, no
  hover-dependent state, no width-interpolation, etc).
- **Reduced-motion fallback**: what each of the above does under `prefers-reduced-motion`.

## SCROLL ENTRANCE CHOREOGRAPHY (fill in for every editorial/long-form page)

Three distinct layers — never interchangeable, and a page's Interaction Density is not
"MEDIUM-HIGH" merely because it has hover effects; it is set by how much of this section is
actually in play:

- **A. Entry Reveal** — one-time appearance when content enters the reading area
  (`data-reveal="content|media|group"`). Answers: what's visible immediately vs. what enters?
- **B. Narrative Scroll** — continuous response to reading position (Principle 12): active
  chapter, sticky narrative, scroll-responsive media depth, counter transitions.
- **C. Micro Interaction** — hover/focus/cursor/motif. Supporting, never the whole story.

For every major section, answer:
- What is visible immediately (never delayed behind a reveal)?
- What enters on scroll, and via which reveal family?
- What remains static (a deliberate calm chapter, not an oversight)?
- What changes continuously with reading position, if anything?
- What is the section handoff into the next chapter (scale/alignment/surface/crop — never a
  generic fade on every boundary)?
- What is the reduced-motion equivalent (state changes persist; travel/interpolation drops)?

**Scroll quality check**: for long-form pages, a meaningful visual/state event should occur
roughly every 1–2 viewport heights — entry reveal, group stagger, masked media, active-chapter
change, sticky-narrative update, media handoff, drawing build, counter transition, or a
surface/scale handoff all count. This is a rhythm guideline, not an animation quota — charged
whitespace (Principle 01) remains valid; a large *dead* zone with no state change at all is
what this check is meant to catch.

## Before marking the page done
- [ ] EN and FA both validated at 1440 / 834 / 390
- [ ] No opaque background on a `full`/`soft`/`minimal` ambient-zone section
- [ ] No page-local ambient/stacking fix — root has `data-v2-shell="1"` only
- [ ] No page-local motion duration/curve outside the V2 tokens
- [ ] 3×3 motif count on the page is 2–4, not one-per-section
- [ ] Keyboard focus reaches every interactive element (menu, filter,
      chronology row, form)
- [ ] Reduced motion leaves the page fully usable with no missing content
- [ ] Compared against the V1 audit for this page — strengths preserved
