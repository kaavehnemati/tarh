# PROJECTS V2 REVIEW

## Status: PROJECTS V2.2 — MEDIA BLOCKED (composition/architecture/interaction final; real photography not yet delivered)

## What this page is
Project Detail is the V2.1/V2.2 reference implementation for Narrative Scroll Choreography.
No tabs, no fragmentation — one continuous, content-adaptive Project Presentation Spine, read
top to bottom, with real scroll-driven behavior layered on top of Progressive Reveal.

## Project Presentation Spine (final, as implemented)
Hero → At a Glance → Design Intent (if `editorial.lead`/`chapters` exist) → story blocks
(each independently `context`/`strategy`/`experience`/`material`/`technical` if the canonical
record sets an explicit `role`, else positioned Strategy-first/Experience-rest) → Drawings (if
any) → Project Information + Facts (merged into one Structured Field chapter) → Team & Services
(if any) → Recognition — awards + journal (if any) → Related Work (if any) → Next Project.
Every chapter absent from a project's real data is omitted outright — never filled with
placeholder text. Verified against all four real projects (rich/sparse mixes of team, awards,
drawings, journal ties) and the four prototype projects.

**Semantic chapter architecture**: `projects-data.js`'s `story()` now passes through an
**optional** `role` field per story block (`context`/`strategy`/`experience`/`material`/
`technical`) — a real schema extension, not a page-local hack. **No current record sets one**
— every project today still uses the positional fallback (first block = Strategy, rest =
Experience), so this is a capability added for a future content editor, not a claim that
today's chapters are more semantically resolved than they are. Genuinely inferring "this
block is about context vs. material" from its title/body text was explicitly out of scope
(the brief prohibits it) and was not done.

## Narrative Scroll Choreography — desktop
One scroll-driven `tick()`, throttled via `setTimeout` (see Performance below), drives:
- **Active Chapter Indicator** — content-aware, reads real `[data-sec]` chapters actually
  rendered for *this* project; appears once scrolled past the hero; a restrained vertical
  counter-transition (a small dip, not a rolling odometer) plays on every chapter change,
  skipped entirely under reduced motion.
- **Scroll Progress** — 1px track + small square marker, page-scroll fraction, no bar/percent.
- **Hero and Next-Project depth** — ≤5% translate, ≤1.02 scale, skipped under reduced motion.
- **One media-expansion moment** — the first `full-image` story block only, contained (92vw) →
  true full-bleed (`width:100vw` + the margin-inline breakout, not just a width change inside
  a padded parent — fixed this pass so it can never overflow sideways). Desktop only.
- **Sticky narrative counter** — per sticky-story group, independent of any others on the page.
- **Drawing Build** — clip-path reveal on the first drawing only; the rest stay calm.

## Narrative Scroll Choreography — mobile (redesigned this pass)
- The tall 120px progress rail is hidden below 767px; the chapter pill becomes the **one**
  compact reading indicator ("03 / 08 — Spatial Experience"), repositioned to respect
  `env(safe-area-inset-bottom)` and capped to the available width so it never overlaps content.
- Media expansion does not width-interpolate on mobile — the same chapters render edge-to-edge
  by default via CSS, no JS-driven geometry change (a deliberate stability choice per the
  brief, not the desktop behavior "surviving unchanged").

## Archive mobile interaction (redesigned this pass)
The desktop Index+Preview's single shared preview panel (hover/focus-driven) is **hidden
outright below 1024px** — it depended on hover, which mobile doesn't have, and stacking it
below the whole register lost its row relationship entirely (the exact problem flagged).
Replaced with **archetype E's actual mobile translation**: each register row gets its own
small (56px) thumbnail, inline, from that project's own archive image — sequential and
media-first, no hover required, no second tap needed to "reveal" anything.

## Archive → Detail shared transition (hardened this pass)
- **No hardcoded 620/900ms** — duration read live from `getComputedStyle` on `--m-page`/
  `--m-fast`/`--m-standard`, so a future token change can never desynchronize the JS handoff.
