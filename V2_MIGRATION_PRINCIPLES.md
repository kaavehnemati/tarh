# V2 MIGRATION PRINCIPLES
Canonical global rules every future page migration inherits. **V2.1 revision**
(Spatial Editorial): supersedes all prior versions. About V2 and Journal V2 are
now the strongest reference implementations for visual rhythm (see
`V2_VISUAL_RHYTHM_AUDIT.md`); Awards and Contact are being brought up to the
same standard.

## PRINCIPLE 00 — Consistency is not simplicity
A consistent design system is not the same thing as a reductive one.
**CONSISTENCY ≠ SIMPLICITY. MINIMALISM ≠ EMPTINESS.** The V2 foundation
(tokens, grid, motion, ambient) exists so every page can be visually rich in a
coherent way — not so every page converges on the same white-canvas-plus-rules
look. **MEDIA IS A DESIGN MATERIAL**, not optional decoration — see Principle
08. **MOTION EXPLAINS RELATIONSHIPS** — see Principle 07 and
`V2_SPATIAL_ARCHETYPES.md`'s scroll-choreography patterns, never motion for
its own sake.

## PRINCIPLE 01 — Charged whitespace + the No-White-Stack rule
Whitespace is not a problem to fill, but it is not free either: **every large
spatial pause must have an intentional role** — it may frame a major
statement, stage media, support ambient atmosphere, hold an interaction,
create anticipation, separate chapters, or create deliberate visual tension.
A large empty area that exists only because "minimalism reads as
sophisticated" fails this principle.

**NO-WHITE-STACK** (design QA rule, not a hard CSS rule): two consecutive
major chapters should not both be Surface 0/1, text-dominant, without
meaningful media, without a structural change, without interaction, and
without a significant scale/composition shift — unless the sequence's
deliberate concept is silence/emptiness. Run this check (`V2_PAGE_BLUEPRINT.md`
"WHITE-STACK CHECK") before any page is approved. See
`V2_VISUAL_RHYTHM_AUDIT.md` for worked examples of a pass and a fail.

Where a large light (Surface 0/1/2) area is genuinely dry, it is enlivened by
the **one global ambient field** (`[data-ambient-page]`, mounted once by `ambient.js`), never
by a page- or section-local effect. A page opts in once, at the root, with
`data-v2-shell="1"` — this gets it the canonical stacking (transparent root,
canvas on `<body>`, ambient field correctly layered between them) with no
local override needed. Each section then declares `data-ambient-zone="full|
soft|minimal|off"`, which sets the field's opacity while the shared
Section Tracker (scroll + scheduled timeout, not IntersectionObserver —
see Principle 12) reports that section owns the reading position:
Surface 0/1 → full/soft, Surface 2 → soft/minimal, Surface 3/4 → off (their
normal opaque or image background is the intentional occlusion). Any section
using full/soft/minimal must stay transparent or use a `color-mix(in srgb,
var(--surface-N) X%, transparent)` tint — an opaque background defeats the
zone regardless of its value. Pointer position is tracked continuously in
viewport space, so it never resets at a zone boundary and the same field
reappears at the current pointer position after a dark/image section.
Adjacent light zones must show no visible cut.

## PRINCIPLE 01b — One primary focus per viewport
At any moment a chapter has a **primary focus**, a **secondary support**, and a
**background atmosphere** — never more than one layer dominating at once. If
real media is primary, typography supports and ambient/motif recede to
background. If oversized typography is primary, no competing large media
animation runs alongside it. Never stack strong media + strong typography +
strong motion + strong ambient + strong motif in the same viewport without
an exceptional narrative reason — that reads as busy, not rich.

## PRINCIPLE 01c — Calm / focus rhythm
A visually strong ("focus") chapter is generally preceded or followed by a
calmer chapter: `CALM → FOCUS → CALM → STRUCTURED → FOCUS → CALM`, not
`FOCUS → FOCUS → FOCUS → FOCUS`. This is the composed counterpart to the
No-White-Stack rule (Principle 01) — that rule catches too much quiet in a
row, this one catches too much intensity in a row. A page should feel
composed, not decorated.

