# EXPERTISE V2 REVIEW

## Files created
`v2/pages/Expertise.dc.html`, `EXPERTISE_V2_BLUEPRINT.md`, `EXPERTISE_V2_REVIEW.md` (this file).

## Files modified
`v2/pages/About.dc.html`, `v2/pages/Awards.dc.html` (already correct — verified, unchanged),
`v2/pages/Journal.dc.html`, `v2/pages/Contact.dc.html`, `v2/pages/Projects.dc.html` — each had
1–3 nav-link references pointing at V1's root `Expertise.dc.html`; corrected to the sibling
`Expertise.dc.html` now that V2 exists. No V1 file touched; no page redesigned.

## Final Expertise V2 architecture
**Overview** (length always `TA_EXPERTISE.all().length`, no fixed count): Editorial Hero →
Register (Index+Preview, hover/focus/tap-driven) → Relationship moment (structural grid +
node diagram, `grid-template-columns: repeat(all.length, 1fr)`, not a fixed 3×3) → Selected
Work across disciplines (union of every discipline's canonical projects, deduped) → Editorial
Closing.
**Detail** (chapters conditionally rendered per record): Hero → Approach (if `lead`/`body`
exist) → Capabilities (if any) → Process (if `hasProcess` && phases exist) → Selected Work (if
any) → Knowledge (if the Journal relationship — not the `hasKnowledge` flag — returns entries)
→ Related Expertise (if any) → Next Expertise (always, canonical `next()`).

## Shared V2 systems reused (no new infrastructure created)
`HeaderNav` (theme `canvas`, unchanged), `cursor.js` (`explore` on Register/Related rows,
`view` on project cards, `read` on Knowledge rows, `next` on the closer — never on capability
rows or non-clickable text), `motif.js` (`TA_MOTIF.cellForIndex()` — Register is the primary
reactive use, Related is secondary hover-only; total 2 reactive + 1 static reference in the
Design System = within the 2–4 budget), `TA_SECTION_TRACKER` (Detail's compact chapter
indicator — no local scroll observer written for this), `reveal.js` (project card images,
closing statement), `bidi.js` (not directly needed here — all copy already comes pre-composed
per language from `pick()`, no mixed-script strings requiring `.parts()` on this page), the
same scroll+`setTimeout` tick pattern Projects/About/Journal already use for hero/next depth
and the Process sticky-narrative counter (never `IntersectionObserver`/`requestAnimationFrame`
— both confirmed unreliable in this environment in earlier V2 passes).

## V1 strengths preserved
Register → active discipline → EXPLORE → shared preview → detail continuity; visual hierarchy
between active/inactive rows; the "between disciplines" relationship moment; Selected Work
resolving through canonical project data; overview↔detail with hash routing
(`#expertise=<slug>`); Approach/Capabilities/Process/Work/Knowledge content spine; Related
Expertise and Next Expertise with real state continuity (not array-index neighbors — both use
`TA_EXPERTISE.related()`/`.next()`).

## Design improvements beyond V1 / brief
- **Taxonomy is genuinely dynamic, not just data-sourced.** V1 read `expertise-data.js` but
  cached the result once per page load (`EX_OF()`'s memoized closure) and hardcoded a 3×3
  `coord` system assuming ≤9 disciplines with fixed grid positions. V2 recomputes `EX.all()`
  fresh inside every `renderVals()` call (no cache to go stale) and replaces the fixed `coord`
  grid with `TA_MOTIF.cellForIndex()` (cycles predictably past 9) and a
  `grid-template-columns: repeat(all.length, 1fr)` relationship diagram that grows/shrinks
  with the real count. *Why better*: Principle 09 (taxonomy must be dynamic) — adding a 6th
  or 10th discipline needs zero code changes, not just zero data changes.
- **Cursor and Motif now separated by job, not by page convention.** V1 used one page-local
  cursor+coordinate engine conflating "what will clicking do" with "what's currently active."
  V2 uses the shared systems' explicit division: cursor = action, motif = state (Design
  Contract §7b/§7). *Why better*: consistent with every other V2 page; no competing
  infrastructure per the brief's own boundary.
- **Knowledge section correctness.** V1's `hasKnowledge` was a per-record boolean flag that
  could drift from what Journal actually tagged. V2 renders Knowledge purely from
  `TA_JOURNAL.forExpertise(slug)`'s real result — confirmed live: Engineering's
  `hasKnowledge:false` flag does NOT suppress its Knowledge section, because the canonical
  Journal tags for `engineering` do exist. This is the correct, data-driven answer per
  Principle 08 ("never fabricate a missing chapter" cuts both ways — never suppress a real
  one either).
- **Mobile Register reuses Projects' proven per-row-thumbnail pattern** instead of V1's
  hover-only preview column disappearing on touch with no replacement.

## Overview interactions implemented
Register hover/focus → temporary active state (opacity hierarchy, shared preview, motif
travel, EXPLORE cursor) → click/tap → persistent detail navigation. Relationship diagram is
static (no autonomous animation, no per-frame line-draw loop — a deliberate simplification;
V1's animated SVG line-draw was one-time and reduced-motion-gated already, but re-implementing
a bespoke SVG stroke-dashoffset system was judged not worth a second custom mechanism for a
static compositional fact — the relationship reads through position/scale of the nodes
instead).

## Detail interactions implemented
Hero/next scroll depth (≤5%/1.02, reduced-motion gated), Process sticky-narrative with a
counter transition, chapter indicator via the shared tracker, Related row hover previews
(state only — no motif wiring beyond what's already documented as sufficient for this budget).

## Responsive / mobile translation
Register preview column hidden ≤1023px, replaced by 56px inline row thumbnails (`≤767px`
media query, matching Projects). Process's sticky narrative column goes `position:static`
≤1023px. Chapter pill relocates to safe-area-respecting position ≤767px. No `nowrap`/fixed
widths anywhere; all grids use `minmax(0,1fr)` tracks.

## EN/FA + RTL verification
All copy is authored per-language via `pick()`, never mirrored. Chapter labels, cursor labels
(via `TA_UI_V2`), and menu items all resolve through the shared systems already verified
bilingual. Numbers render via `.text-number`. Verified live: switching hash to
`#expertise=engineering&lang=fa`-equivalent state renders correctly (checked via direct hash
navigation).

## Accessibility / reduced-motion verification
Every interactive element is a real `<a>`/`<button>` with `min-height:var(--c-control-h)`.
Chapter indicator is `aria-hidden` (decorative). Motif is `aria-hidden` per the shared
component's own contract. Reduced motion (verified via the shared `reducedQ()` gate already
proven across every other V2 page): hero/next/depth transforms skip entirely; the page remains
fully navigable and readable with zero motion.

## Data / taxonomy resilience — verified
Confirmed by code inspection (not just data change): `renderVals()` calls `EX.all()` fresh on
every render, with no memoizing cache — unlike V1's `EX_OF()` closure, a taxonomy change is
visible on the very next render with zero page code changes. Live-tested `__addForTest`/
`__removeForTest` round-trip; the row count query after removal correctly matched the original
5. Engineering (the lightest record — no Process, no `hasKnowledge` flag) renders with zero
empty sections (`hasProcess:false` correctly hid Process; Knowledge, Capabilities, Work,
Related all rendered because their real content exists).

## Real blockers
None for architecture/interaction. Same media blocker documented for Projects: no real
discipline/process photography exists in `assets/`; every visual slot correctly falls back to
`--media-placeholder` rather than fabricating imagery.

## Intentionally deferred
V1's animated SVG relationship-line-draw (replaced with a static compositional read, see
above) — could be revisited as a Section Handoff-style entrance once real content review
happens. Projects' local chapter tracker migration (unrelated, out of scope here, unchanged).

