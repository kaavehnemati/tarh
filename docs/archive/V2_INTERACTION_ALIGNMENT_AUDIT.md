# V2 INTERACTION ALIGNMENT AUDIT

Reviewed against Projects V2.2 (the reference implementation) and the Design Contract's
Narrative Scroll vocabulary. Target: one shared interaction language, different density per
page — not every page becoming Project Detail.

## About — target MEDIUM density

**Current interaction (before this pass):** page-entry motion, Ambient, People's hover/focus/
click-driven active portrait, History's hover/focus/click-driven active milestone. No
scroll-responsive media, no scroll-driven section awareness.
**Weakness found:** History only advances on hover/click — a visitor who scrolls through
without touching a row never sees the active-milestone story respond, the single strongest
candidate for Narrative Scroll on this page per the brief.
**Change made:** History gained **local section awareness** (not a page-wide rail) — as
milestone rows pass the reading line on scroll, the active year/tag/title updates exactly as
hover/click already did, with a small counter-transition (a 4px dip, matching Projects' pattern,
skipped under reduced motion). Studio's opening photo gained **one** restrained scroll-response
(≤3% translate, ≤1.5% scale) — About's only scroll-responsive media moment, well under the
1–2 guideline. **People was left untouched** — its hover/focus-driven active-portrait state is
already the right amount of micro-interaction; adding scroll choreography there would be a
second competing motion in the same section (violates One Primary Motion Per Viewport).
**Primitives avoided:** page-wide progress rail, chapter indicator, sticky-navigation,
hero parallax — none added, per the brief.
**Mobile:** History's touch equivalent (tap a row) already existed; scroll-driven advance now
works identically on touch, no new mobile-only code needed.
**Reduced motion:** both new behaviors gated behind `prefers-reduced-motion`; History still
fully readable/scannable (nothing hidden), it simply stops auto-advancing.

## Awards — target LOW→MEDIUM density — audited, no change made
**Current interaction:** Archive filter panel (expand/collapse, already token-driven
transitions), sort toggle, row hover/focus state, shared Index+Preview on the Archive register,
static "Selected recognition" cards. Already matches the target: filtering and sorting are
polished state transitions using `--m-*`/`--e-*` tokens (no arbitrary duration), the Archive
stays scannable, and there is no scroll progress, no media expansion, no sticky storytelling —
exactly the "avoid" list for this page. **Selected Recognition ↔ project preview**: the brief
asks to strengthen this relationship, but Selected Recognition already links directly to each
project (`f.href`) and doesn't currently drive a shared preview surface the way the Archive
register does. Building a second Index+Preview instance for three static cards would add a
scroll-independent interaction with no real content gap it solves (three cards, already
visible, already linked) — assessed as unnecessary interaction density for a LOW→MEDIUM page,
not a missing capability. **No change made.**

## Journal Archive — target MEDIUM density — audited, no change made
**Current interaction:** category filter with a calm cross-fade (`gridOp`/`gridShift`,
already token-timed, no full-page flash), featured-story media reveal, row hover. Category
changes are already spatially stable (the grid dips and resettles in place, never reflows the
whole page) — exactly what the brief asks for. **No change made.**

## Journal Detail — target MEDIUM→HIGH density — audited, no change made
**Current interaction:** the Contents (TOC) system already *is* the active-chapter mechanism —
`data-jr2-sec` markers, `wireToc()`'s IntersectionObserver-driven active-heading tracking (this
page's observer usage predates Projects V2.2's discovery that IO doesn't fire reliably in this
preview environment; **flagged, not silently left** — see Known limitation below), a progress
fill integrated into Contents itself (`tocProgress`), and precise click-to-jump navigation. This
already satisfies "Contents/progress genuinely support reading, don't add a second competing
indicator" — no second chapter pill was added. **No change made to the interaction design.**
**Known limitation carried over, not fixed this pass**: `wireToc()` uses `IntersectionObserver`,
which Projects V2.2 proved does not fire in this preview/verification environment. Journal
Detail's Contents may not update live in *this* environment for the same reason — but fixing it
means touching Journal's own runtime, which this pass's brief explicitly excludes ("do not
modify... unless a genuine reusable-system bug is discovered"). This *is* that bug, found while
auditing, not manufactured to justify a change — recorded here for a future pass rather than
fixed unilaterally under an alignment-only mandate.

## Contact — target LOW density
**Current interaction:** inquiry-type selection (rows collapse to the picked one), form fields,
validation, expertise/stage toggles — already minimal, no scroll effects.
**Weakness found:** picking a different inquiry type swaps the visible field set with no
transition at all — an abrupt content swap, the "page jump" feel the brief specifically warns
against for conditional form fields.
**Change made:** a **single** calm micro-motion — the field group dips and resettles (opacity +
4px, `--m-fast`/`--e-smooth`) whenever the inquiry type changes (including via the Careers/Media
shortcut links). Reduced motion: skipped, fields swap instantly. **No other change** — the form
itself, validation, and submit stay exactly as they were; no scroll transform, no progress rail,
no sticky story, per the brief's explicit "avoid" list for this page.

## Interaction density — final
| Page | Density | Progress UI | Chapter indicator |
|---|---|---|---|
| Projects Detail | HIGH (reference) | global rail | Project Chapter Indicator |
| About | MEDIUM | none (local History awareness only) | none |
| Awards | LOW→MEDIUM | none | none |
| Journal Archive | MEDIUM | none | none |
| Journal Detail | MEDIUM→HIGH | integrated into Contents | Contents itself |
| Contact | LOW | none | none |

## Shared primitives reused (no new shared runtime created)
Scroll+`setTimeout` tick pattern (Projects' proven fix for this environment's IO/rAF
limitation) — reused page-locally in About; not extracted into a shared file this pass
(genuinely identical behavior across only 2 of 6 pages doesn't clear the "extract only when
truly duplicated" bar yet). Existing tokens (`--m-fast`/`--e-smooth`) — no page hardcoded a new
duration or curve.

## Accessibility / touch parity
Every hover-triggered state (About History, Contact fields) already had a keyboard/click/touch
equivalent before this pass (`onFocus`/`onClick` alongside `onMouseEnter`) — the new scroll-
driven behaviors are additive orientation cues, never the only way to reach that state.

## Confirmations
- Projects V2 — untouched.
- Expertise / Homepage — not migrated.
- Global tokens, typography, palette, `HeaderNav`, Ambient runtime — untouched.
- Exact changed files: `v2/pages/About.dc.html` (History section-awareness + counter dip,
  studio-media depth), `v2/pages/Contact.dc.html` (fields dip on intent change),
  `V2_INTERACTION_ALIGNMENT_AUDIT.md` (new). Awards and Journal: audited, zero changes.