## PRINCIPLE 02 — Explicit labelled responsive MENU
Desktop keeps full inline navigation. At ≤767px the nav collapses to one
bordered, labelled trigger — text + ☰, never an icon alone, never a
contextual page name standing in its place. Brand and language stay directly
accessible in the header at every width. Opens `[data-v2-menu-drawer]` on
`var(--m-page)`/`var(--e-page)`. Canonical CSS lives in `tokens-v2.css`
under `[data-v2-menu-trigger]`/`[data-v2-menu-drawer]`.

## PRINCIPLE 03 — Progressive disclosure for secondary controls
Secondary controls must not compete with primary content. On an archive/list
page with multiple filter dimensions, keep primary controls visible (title,
sort, result count) and collapse categories behind one explicit labelled
FILTER trigger with an active-count indicator, expanding an inline panel —
never a permanent chip row, never a modal. Reference: Awards V2 Archive.
Reusable for any future filterable register (Projects, Journal) when the
content genuinely has multiple filter dimensions — do not add a filter to a
page that doesn't need one.

## PRINCIPLE 04 — Modular 3×3 grid as brand signature
The 3×3 modular grid inherited from V1 is a recurring visual signature in
V2. One shared implementation (`[data-grid-motif]`, static/interactive/
inverse, sizes micro/standard/anchor, `data-motif-active="1..9"` for
deterministic progression) — never a page-local reimplementation. Use it as
spatial punctuation: 2–4 meaningful appearances per page, never
mechanically one per section. Decorative: `aria-hidden`, never independently
focusable. Static under reduced motion. May sit on light, dark or media
surfaces where the composition supports it.

**Reactive Grid Motif** — the same shared element, extended in *behavior*
only (never a second visual system): in selected contexts the active cell
may move to reflect real state, via `data-motif-active` — the active cell is
ONE `::after` square positioned with `transform`, moved between the grid's
nine cell positions; the nine outline `<i>` cells never change fill (never a
fade-swap between two filled cells, which reads as a state flip rather than
motion). Four modes: **static** (normal punctuation, default) — **local
reactive** (a nearby interaction changes the cell temporarily, e.g. hover) —
**persistent selection** (the cell moves to the selected item's position and
stays until selection changes) — **narrative reactive** (a scroll/reading
state updates it; use sparingly). State priority: temporary interaction
(hover/focus) > persistent selection > default (cell 5). **Deterministic
mapping only** — `../runtime/motif.js`'s `TA_MOTIF.cellForIndex(i)` is the
one canonical index→cell path (`5,2,6,8,4,1,3,9,7`, cycling past 9); no page
invents its own sequence. **Cursor vs. Motif**: the Contextual Cursor
(Principle 13) communicates *action* (VIEW/READ/OPEN); the Reactive Motif
communicates *state* (which item is selected/active) — they do different
jobs and may coexist, never duplicate each other. Reactive capability is not
an invitation to add more motifs — one reactive motif per page is usually
enough; the 2–4 total-appearances budget is unchanged. Keyboard parity is
automatic (`focus-visible` already drives the same state the pointer does,
since both flow through the same page state); reduced motion keeps the
state change but the travel transition shortens (tokens-v2.css already
disables the `::after` transition under `prefers-reduced-motion`).

## PRINCIPLE 05 — Structure vs. atmosphere
Use Structural Grid surfaces (`data-grid-surface="light|standard|dense"`)
for information-led content — archives, facts, project information — and
the Global Ambient field for spatial/editorial content. These are
independent capabilities, not alternatives: a light structural surface may
carry both its own registration lines and a soft/minimal ambient zone at
once. Do not collapse the two into one treatment, and do not leave
experiment-only flags in production markup once the experiment is settled.