- **`transitionend`-driven handoff**, not a fixed timer — a `setTimeout` at `pageMs+standardMs`
  exists only as a safety fallback if `transitionend` never fires (e.g. the element is removed
  mid-transition), not as the primary trigger.
- **Real crop carried through**: the clone now reads the *actual* `backgroundSize`/
  `backgroundPosition` off the archive preview's image layer instead of hardcoding `cover`/
  `50% 50%` — once real photography exists, the handoff will show the same crop on both ends,
  no jump.
- Reduced motion: no clone at all, instant crossfade (unchanged).

## A note on the scroll/observer architecture (deviates from the original plan, on evidence)
The original V2.2 pass used `IntersectionObserver` for chapter/expansion/drawing detection,
per the Design Contract's stated "event-driven, ticks only while visible" intent. **Directly
verified in this preview environment**: a bare, option-less `IntersectionObserver` on a real,
already-laid-out element produced zero callbacks after 1s+ and a real scroll — and
`requestAnimationFrame` behaved identically (a scheduled callback never fired). Both are
consistent with a backgrounded/occluded iframe being deprioritized by the browser's compositor,
which is exactly the preview/verification context this page is built and checked in. Continuing
to rely on either would have shipped a page that is provably broken in the same environment
used to review it. **The fix**: one scroll-driven `tick()`, scheduled via `setTimeout` (not
`requestAnimationFrame`), gated so it only runs in response to an actual `scroll` event —
still event-driven, still not a permanent loop, just not dependent on an API this environment
doesn't reliably deliver. This is documented here rather than silently deviating from the
Design Contract's wording.

## Semantic story roles — assigned per real project (this pass)
Reviewed each real project's own existing title/body text; assigned an explicit `role` only
where the content clearly supports one, left unset where ambiguous (never inferred a technical
claim not present in the text):

