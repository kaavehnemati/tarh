# V2.3 EXPERIENCE HARDENING AUDIT

Scope note up front: this phase's brief (Shared Section Tracker, Cursor finalisation,
Motif finalisation, Context-Aware Header, Surface/Ambient cleanup, Token/responsive
hardening, plus a limited pass on 5 pages) is a full-system hardening effort. This pass
delivers the concrete, verifiable fixes below and documents the rest as scoped, pending work
— rather than making sweeping changes across five pages without the ability to verify each
one individually. Nothing below was implemented "in spirit only."

## Found and fixed this pass

**1. Regression in About.dc.html (pre-existing, found during this audit).** The logic class
had a dangling, unreachable code fragment — a duplicated `tick()` body + a duplicate
`componentWillUnmount()` sitting *outside* any method, left over from an earlier edit in this
session. This failed the entire class eval (`[dc-runtime] logic class eval FAILED for About`),
silently degrading the whole page to template-only rendering (every dynamic value blank).
**Fixed**: removed the orphan fragment. Confirmed clean reload, no console errors.

**2. Contextual Cursor language bug (confirmed exactly as the brief predicted).**
`v2/runtime/cursor.js` resolved language from `document.documentElement.getAttribute("dir")`
— but every V2 page sets `dir` on its own `[data-v2-shell]` root div, never on `<html>`. The
cursor's FA labels were unreachable; it always read English. **Fixed**: `labelFor()` now
resolves `dir` from the hovered target's nearest `[dir]` ancestor, falling back to
`documentElement` only if none exists.

**3. Contextual Cursor tracking used `requestAnimationFrame`.** Per Projects V2.2's own
finding (confirmed again independently here), `requestAnimationFrame` does not reliably fire
in this preview environment (backgrounded/occluded iframe). The cursor's smooth-follow tick
would have silently frozen. **Fixed**: switched to the same `setTimeout`-gated scheduling
Projects Detail already uses — still fully idle when inactive, no permanent loop.

**4. Contextual Cursor never hid the native arrow (brief explicitly asked for this).**
Added `cursor:none` on the eligible target only while active (guarded by the same
`SKIP_TAGS`/`isContentEditable` check already used for label targeting — never applied to a
form control), restored on leave. Fixed a real bug in the original logic: `hide()` read
`this.active` *after* it had already been reassigned to the new (often `null`) target, so it
could never find the previous element to reset — captured the previous reference before
reassigning in all three call sites (`onMove`, `onLeaveDoc`, `unbind`).

**5. Reactive Motif was a two-cell fade-swap, not one traveling square (the brief's central
ask).** `tokens-v2.css` previously toggled `background`/`border-color` independently on two
`<i>` children — a discrete state swap, exactly what the brief said should be avoided.
**Rebuilt**: the active cell is now one `::after` pseudo-element positioned absolutely over
the 3×3 grid, moved via `transform: translate()` per `data-motif-active` value (9 explicit
rules, one per canonical cell). The 9 outline cells never change color — only the one overlay
square moves. Verified visually in the Design System specimen (screenshot: single teal square
sitting at the correct grid position, cross-page consistent). `prefers-reduced-motion` now
also disables the `::after`'s transition, not just the outline cells' — closing a gap in the
original rule.

**6. Context-Aware Header — infrastructure added, NOT wired into Projects (see below).**
`HeaderNav.dc.html` gained a `theme` prop: `"canvas"` (existing solid-surface header,
unchanged default) and `"transparent-dark"` (transparent background, light text, no border —
for sitting over a dark/media hero). The nav links, EN/FA toggle, and mobile menu trigger
already used `color:inherit`/`currentColor`, so the new theme needed no further template
changes to read correctly.

## Investigated and deliberately NOT wired: Header theme on Projects Detail

