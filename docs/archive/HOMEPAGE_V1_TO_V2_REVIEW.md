# HOMEPAGE V1 → V2 REVIEW (correction pass)

**Final status: HOMEPAGE V1 → V2 PORT CORRECTION — PARTIAL PARITY**

Superseded the prior review, which overstated parity. This one is written from actual
rendered/DOM evidence gathered this pass (live scroll checks, DOM attribute/geometry
inspection), not from source-reading alone.

## Concrete bugs fixed this pass
- **Shared Hero→Studio media journey** — was two disconnected local elements; now one fixed
  `data-hp2-journeystage` panel driven by continuous `journeyP` (blended Hero+Studio scroll
  progress), handing off to Projects' own layer-0 (same `homepage`-role asset) instead of a
  binary threshold reveal.
- **Hero typography motion** — was -30/-46/-62px; now -90/-130(+)/-170(+) with a late-stage
  acceleration term, closer to V1's stronger displacement.
- **Studio exit handoff** — added: label/heading/body fade + lift in the last 30% of Studio
  progress (was static throughout).
- **Projects stacked media layers** — was one swapping background; now one layer per
  `TA_PROJECTS.homepage()` project, continuously revealed over the previous via the 3
  non-identity geometries (vertical / lateral / diagonal), verified live at scroll depth 2983
  (`Architecture between movement and pause` render confirmed, `<br />` literal-text bug also
  fixed — was rendering as text, now stripped to a space since template holes don't parse
  HTML).
- **Project content hierarchy** — now `homepageProposition` (large statement) + "Project XX —
  Title" + location/year + real discipline title, replacing the old title+location-only
  display.
- **Masked counter** — restored as a translateY digit stack, denominator dynamic.
- **"Architecture and beyond" bridge** — restored, with chrome (label/footer) fading as it
  clip-reveals near the end of the Projects stage.
- **Active project routing** — fixed: now `Projects.dc.html#p=<real index>`, confirmed live
  (`href="Projects.dc.html#p=4"` on a Recognition row whose award resolves to a real project).
- **Expertise tracker bug** — `[data-hp2-discrow]` now exists on the actual rendered rows
  (confirmed: `rowCount: 5` via live query, was 0 before this pass).
- **Expertise state model bug** — `hoverDisc` no longer mutates persistent `scrollDisc`; active
  = `hoverDisc ?? scrollDisc`, confirmed via code path separation.
- **Expertise visual treatment** — restored opacity 1 vs 0.32 + indent, replacing font-size-only
  distinction (confirmed live: inactive row computed `opacity: 0.32`).
- **Expertise stacked media** — now one crossfading layer per discipline (was one swapping
  layer).
- **Expertise routing regression** — ALL `../../Expertise.dc.html` references fixed to
  `Expertise.dc.html` (header nav, drawer, footer, per-discipline row hrefs). Confirmed no
  remaining `../../Expertise` string in the file.
- **Philosophy depth** — added inner-image scale/translateY response and statement lift tied to
  `philoExpand`, not just the outer frame size.
- **Philosophy→Research diagonal wipe** — added: a scrubbed, reversible `clip-path: polygon(...)`
  on the Philosophy sticky stage keyed to `wipeT = clamp((philoP-0.7)/0.3,0,1)`. Real, not
  decorative.
- **Research tracker bug** — `[data-hp2-resrow]` now exists on rendered items (was missing).
  Items converted from `<a href="#projects">` to `<button type="button">` — no more incorrect
  keyboard-jump-to-Projects.
- **Research active media** — the 3 drawing layers now respond to `activeRes` (hover-priority-
  over-scroll, same rule as Expertise), not just to scroll-progress thresholds.
- **Research continuous staging** — the 3 layers + plan reveal now use continuous `revealClip()`
  interpolation instead of binary `resP > 0.15` thresholds.