## PRINCIPLE 07 — Progressive reveal, not universal animation
Important media and selected editorial content may enter through the shared
V2 Reveal System (`reveal.js` + `[data-reveal]`). Reveal is hierarchical —
`media` (masked settle, `--m-slow`/`--e-cinematic`), `content` (fade+lift,
`--m-reveal`/`--e-editorial`), `group` (≤5 staggered children) — one-time,
and restrained. Dense archive rows, repeated list items, forms and
orientation-critical content (header, H1, primary controls) stay `none` /
immediately available. Resource loading and visual reveal are separate
concerns: an asset preloads/decodes on approach, but the transition only
fires once it is both ready and in the reading area, so slow and fast
connections still produce one coherent experience.

---

## PRINCIPLE 08 — Media is a first-class design material
For an architecture studio, real project photography, renders, drawings,
sketches, plans, diagrams and process/archival imagery are primary design
material — not optional content slotted into a placeholder. **Never invent a
decorative image and never use stock media**; a section with no canonical
media available stays a Structured Field, Visual Fact Field, Dark Interlude
or editorial chapter instead of faking one (see `V2_SPATIAL_ARCHETYPES.md`).
Visual hierarchy, in order: content → real media → composition/scale →
interaction → surface → ambient → decorative motif. Ambient is atmosphere,
continuity and brand signature — it is never a substitute for imagery,
composition, or a genuinely empty page's real problem.

**Visual-event rhythm** (guideline, not a strict quota): on a long editorial
page, aim for a meaningful visual event — real media, a drawing/diagram, a
large fact, a sticky-media change, an index preview, a dark interlude, an
interactive chronology, or a major typography event — roughly every 1–2
viewport heights.

## PRINCIPLE 09 — Surface choreography
Surface 0 (primary warm editorial canvas), Surface 1 (soft grouping/spatial
variation), Surface 2 (structured/information-led), a Media Stage (real
canonical media controls the field), and Surface 4 (dark interlude) form a
sequence across a page, not a menu of independent choices per section. A
long page should not remain Surface 0 + transparent sections throughout —
see the No-White-Stack rule (Principle 01).

## PRINCIPLE 10 — Scale contrast reflects narrative importance
Deliberate moments of XL / M / micro typography within one page — not every
section typographically equal, and not enlarged arbitrarily. Scale changes
mark what the page wants read first.

## PRINCIPLE 11 — Scroll choreography is a separate layer from micro motion
**Micro motion** (hover, focus, filter, buttons, motif, small indicators) and
**spatial motion** (chapter change, media change, archive↔detail, timeline
progression, scroll story) are different layers — document and reason about
them separately. Optional spatial patterns: sticky media change, index
preview, media handoff between related chapters, active-chapter tracking
(timeline/TOC), and calm section-state transitions (surface/contrast change
between chapters). **No universal parallax** — do not move every image on
scroll, and do not make the site read as a motion demo; scroll behavior must
explain hierarchy, relationship or progression, never demonstrate capability
for its own sake.

## PRINCIPLE 12 — Narrative Scroll Choreography
A fourth motion layer, between Progressive Reveal and page transitions:
`MICRO MOTION → PROGRESSIVE REVEAL → NARRATIVE SCROLL → PAGE TRANSITION`.
Progressive Reveal alone (fade elements in as they arrive) is not sufficient
for a long-form page to feel alive — it should also respond continuously to
reading progress. Ten reusable primitives (not all mandatory on any one
page):
1. **Section awareness** — the system knows which chapter is active, from
   real `data-sec` markers already in the DOM, never a hardcoded position.
2. **Scroll progress** — a restrained indicator (1px track + small square
   marker, no thick bar, no percentage unless it earns its place).
3. **Active chapter indicator** — a small, content-aware "N / total — label"
   readout, never a large sticky nav panel.