## Verification actually performed
Loaded About/Awards/Journal/Contact/Projects/Expertise after every nav-link fix — all clean
consoles. Clicked a Register row from a clean overview state → confirmed hash navigation and
title render. Navigated directly to `#expertise=engineering` (the lightest real record) →
confirmed Process/Knowledge/Capabilities/Work/Related render exactly per that record's real
content, no empty sections. Confirmed taxonomy dynamism by code inspection and a live add/
remove round-trip on the register's row count.

## SCROLL EXPERIENCE HARDENING PASS (second turn)

Fixed a real bug this pass surfaced: the Register's row-highlight state (`rows[i].color`/
`.op`) previously read only `st.hover`, never the computed `activeSlug` (hover‖scroll-active‖
default) — so the shared Section Tracker's scroll-active state was being computed correctly
but never actually applied to the rows' visuals. Confirmed via live scroll test: before the
fix, no row highlighted while scrolling without the mouse; after, the row nearest the reading
line correctly turns `--turq-dk` as the visitor scrolls, with no pointer movement.

**Shared reveal.js hardened**: rebuilt from IntersectionObserver-based prepare/reveal onto the
same scroll+coalesced-setTimeout scheduler the rest of V2's runtime already uses (Section
Tracker, Projects/About/Journal's local ticks) — closing the one remaining inconsistency
where the foundational entrance system used a mechanism already known unreliable in this
environment. Verified live on Awards: an off-screen `data-reveal="content"` element stayed
unrevealed until scrolled into range, then revealed correctly — confirming both halves (stays
hidden until due; actually reveals when due) with no IntersectionObserver involved.

**"Between disciplines" removed and replaced** — see the Overview table above. The old
section (abstract SVG lines/dots, zero real data) is gone; the new Cross-disciplinary story
uses real `project.expertise` relationships, and is itself now the primary interactive chapter
of the overview after the Register (both driven by the shared Section Tracker, not a
page-local scroll engine).

**Entry reveal added** to previously-static Detail chapters: Approach (label+lead), Capabilities
(rows as a `group` stagger), Knowledge (rows as a `group` stagger), Related Expertise (label).
Process's sticky narrative was already the dominant interaction there and needed no additional
reveal treatment. Selected Work and the Hero already used `data-reveal="media"`.

**Mobile**: the Cross-disciplinary story's sticky preview column collapses to `position:static`
≤1023px (new `[data-ep2-crosssticky]` rule, same convention as the Register's `[data-ep2-
preview]`); each project chapter gets its own inline thumbnail ≤767px (reusing the existing
`[data-ep2-rowthumb]` mobile pattern rather than inventing a second one).

**Reduced motion**: unchanged from the first pass — hero/next depth transforms skip entirely;
state changes (scroll-active discipline, active cross-disciplinary chapter) still occur, just
without the accompanying transform; reveal.js's own reduced-motion path (unchanged by this
refactor) reveals everything immediately rather than waiting on scroll position.

### Verification actually performed this pass
Scrolled the overview from top to bottom without touching the mouse (the brief's mandatory
test) — confirmed via `eval_js_user_view` against the live user preview, not code inspection
alone: (1) the Register's row-highlight bug was caught this way, then fixed and re-verified —
`sustainable-design`'s title span resolved to `rgb(62,150,146)` (`--turq-dk`) at scroll
position 850px while all other rows stayed ink, with zero pointer movement; (2) confirmed the
Cross-disciplinary section renders 3 real project chapters and the fallback plain-grid section
correctly does NOT render alongside it; (3) confirmed reveal.js's scroll-triggered reveal on
Awards (an unrelated already-shipped page) to validate the shared runtime change didn't
regress anything already depending on it.

**EXPERTISE V2 — SCROLL EXPERIENCE HARDENED**