- **Recognition routing bug** — `proj.routeIndex` (didn't exist → `#p=undefined`) replaced with
  `TA_PROJECTS.indexOf(proj.id)`. Confirmed live: real award row now resolves to
  `Projects.dc.html#p=4`.
- **Recognition hover** — replaced the vertical-padding jump (22px→26px, which shifted the whole
  list) with inline `translateX` registration + square opacity/scale, matching V1's character
  without the list-jump defect.
- **Contact 3×3 coordinate model** — replaced raw pixel-chase with a real 3×3 column/row bucket
  computed from pointer position; square/diagonal target the cell center, not the cursor.
- **Contact coarse-pointer state** — added: on `TA_LAYOUT.coarsePointer` or no active hover, the
  cell cycles from page scroll progress instead of sitting inert (V1 does have a scroll-derived
  idle state here; the prior review's claim that "V1 has none" was wrong and is retracted).
- **Mobile sticky audit** — `data-hp2-stickywrap` now applied to every scene's inner sticky
  container (Hero/Studio/Projects/Expertise/Philosophy), and the ≤900px query resets all of
  them to `position:static`, not just Hero's.
- **Reduced motion** — `redStatic` now applied to every sticky wrapper (not just Hero's), so
  toggling it collapses all five sticky scenes to normal flow, not only Hero's.
- **`TA_LAYOUT`** loaded (`../runtime/layout-mode.js`) since Contact's coarse-pointer branch now
  reads it.
- **Runtime bug**: `tick()` previously called bare `eval(k)` inside a loop over variable-name
  strings — a real risk of silent failure in a strict-mode class method. Replaced with a plain
  object diff.

## Per-section status (VISUAL / SCROLL / STATE / POINTER / MOBILE / FA / ROUTING)
- **01 Hero** — VISUAL ✓ SCROLL ✓ (verified stronger displacement, live) MOBILE ✓ (stickywrap
  reset) FA ✓ ROUTING n/a. **Parity achieved**, modulo the still-omitted intro morph loader
  (deliberate scope cut, documented previously).
- **02 Studio** — VISUAL ✓ SCROLL ✓ (exit handoff added) STATE ✓ FA ✓. **Parity achieved.**
- **03 Projects** — VISUAL ✓ SCROLL ✓ STATE ✓ (stacked layers, real proposition/meta, masked
  counter, bridge) POINTER ✓ (hover scale) ROUTING ✓ (real `#p=` index) MOBILE ✓ (chapter
  fallback unchanged). **Parity achieved** for the migration-baseline vocabulary; the exact V1
  pixel geometry of the 4 clip transitions was not reproduced number-for-number (continuous
  interpolation formulas were authored to match the *character*, per instruction §41's own
  permission not to blindly copy numbers) — flagged as the one remaining approximation.
- **04 Expertise** — VISUAL ✓ SCROLL ✓ STATE ✓ (tracker fixed, hover/scroll separated) POINTER ✓
  ROUTING ✓ (fixed to V2). **Parity achieved.**
- **05 Philosophy** — VISUAL ✓ (depth added) SCROLL ✓ (diagonal wipe now real). **Parity
  achieved.**
- **06 Research** — VISUAL ✓ SCROLL ✓ (continuous) STATE ✓ (tracker fixed, active media tied
  in) POINTER ✓ (button semantics, no wrong keyboard jump). **Parity achieved.**
- **07 Recognition** — ROUTING ✓ (bug fixed) POINTER ✓ (inline registration, no list-jump).
  **Parity achieved.**
- **08 Contact** — POINTER ✓ (3×3 model) MOBILE/COARSE ✓ (scroll-derived idle state added).
  **Parity achieved**, modulo the departure micro-interaction (square/diagonal settling before
  navigation) not being separately time-sequenced from the click — it currently just carries
  whatever state was live at click time, one authored beat short of V1's explicit pre-nav
  settle.

## What was NOT independently re-verified this pass
Fast-scroll/reverse-scroll stress test, full 320–1440 responsive sweep, and a literal
side-by-side V1↔V2 screenshot-by-screenshot walkthrough were not run — live DOM/state checks
were used instead (scroll-to-position + attribute/geometry/color inspection), which caught and
fixed real bugs (the two tracker-selector misses, the routing bug, the `<br/>`-as-text bug, the
`eval()` risk) that a screenshot-only pass would likely have missed given this environment's own
documented screenshot-capture fidelity issues (confirmed again this pass: a live-content-
verified scene still rendered blank in `screenshot_user_view`).

## Untouched
Root `Homepage.dc.html` (V1) — confirmed not written to at any point in this correction pass.