4. **Scroll-responsive media** — subtle settle (≤5% translate, ≤1.02 scale)
   as a media block leaves the viewport, computed inside the shared
   scroll-driven tick (see Principle 12's Shared Section Tracker —
   IntersectionObserver/requestAnimationFrame are confirmed unreliable in
   this preview environment, so nothing here depends on either).
   loop).
5. **Media expansion** — a major media chapter widens from contained toward
   full-bleed as it enters the reading zone. 1–2 uses per page, not every
   image.
6. **Sticky narrative** — media stays anchored while chapters scroll past it,
   with a synchronized counter.
7. **Number/counter transition** — small vertical digit transitions for
   story sequence / chronology / facts / contents counters.
8. **Drawing build** — a primary drawing reveals via clip/line progression
   instead of a plain fade; secondary drawings stay calm.
9. **Section handoff** — a chapter's ending cues the next through scale,
   alignment, or a surface change — never a generic fade between every pair
   of sections.
10. **Page transition** — archive↔detail or next-content handoff using a
    real shared-element relationship where justified, `--m-page`/
    `--e-cinematic` timing, reduced motion becomes a plain crossfade.

**Interaction density** — every page picks one: LOW (forms, structured
information), MEDIUM (About/Awards-style archives), MEDIUM-HIGH (Journal
Detail, Project Detail), HIGH only when justified (immersive storytelling).
Higher density does not mean more elements move — it means more of the ten
primitives above are in play, deliberately.

**Motion hierarchy stays intact**: at any moment only one spatial motion
dominates (Principle 01b extended) — if media is expanding, typography/
ambient/motif stay calm; if a sticky narrative is active, its surroundings
stay calm. Global Ambient is never itself a scroll effect — it remains
pointer/touch atmosphere; Narrative Scroll is a separate, deliberate system.
Performance: one shared passive scroll listener per tracker instance (see
the Shared Section Tracker below), coalesced via a scheduled timeout —
never IntersectionObserver/requestAnimationFrame (both confirmed unreliable
in this preview environment) and never an always-running loop.

**Shared Section Tracker** (`../runtime/section-tracker.js`) — ONE algorithm
for "which section is nearest the reading line" (~42% of viewport height),
extracted so no page reimplements it locally. `TA_SECTION_TRACKER.track({root,
selector,onChange})` registers a subscriber and returns a `stop()`; each
tracker owns its own scroll listener + coalesced schedule (no shared global
loop across trackers, no permanent RAF). Provides STATE only — a page
decides how to present it (About: active History milestone; Journal:
active Contents item + reading progress; a future page: whatever fits).
Projects Detail's own chapter/expansion/drawing/narrative tracking remains
local to that page for now (documented in
`V2_3_EXPERIENCE_HARDENING_AUDIT.md` — a safe migration was not attempted
against an already-verified reference implementation in the same pass as
other fixes).

## PRINCIPLE 13 — V2 Contextual Cursor
A shared, page-agnostic interaction primitive (`../runtime/cursor.js`) — a turquoise circle
(~76px) with a short contextual label (EXPLORE/VIEW/READ/OPEN/SELECT/NEXT, from
`TA_UI_V2.cursorLabel()`, never hardcoded per page) that appears only over elements explicitly
tagged `data-v2-cursor="<key>"`. **Not a global mouse replacement** — the native cursor stays
default everywhere else. Fine-pointer + hover only (`(hover:hover) and (pointer:fine)`);
unbinds its one delegated `pointermove` listener entirely on touch/coarse pointers — no
invisible cursor logic runs there. Never activates over `input`/`textarea`/`select`/
contenteditable. `aria-hidden`, `pointer-events:none`, never focusable, never the only signal
a target is interactive (every tagged element still needs its own visible label/focus state —
keyboard users get the equivalent through `focus-visible`/row emphasis/preview update, never a
fake cursor). Reduced motion: the pointer-lag interpolation collapses to near-direct tracking;
appearance/disappearance still use `--m-fast`/`--e-smooth`, never a page-invented duration.
One shared DOM element and one shared listener for the whole page — a page never creates a
second cursor engine or attaches per-target listeners.

