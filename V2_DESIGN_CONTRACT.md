# V2 DESIGN CONTRACT
The short, authoritative brief a future page migration reads before writing
any code. Detailed rules live in the docs below; live archetype specimens
live in `v2/Design System.dc.html`. Reference pages: **About V2, Awards V2,
Journal V2, Contact V2**.

V2 is now physically independent of V1's presentation — see
`v2/V2_ARCHITECTURE.md` for the directory contract. Every rule below is
implemented in `v2/design-system/` and `v2/runtime/`, never the root
`tokens-v2.css`/`responsive.css`/`ambient.js`/`reveal.js`/`bidi.js`/
`layout-mode.js`, which are V1's own frozen copies.

## 0. Spatial editorial system (V2.1 / V2.2 / V2.4)
The V2 interaction language is five roles, never conflated — CURSOR=ACTION,
MOTIF=STATE, REVEAL=ENTRANCE, SCROLL=PROGRESSION, HANDOFF=CONTINUITY. See
`v2/runtime/README.md` for the implementing files and
`V2_MIGRATION_PRINCIPLES.md` Principles 14–15 for the full language and the
fixed per-page Interaction Density table. See `V2_SPATIAL_ARCHETYPES.md` for the ten compositional archetypes plus the
Project Presentation Spine, and `V2_MIGRATION_PRINCIPLES.md` Principles 00,
01, 01b, 01c, 08–12 — Charged Whitespace, No-White-Stack, One Primary Focus,
Calm/Focus Rhythm, Media as a design material, Surface choreography, Scale
contrast, Scroll choreography, and (V2.2) Narrative Scroll Choreography +
Interaction Density. A live specimen of the ten archetypes is in
`v2/Design System.dc.html`. A page's chapter sequence — and, for long-form
pages, its Interaction Density and which Narrative Scroll primitives it
uses — is planned before any code is written; see `V2_PAGE_BLUEPRINT.md`
"VISUAL RHYTHM" and "NARRATIVE SCROLL."

## 1. Brand DNA
Warm canvas + near-black ink, turquoise strictly rationed to state/accent/
signature moments. The 3×3 modular grid is the brand's structural motif
(Principle 04). No cards, no shadows, no radii, no gradients beyond the
ambient signature itself.

## 2. Typography
English: Schibsted Grotesk. Persian: Vazirmatn. Fluid type via V2 typography
role tokens (`--t-dl`, `--t-hl`, `--t-hm`, `--t-hs`, `--t-bm`, `--t-bs`,
`--t-meta`, `--t-eyebrow`, `--t-nav`, `--t-fact`...) — never a raw `clamp()`
or literal `px` value invented per page.

## 3. Grid
`repeat(var(--grid-cols),1fr)` + `--grid-gutter` + `--grid-margin`. Column
roles via `--span-*` tokens (`--span-label`, `--span-body`, `--span-lead`,
`--span-wide`, `--span-index`, `--span-preview`, `--span-full`...). 12 → 8 →
4 columns across breakpoints, driven by the tokens, not page media queries.

## 4. Whitespace
Intentional by default. See Principle 01 — do not fill a quiet section
without asking whether it needs a layer at all.

## 5. Surface selection
Surface 0 canvas / 1 soft light / 2 tonal-structured / Media Stage (real
canonical media controls the visual field) / 4 dark. Pick per section by
content role, not by "needs visual interest." `--media-placeholder` is the
loading/unavailable-media plate — a content STATE, not a page Surface;
`--surface-3` survives only as a deprecated alias to it for back-compat.

## 6. Global ambient behavior
One page-level field, surface-aware zones. See Principle 01 in full. Opt in
with `data-v2-shell="1"` on the page root; zone each section.

## 7. 3×3 motif
See Principle 04. Plan placements before building (see the Page Blueprint).
Reactive use (motif moves with selection/hover/reading state) is available
via `../runtime/motif.js` — one reactive motif per page is usually enough;
see Principle 04 for the four modes and the Cursor-vs-Motif distinction.
Implementation: 9 outline cells + ONE turquoise `::after` square positioned
with `transform` — never a two-cell fade/fill swap, which reads as a state
flip rather than motion.