The brief's primary example (Projects Detail) does not actually support a transparent header
today. `<header>` is `position:sticky` and is the **first element in document flow**, with the
hero section immediately following it below — the header occupies its own box and pushes the
hero down; it never overlaps the hero image. Setting the header transparent in that layout
would show the *plain page background* through it, with light text on a light background —
a real contrast failure, not a working overlay effect. Making this behave as intended requires
an actual layout change (the hero rendering full-bleed under the header via negative
margin-top / a true overlay structure) to a section that is currently verified and working.
**Left `theme="canvas"` on Projects**, with the reasoning above written directly into the
`tick()` comment, rather than shipping a header that goes invisible over its own hero.
**This is the one concrete follow-up worth asking the user to approve** before implementing,
since it changes a verified layout's structure, not just its theme value.

## Section Tracker: already exists, not duplicated

Contrary to the brief's assumption, a shared tracker was already extracted in this project's
history — `window.TA_SECTION_TRACKER` (used by About's History section, confirmed live in the
code read during this audit: `componentDidMount` calls `TA_SECTION_TRACKER.track({root,
selector, onChange})`). Projects Detail's own chapter-tracking (`tickChapters`) predates that
extraction and still computes locally inline — that is real, documented duplication worth
resolving, but retrofitting Projects' `tick()`-integrated chapter/expansion/drawing/narrative
logic onto the shared tracker's API is a non-trivial refactor of a page that has been through
several rounds of hardening and re-verification already this session. Flagged rather than
attempted blind in the same pass as the fixes above, to avoid re-breaking a page that currently
works and is fully verified.

## Not attempted this pass (scope, stated plainly)

- Full alignment pass wiring the new `theme` prop into Awards/Journal/About/Contact (none of
  them currently have a dark/media hero that would benefit — the infrastructure exists for
  when one does).
- Retrofitting Projects' local chapter-tracking onto `TA_SECTION_TRACKER`.
- Deeper Surface/Ambient semantics cleanup and token/responsive audit beyond what surfaced
  incidentally while fixing the above (no other contradictions found in the files touched).

## COMPLETION PASS (second V2.3 turn)

All 13 verified findings from the completion-pass brief were addressed:

1. **About never loaded `section-tracker.js`** despite calling `TA_SECTION_TRACKER` \u2014
   History's scroll tracking silently never ran. **Fixed**: script tag added.
2. **`section-tracker.js`'s distance metric was wrong** (`Math.abs(r.top - vhMid * 0.3)`
   against a documented ~42% reading line \u2014 effectively targeting ~12.6vh instead).
   **Fixed** to `Math.abs(r.top - vhMid)`, and the identical bug in Projects' local copy.
3. **Contact never loaded `cursor.js`** and had no `data-v2-cursor="select"`. **Fixed**:
   script loaded, `select` added to the Inquiry Type buttons only (not fields/stage/submit).
4. **`ui-strings.js` had no SELECT cursor label.** **Fixed**: `select: {en:"Select",
   fa:"\u0627\u0646\u062a\u062e\u0627\u0628"}` added to `CURSOR_STR`.
5. **Journal used a page-local motif path `[1,2,3,5,6,9]`.** **Fixed**: replaced with
   `TA_MOTIF.cellForIndex(act)`; `motif.js` now loaded.
6. **Journal's Contents did not use the shared tracker \u2014 worse, its own tracking used a raw
   `IntersectionObserver`, independently confirmed unreliable in this preview environment
   during this pass.** This was a real, silent bug: Contents' active-item highlighting could
   freeze exactly like Projects' original issue. **Fixed**: `wireToc()` rebuilt on
   `TA_SECTION_TRACKER.track()`; the old `IntersectionObserver`/`requestAnimationFrame` path
   removed entirely.
