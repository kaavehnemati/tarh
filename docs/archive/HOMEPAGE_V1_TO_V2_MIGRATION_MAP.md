# HOMEPAGE V1 → V2 MIGRATION MAP

Parity checklist, not a redesign document. V1 = experience source of truth (`Homepage.dc.html`,
1447 lines, inspected directly). V2 = infrastructure source of truth
(`v2/pages/Homepage.dc.html`).

## 01 Hero
V1: 250vh sticky scene. Three oversized lines ("We design"/"beyond"/"the expected") staggered
across grid columns (8/8/8, offset 1/3/5), one-time entrance clip-reveal, then a continuous
depth response as the user scrolls. Scene label "01/08" + metadata bottom-left. Right-edge
rail: vertical 180px track, turquoise square travels top→bottom, numeric readout 000→100.
First homepage project's media begins revealing here (fixed stage panel, `clip-path` reveal).
V2: `TA_SCROLL` drives one continuous progress value; rail/square/counter ported literally
(same visual language, V2 tokens). Media continuity → see §17 below. HeaderNav replaces
V1's custom header.

## 02 Studio
V1: ~200vh sticky. Scene label with 3×3 mini-icon (one lit cell). Large statement, word-by-word
opacity ramp tied to scroll (not a fly-in). Supporting paragraph (V1 has literal `[TEAM SIZE]`/
`[CITY]` placeholders — preserved as explicit placeholders, never invented). "About the studio"
arrow link. Shared project media continues behind/beside this scene.
V2: same word-ramp mechanic via one `TA_SCROLL` progress value; 3×3 icon → one static `TA_MOTIF`
cell (not the moving indicator); placeholders kept literally as `[TEAM SIZE]`/`[CITY]`.

## 03 Selected Projects
V1: dynamic-height sticky stage (`{{ projectStageHeight }}`, scales with project count). One
project owns the stage at a time; four cycling reveal geometries (`STAGE_CLIPS`: full, top-down,
right-to-left, diagonal-from-corner) applied round-robin across projects. Counter (vertically
masked digit swap), title+proposition, restrained metadata, footer with dot indicators + "All
projects" arrow. Mobile: `data-pj-chapters` sequential chapter fallback (chapter-per-project,
no sticky).
V2: `TA_PROJECTS.homepage()` (real, dynamic count — confirmed API). Same four-geometry cycle
literally ported (not replaced with a new signature transition — explicitly out of scope this
pass). Cursor: `VIEW`. Mobile: same sequential-chapter fallback pattern.

## 04 Expertise
V1: 310vh sticky. Scene label + 3×3 indicator square that moves to the coordinate of the
active discipline (`EXP_COORD_OF`, read from `expertise-data.js`'s `presentation.coord` — a
real per-discipline coordinate, not invented). Register of discipline names, active one
emphasized; hover/focus overrides scroll-active state; associated media field cycles per
discipline via clip-path.
V2: `TA_EXPERTISE.all()` (real, dynamic taxonomy). `TA_SECTION_TRACKER` drives scroll-active
discipline; hover/focus override kept (state priority: hover > scroll-active > default).
Motif square driven by the SAME real `presentation.coord` field via `TA_MOTIF`. Cursor:
`EXPLORE`.

## 05 Philosophy
V1: 300vh sticky, Ink surface. Media starts at 78vw×76vh, framed; statement ("Space is not the
result. It is the experience.") sits over it; scene number top-right.
V2: same media-frame concept and copy (not rewritten — canonical V1 authored line kept
verbatim per instruction not to redesign copy); `TA_SCROLL` drives the frame's expansion.
HeaderNav's `transparent-dark` theme applied while this scene owns the viewport (already a
supported V2 capability — no new Header built).

## 06 Research
V1: begins with `margin-top:-100vh`, deliberately overlapping Philosophy's tail so the two
scenes hand off without a hard cut. "Thinking before form" + 4-item process list (Density
studies / Shade & thermal comfort / Brick, tile & reuse / Modular assembly — literal V1 titles,
kept). A drawing field progressively reveals: 3 clip-swept background layers, then a plan
diagram clip-reveals left→right, then 3 annotation notes fade in with a slight lift. Fine
pointer hover on a list item overrides which state is "active"; touch/coarse pointer instead
uses reading-line ownership (whichever list item crosses the reading line).
V2: same overlap technique (negative margin-top pulling Research up under Philosophy's sticky
tail). Same drawing-reveal sequence, scroll-driven. `TA_SECTION_TRACKER` supplies the
touch/coarse-pointer reading-line ownership; hover overrides it on fine pointer — identical
priority rule to Expertise.

## 07 Recognition
V1: calm, no sticky. Scene label + heading. Award rows: year / name / subject, turquoise
square fades in on row hover, row padding tightens slightly on hover.
V2: `TA_AWARDS.homepage()` (real API, confirmed). Same row mechanic; cursor only where a real
associated project resolves (never fabricated).

## 08 Contact
V1: huge 3-line closing statement ("Let's create / what doesn't / exist yet."). A pale-
turquoise square and a turquoise diagonal line respond continuously to pointer position within
the section (a large spatial field, not a decorative static shape) on fine pointer; footer with
Studio/Index/Social columns and explicit `[EMAIL]`/`[PHONE]`/`[CITY]`/`[OFFICE]` placeholders
(kept literal, never invented).
V2: same pointer-driven geometry, implemented as direct style writes on pointer move (no new
motif runtime — this is page-specific spatial choreography, not a `TA_MOTIF` state). On
touch/coarse pointer: falls back to a fixed calm position (V1 has no touch equivalent for this
one interaction; documented as a known V1 gap, not invented for this pass). Same explicit
placeholders.

## Global / shared
- **Custom V1 Header/menu → replaced with `v2/components/HeaderNav.dc.html`.** Not ported as
  code — its accessibility, drawer, and language switch behavior all come from the shared
  component per instruction §48.
- **Custom V1 cursor (`data-cursor-el`, `data-cursor`/`data-cursor-fa` attrs) → replaced with
  shared `cursor.js`** (`data-v2-cursor="view"`/`"explore"`), fine-pointer-only, never on touch.
- **Custom V1 global scroll scheduler → replaced with `TA_SCROLL`** — one subscription for the
  whole page, computing every scene's local progress per tick; no permanent RAF loop, no
  IntersectionObserver dependency for essential behavior (both previously confirmed unreliable
  in this environment; see `PROJECTS_V2_REVIEW.md` from the Projects migration).
- **V1's local 3×3 motif coordinate math → replaced with `TA_MOTIF`**, reading the SAME real
  `presentation.coord` data field V1 already used — the visible behavior is identical, only the
  runtime moved to the shared system.
- **Progress rail** (bottom-right V1 `[data-prog]`) ported literally — same 1px track + 9px
  square + 3-digit counter.
- **Reduced-motion manual toggle** (V1 bottom-left button) ported literally as an explicit
  user-facing override, in addition to (not instead of) the system `prefers-reduced-motion`
  check every other V2 page already respects.
- **Intro morph loader** (V1's one-time 3×3-frame → single-square morph, ~1.9s) — **NOT ported
  this pass**. It is a one-time loading flourish, not a scroll/pointer interaction, and the
  brief's definition of parity is about experienced interaction density during use, not a
  splash animation. Flagged as a known, deliberate scope cut, not a silent omission.

## Content safety
No project/studio/award/research fact invented. `[TEAM SIZE]`, `[CITY]`, `[EMAIL]`, `[PHONE]`,
`[OFFICE]` placeholders kept literal, exactly as V1 has them (V1's own explicit placeholder
convention, preserved rather than resolved or removed).