## 7b. Contextual Cursor
`../runtime/cursor.js` — a shared, page-agnostic circle (`var(--c-cursor-size)`,
~76px) with a short label communicating **ACTION** (distinct from the
Motif's STATE): `explore`/`view`/`read`/`open`/`select`/`next`, tagged via
`data-v2-cursor="<key>"`, labelled from `TA_UI_V2.cursorLabel()`. Fine
pointer + hover only (disabled entirely on touch/coarse — no invisible
logic runs there); native cursor stays default everywhere else and native
`cursor:none` applies only on the specific eligible target, never globally,
never on a form control/contenteditable. `aria-hidden`, never focusable —
keyboard users get the equivalent through `focus-visible`/row emphasis, not
a fake cursor. Reduced motion: near-direct tracking, no lag. One shared DOM
element + one shared listener for the whole page.

## 7c. Shared Section Tracker
`../runtime/section-tracker.js` (`TA_SECTION_TRACKER.track({root, selector,
scrollRoot, onChange})`) — ONE algorithm for "which section owns the
reading line" (42% of the scroll root's own viewport height), returning
STATE only (`{key, index, total, el}`); a page decides the UI (Projects:
chapter pill + rail; About: active History milestone; Journal: Contents).
`scrollRoot` defaults to `window` but accepts a scrollable element for a
tracker scoped to an internal scroll container. ONE scroll listener + ONE
coalesced (setTimeout) scheduler PER scrollRoot, shared across every
tracker registered on that root — removed once the last tracker on that
root unregisters. Never IntersectionObserver/requestAnimationFrame (both
confirmed unreliable in this preview environment) and never a permanent
loop. Projects Detail's own chapter/expansion/drawing/narrative tracking
remains local to that page (deliberately deferred — see
`V2_3_EXPERIENCE_HARDENING_AUDIT.md`).

## 7d. Header Themes
`HeaderNav`'s `theme` prop supports exactly two values: `canvas` (default —
solid surface, ink text) and `transparent-dark` (transparent background,
light text, no border — for sitting over a dark/media hero). Do not add a
third theme. `transparent-dark` requires the page to actually render a
hero/media surface *underneath* the sticky header — never activate it just
because a page has a dark section somewhere else. Projects Detail stays
`canvas` until its hero is restructured to render under the header (an
overlay-hero layout change, not yet made).

## 8. Motion
V2 motion tokens only: `--m-instant/fast/standard/reveal/slow/page` ×
`--e-editorial/cinematic/smooth/page`. No page-invented duration or curve.
Important media/content may use the shared **Progressive Reveal** system
(`reveal.js`, `data-reveal="media|content|group|none"`) — rebuilt on the
same scroll+scheduled-timeout mechanism as the rest of V2's runtime, never
IntersectionObserver — see Principle 07. Not everything animates; dense/
repeated/orientation-critical content is
`none`.

## 9. Responsive navigation
See Principle 02. Desktop full nav, ≤767px labelled MENU trigger.

## 10. RTL / bilingual rules
`dir="{{ dir }}"` on the root. All mixed Persian/Latin/numeric strings go
through `TA_BIDI.parts()`/`.cls()` (`../runtime/bidi.js`) — never a
hand-rolled bidi override. Persian composes its own line breaks and grid
placement; it is never a mirror of the English layout. Global chrome words
(Menu, Close, Filter, Reset, Next, Previous) come from
`window.TA_UI_V2.t(key, lang)` (`../runtime/ui-strings.js`) — page copy
stays page-local.

## 11. Reusable editorial patterns
Check `v2/V2_ARCHITECTURE.md` §4 and `v2/components/README.md` before
inventing a new interaction or component for a problem already solved —
and before assuming two similar-looking sections are the same component
(some aren't; see §4's rejected extractions).

## 12. Forbidden patterns- Cards, shadows, corner radii, decorative gradients outside the ambient
  signature.
- A page-local ambient/stacking fix — use `[data-v2-shell]`.
- A page-local motion duration/curve — use the tokens.
- Filling whitespace "because it looks empty."
- Mirroring English layout for Persian instead of composing it.
- One 3×3 motif per section, or a motif that is independently focusable.
- Inventing a font size, weight or spacing value outside the token roles.

## 13. Migration process
1. Read `V2_PAGE_BLUEPRINT.md` and fill it in for the page being migrated.
2. Audit the V1 page; note what must survive (composition, content,
   signature interactions).
3. Build against this contract, section by section, per the blueprint.
4. Validate EN/FA, desktop/tablet/mobile, reduced motion, keyboard.
5. Compare against the V1 audit — confirm strengths preserved, not
   pixel-identical.