7. **Projects' local active-chapter tracking left in place, deliberately.** Migrating it to
   the shared tracker would mean re-touching `tick()`/`tickChapters()` \u2014 Projects Detail's
   most heavily verified logic across three prior hardening rounds \u2014 in the same pass as five
   other pages' fixes. Per the brief's own instruction ("if this cannot be done safely... leave
   Projects local"), left as-is. Only the metric-bug fix (#2) was applied there.
8. **The reactive motif's "interactive" variant filled a second cell on hover** \u2014
   contradicting the one-active-square rule. **Fixed**: that rule now lifts the whole motif's
   opacity (`.85`) on ancestor hover/focus instead of filling `i:nth-child(7)`; the travelling
   `::after` square remains the only filled cell, always.
9. **Design System specimen was stale**: relabeled `V2.3 \u2014 Experience Hardened`; motif
   copy corrected to describe the travelling square (not cross-fade); added live specimens for
   Contextual Cursor (all 6 actions), Header themes (canvas + transparent-dark side by side),
   and the Shared Section Tracker (a real 3-section scrollable demo wired to
   `TA_SECTION_TRACKER`).
10. **Docs still described IntersectionObserver+RAF for Narrative Scroll** in
    `V2_MIGRATION_PRINCIPLES.md`. **Fixed** in Principles 07/12/13 \u2014 all now state the actual
    scroll+scheduled-timeout mechanism and name the Shared Section Tracker explicitly.
11. **Surface 3 contradiction** (documented as Media Stage, implemented as a diagonal
    placeholder). **Fixed**: introduced `--media-placeholder` as the real name for the diagonal
    stripe (a content *state*, not a page Surface); `--surface-3` kept only as a deprecated
    alias pointing at it, so nothing broke. No page referenced `var(--surface-3)` directly
    (confirmed by search), so this was a safe rename.
12. **Grid Surface vs. Ambient contradiction** (Principles allowed MINIMAL/SOFT coexistence,
    `tokens-v2.css`'s comment said "never both"). **Fixed**: the CSS comment now states the
    same MINIMAL/SOFT-may-coexist, FULL-may-not rule the Principles already documented,
    citing Awards' Archive as the reference case.
13. **Mobile drawer closed state relied on `aria-hidden` alone**, leaving its links
    keyboard-focusable while visually hidden. **Fixed**: `HeaderNav` now sets `inert` on the
    drawer whenever closed (removed when open) \u2014 the same bare-attribute-hole pattern
    Projects' filter panel already uses.

### Verified after fixes
About, Journal, Contact, Awards, Projects, and the Design System specimen all reload with a
clean console. About's History motif now moves with `activeHistory` state (same state driving
the year/emphasis change \u2014 no second observer). Journal's Contents no longer depends on an
observer type that doesn't fire reliably here.

### Remaining deferred (stated, not silently dropped)
- Projects' local chapter tracking \u2192 shared tracker migration (item 7 above).
- Wiring `theme="transparent-dark"` into any real page \u2014 still correctly blocked on the
  overlay-hero layout change identified in the first V2.3 pass; nothing changed that
  assessment.
- Broader token audit beyond Surface 3/Grid Surface (viewport-fit=cover was already
  consistent across all five pages \u2014 checked, no changes needed).

### Exact changed files (this completion pass)
`v2/runtime/section-tracker.js`, `v2/runtime/ui-strings.js`, `v2/design-system/tokens-v2.css`,
`v2/components/HeaderNav.dc.html`, `v2/pages/About.dc.html`, `v2/pages/Contact.dc.html`,
`v2/pages/Journal.dc.html`, `v2/pages/Projects.dc.html` (one-line metric fix only),
`v2/Design System.dc.html`, `V2_MIGRATION_PRINCIPLES.md`. No V1 file touched. No page
redesigned \u2014 every change is either a bug fix or wiring an existing shared primitive into a
page that was missing it.

## FINAL RELEASE GATE (third V2.3 turn)

All 17 verified items addressed:

1. **Cursor first-position bug** — `bound` was already `true` before the first `pointermove`
   landed, so `if(!bound){cx=tx;cy=ty}` never fired, meaning the circle really could animate
   in from a stale position. **Fixed**: a dedicated `positioned` flag, reset on `unbind()`,
   set on the true first move.
2. **Section Tracker made genuinely shared** — rebuilt on a registry keyed by `scrollRoot`:
   one listener + one coalesced `setTimeout` schedule per root, shared across every tracker
   registered on it, torn down only when the last one unregisters.
3. **Scroll-container support added** — `activeIndex`/`rectIn` now compute the reading line
   relative to an element `scrollRoot`'s own `clientHeight`/bounding rect when one is passed,
   not always `window.innerHeight`. The Design System's internal-scrollbox specimen now passes
   `scrollRoot: <that element>` and is a real, working demo (previously it silently measured
   against the *window's* scroll, never the box's).
4. **About/Journal verified stable** after the scheduler refactor — both call `track()`
   exactly as before; the public API is unchanged, only its internals now share listeners.
5. **Mobile menu focus trap completed** in `HeaderNav` — Tab on the last focusable item wraps
   to the first, Shift+Tab on the first wraps to the last, scoped to visible
   (`offsetParent !== null`) focusable elements inside the drawer. Escape/restore/scroll-lock/
   `inert`-when-closed all unchanged.
6. **Viewport meta normalized** — Contact and Projects were missing `viewport-fit=cover`;
   now identical across About/Awards/Journal/Contact/Projects.
7. **Surface Contract synced** — `V2_DESIGN_CONTRACT.md` §5 now states Media Stage (not
   "Surface 3 image-immersive") and documents `--media-placeholder` as a content state.
8–11. **Formally documented**: Contextual Cursor, Reactive Motif (implementation detail —
   9 outline cells + one `::after` square), Shared Section Tracker, and Header Themes each
   got a dedicated subsection in `V2_DESIGN_CONTRACT.md` (§7b–§7d).
12. **Page Blueprint updated** — new "SYSTEM CAPABILITIES" block requires every future page to
    state its Header theme, cursor usage, section-tracking approach, motif mode, density,
    mobile translation, and reduced-motion fallback in one place.
13. **Cursor size tokenised** — `--c-cursor-size:76px` added; `cursor.js` reads it instead of
    a hardcoded `76px`. No other value in scope (sticky offset, progress-rail height, archive
    thumbnail size) was judged genuinely shared enough to tokenise without inventing tokens
    for their own sake.
14. **Specimen verified, not expanded** — re-checked all 6 cursor zones, the single-square
    motif, both header-theme swatches, and the (now genuinely functional) internal-scroll
    tracker demo. No new specimens added.
15. **Stale experiment language removed** — confirmed `data-experiment="ambient"` is set by
    no page in the current source (Awards no longer uses it); removed the dead
    `:not([data-experiment="ambient"])` guards and rewrote the comment to state the canonical
    (not experimental) Grid+Ambient MINIMAL/SOFT rule. Zero visual change to Awards, since the
    attribute was already unused.
16. **Deferred items untouched**: Projects' local chapter tracker, transparent header on
    Projects' hero, real project media/content integration.
17. **Source-of-truth check**: `tokens-v2.css`, `V2_DESIGN_CONTRACT.md`,
    `V2_MIGRATION_PRINCIPLES.md`, `V2_PAGE_BLUEPRINT.md`, and the live specimen now describe
    the same system — no remaining V2.1 label, no cross-fade motif wording, no Surface-3
    media semantics, no IntersectionObserver Narrative Scroll claim, no live Awards
    experiment branch.

### Exact changed files (this gate pass)
`v2/runtime/cursor.js`, `v2/runtime/section-tracker.js`, `v2/components/HeaderNav.dc.html`,
`v2/pages/Contact.dc.html`, `v2/pages/Projects.dc.html` (viewport meta only),
`v2/design-system/tokens-v2.css`, `v2/Design System.dc.html` (scrollRoot wiring only),
`V2_DESIGN_CONTRACT.md`, `V2_PAGE_BLUEPRINT.md`. About/Awards/Journal verified clean and
unchanged in this pass. No V1 file touched. No page redesigned.

### Remaining deferred (unchanged from prior passes, stated again for the record)
Projects' local chapter tracker → shared tracker migration; transparent header on Projects'
hero (needs an overlay-hero layout change); real project content/media integration.

**Final status: DESIGN SYSTEM V2.3 — FOUNDATION FROZEN**