| Project | Block 1 | Block 2 | Block 3 (sticky) |
|---|---|---|---|
| 001 IKIA Airport Hotel | **strategy** — "One Complex, Two Identities" (organizing tension) | **material** — "Rhythm, Colour and Orientation" (façade/colour) | **experience** — "Movement, Arrival, Pause" |
| 002 Future Courtyard | **context** — "Architecture in a Living Landscape" (Rasht's site conditions) | **strategy** — "Forming the Public Edge" (form/threshold organization) | **experience** — "A Courtyard Reimagined" |
| 003 Grand Hotel Tehran | **context** — "A New Vertical Address" (city/mountain horizons) | **strategy** — "From City to Hospitality" (podium mediation) | *unset* — "Carving the Vertical Void" mixes a material/structural gesture with experiential media; left unclassified rather than guessed |
| 004 Dariush Hotel Kish | *unset* — "Overview" is too generic to classify confidently | **experience** — "Landscape & Arrival" | **strategy** — "Design Concept" (Achaemenid spatial framework) |

Explicit roles now take priority over the position fallback (Strategy-first/Experience-rest),
which still applies only to the two unset blocks above and to the four prototype projects.
Chapter labels/indicator update accordingly — e.g. project-002 now reads Hero → At a Glance →
Design Intent → **Context** → **Architectural Strategy** → **Spatial Experience** → Project
Information → Team → Related → Next, a real proposal sequence, not three generic "Strategy/
Experience" beats.

## Media blocker — see `PROJECT_MEDIA_BLOCKERS.md`
Confirmed no real project photography exists anywhere in this workspace (`assets/`, `uploads/`
both checked). Exact missing paths per project are listed there. **Status: MEDIA BLOCKED** —
composition and information architecture are final; visual production-readiness is not
claimed until that photography is delivered.

## Media strategy — the one real limitation (confirmed blocking, not silently claimed ready)
`projects-data.js` genuinely supplies real `src` paths for the four real projects (both
supplied photography and labelled editorial visualisations/diagrams). **The image files
themselves are not present in this project's `assets/` folder** — `assets/projects/` does not
exist; only `assets/about/studio-portrait.png` does. Every media call on this page
(`TA_PROJECTS.visual()`, `.story()`, `.drawingList()`) is the same canonical call Awards/
Journal/About already use — nothing special-cased or faked. The honest result today is a
neutral `var(--surface-1)` box wherever a real photo or drawing belongs, and the shared
archive→detail transition has nothing to visibly hand off (it degrades to a plain reveal-in,
correctly, rather than animating an empty box). **Exact missing assets**: every file under
`assets/projects/project-001/` through `project-004/` referenced by `projects-data.js`
(supplied photography for 001/002, editorial visualisations/diagrams for 001–004) — none exist
in this project today. **This blocks calling Projects visually production-ready**; the
composition, motion, and information architecture are complete and correct, but there is no
real photography or drawings to show yet.

## Persian quality
Titles, team names, award names route through `TA_BIDI.parts()`; years/counts through
`.text-number`. Chapter labels are authored in both languages (`CHAPTER_LBL`); RTL row layout
reflows naturally (thumbnail float uses `float:inline-start`, not a hardcoded side).

## Performance
`tick()` is gated behind a single pending `setTimeout` flag — a burst of scroll events
collapses to one recompute per ~16ms, never a permanent loop; it does nothing at all outside
Detail view. The removed image-viewer avoids a second, redundant set of media requests for
images already shown in flow.

## Accessibility
Every interactive element (archive rows, filter chips, related/next cards) is a real
`<a>`/`<button>` with `min-height:var(--c-control-h)`, keyboard-operable, `aria-pressed`/
`aria-expanded` where relevant. The chapter indicator and progress rail are `aria-hidden`
(decorative wayfinding, not the primary means of navigating). `HeaderNav`'s menu accessibility
is inherited unmodified.

## Removed from V1 (see `PROJECTS_V1_AUDIT.md` and `PROJECTS_V1_SCROLL_CHOREOGRAPHY_AUDIT.md`)
Alternate "visual view" grid, image-viewer lightbox, custom cursor, page-local reduced-motion
toggle, and the Description/Team/Awards tabs — none re-added.

## Exact dependencies
`../design-system/{tokens-v2,base-v2,responsive-v2}.css`, `../runtime/{bidi,ambient,reveal,
ui-strings}.js`, `../components/HeaderNav`, shared root: `../../site-data.js`,
`../../media-utils.js`, `../../projects-data.js`, `../../expertise-data.js`,
`../../awards-data.js`, `../../journal-data.js`. **Zero root presentation imports.**

## Exact changed files (this correction pass)
`v2/pages/Projects.dc.html` (chapter/progress/expansion/transition fixes, mobile archive
thumbnails, mobile chapter UI, row-layout fix, dead `detailMode` state removed, stale comment
fixed), `projects-data.js` (added optional `story[].role`, assigned per project 1/2/3/4 above),
`PROJECT_MEDIA_BLOCKERS.md` (new), `PROJECTS_V2_REVIEW.md`, `PROJECTS_V2_BLUEPRINT.md`. No
other V2 page touched. No V1 `.dc.html` touched.

## Confirmations
1. **Zero root presentation imports** — confirmed.
2. **V1 remained untouched** — confirmed.
3. **Design System V2.1/V2.2 consumed, not redesigned** — confirmed; the one documented
   deviation (IntersectionObserver/rAF → scroll+setTimeout) is an implementation-detail fix
   made necessary by a verified environment constraint, not a change to the Contract's actual
   behavioral promise (event-driven, no permanent loop, visible-only computation).
4. **Blocking**: real project photography/drawings (`assets/projects/project-001..004/`) —
   listed above — must be delivered before Projects can be called visually production-ready.

STOP after Project Detail — Expertise and Homepage not migrated; other V2 pages not touched.