**When to use**: a genuinely contextual action a hover already implies — an archive row that
opens a project (`view`), a featured story that opens for reading (`read`), a large media block
that expands/opens (`open`), a chronological next-item link (`next`), an index row that expands
detail (`explore`). **When not to use**: every link on the page, body-copy links (text
selection must stay intact), any page or section where a stronger spatial motion already
dominates the viewport (Principle 01b) — the cursor is supporting, not competing.

## PRINCIPLE 14 — The V2 interaction language (five roles)
Formal, non-negotiable division of responsibility — see `v2/runtime/README.md`
for the implementing files:

- **CURSOR = ACTION** (`cursor.js`) — what clicking/tapping this will do.
- **MOTIF = STATE** (`motif.js`) — which item is currently selected/active.
- **REVEAL = ENTRANCE** (`reveal.js`) — one-time appearance as reading
  position reaches content.
- **SCROLL = PROGRESSION** (`section-tracker.js` + the shared
  `scroll-coordinator.js`) — continuous response to reading position.
- **HANDOFF = CONTINUITY** — a page-composed transfer of attention between
  chapters (scale/alignment/surface/crop change), not a shared runtime file.

These never substitute for one another. A section is not "interactive"
because it has a cursor label with no state or progression behind it — see
Principle 12's four-layer breakdown (Micro Interaction / Entry Reveal /
Narrative Scroll / Page Transition) for how density is actually judged.
**INTERACTIVE ≠ EVERYTHING MOVES**: a visitor must be able to scroll a
long-form page without touching the mouse and still feel meaningful
progression exactly where that page's Interaction Density calls for it —
never uniformly, never as decoration.

## PRINCIPLE 15 — Page-specific Interaction Density (fixed targets)
Consistency means one interaction language, not one interaction *amount*:

| Page | Density |
|---|---|
| Projects Detail | HIGH |
| Expertise | MEDIUM-HIGH |
| Journal Detail | MEDIUM-HIGH |
| About | MEDIUM |
| Journal Archive | MEDIUM |
| Awards | LOW-MEDIUM |
| Contact | LOW |
| Homepage (future) | HIGH but controlled |

## OPTIONAL REUSABLE PATTERNS
Component-level, not global principles. Use where the content genuinely
calls for it; do not force one onto a page that doesn't need it.

**Archive filter** — see Principle 03.

**Interactive chronology / active year** — a timeline can show one
prominent active-year display that updates on hover/focus (and scroll,
where scroll position meaningfully maps to chronology) of a timeline row,
with a restrained `var(--m-standard)`/`var(--e-editorial)` transition and,
where composition supports it, a sticky year column. Reference: About V2
History. Optional — do not add it to a page without a real chronology.

**Recognition row** — one shared row treatment for a year/name/category
register (used by both Awards V2 and About V2's Selected Recognition),
reading from the same canonical award records so no data is duplicated.

**Shared image/media treatment** — a media block resolves through
`TA_MEDIA.resolve()` against a canonical data record (never a page-local
placeholder), with caption/credit rendered from that same record.

**Index-with-preview** — a text register paired with one shared preview
surface that updates on row hover/focus, rather than a thumbnail per row.

**Editorial pause** — deliberate oversized whitespace between chapters.
Not a bug; do not fill it by default (see Principle 01).

**Project Presentation Spine** — specific to architectural Project Detail
pages, not a generic page pattern (see `V2_SPATIAL_ARCHETYPES.md`'s note on
it). A content-adaptive chapter sequence — Hero → At a Glance → Design
Intent → Context (if real content exists) → Architectural Strategy → Spatial
Experience → Material/Structure (if content exists) → Drawings (if any) →
Project Information → Facts (if any) → Team/Services → Recognition (if any)
→ Related Work → Next Project — read continuously, never behind tabs. A
chapter with no canonical content for a given project is omitted outright,
never filled with placeholder text to complete the spine.
