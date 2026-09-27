# PROJECTS V1 SCROLL CHOREOGRAPHY AUDIT
Inspects the actual runtime behavior in the current `Projects.dc.html` (root, V1) — not just
prior documentation — before touching V2.

## Hero depth (`data-dt-hero` / `data-dt-heroimg`)
`tick()` computes `p = clamp(-heroRect.top / heroRect.height, 0, 1)` as the hero scrolls past,
then sets `translateY(p*5%) scale(1 + p*0.02)` on the hero image layer — a small, continuous
settle (max 5% vertical drift, max 1.02 scale) as the hero leaves the viewport.
**PRESERVE CONCEPT** — subtle, meaningful (communicates depth/settling), cheap. **Rebuilt as a
shared V2 system**: a generic "scroll depth" primitive any Full Media Stage can opt into,
event-driven (only ticks while the element is in an IntersectionObserver's active set).

## Full-bleed media (`data-dt-full`)
Fixed `width:90vw` container; `tick()` applies a comparable settle transform to
`data-dt-fullinner`. V1 does **not** actually animate the 90vw→100vw width itself in the code
inspected — the "expansion" is the same depth/scale settle as the hero, on a near-full-width
(not full-width) container. **REFINE**: rebuilt as one true width-expansion primitive (contained
→ near-full → full as it enters the reading zone) since that reads as a more deliberate "this
image matters" event than another depth-settle would, and the brief explicitly asks for it.

## Sticky narrative (`data-dt-narrcol` / `data-dt-narrmedia` / `data-dt-narrcount`)
Sticky caption column; a vertical counter (`data-dt-narrcount`, translateY by 12px steps)
tracks which media item is nearest the reading line as the media stack scrolls past.
**PRESERVE CONCEPT** — rebuilt as archetype D with the same counter mechanic, IntersectionObserver-driven instead of scroll-position math.

## Next project (`data-dt-nextinner`)
Same depth-settle transform pattern as hero/full, keyed to a `0.5 - p` curve (peaks at center
of its viewport transit). **PRESERVE CONCEPT** — rebuilt on the same shared depth primitive.

## Drawings (`data-dt-plan`)
A single plan reveals via `clip-path:inset(0 100% 0 0)` → open, a structural "line drawing
itself in" rather than a fade. **PRESERVE CONCEPT** — rebuilt as "Drawing Build," used only on
the first/primary drawing per Part IV's 3–5-moment budget.

## Section nav / chapter indicator (`data-secnav`)
Fixed-position pill, bottom-left (RTL: bottom-right), appears once `scrollY > 0.8 * vh` (i.e.
after the hero clears). Built from `[data-sec]` elements actually present in the DOM for *this*
project (content-aware — a sparse project with fewer sections gets a shorter list
automatically). Shows a vertically-transitioning count + the active chapter's label, chosen by
which section's midpoint sits within `vh * 0.4` of the reading line.
**PRESERVE CONCEPT — this is the single most valuable idea to recover.** Rebuilt as V2's
"Active Chapter Indicator" primitive, same content-aware construction, same restrained visual
weight, IntersectionObserver-driven instead of a per-frame section-midpoint scan.

## Progress rail (`data-prog` / `data-prog-num` / `data-prog-sq`)
Fixed right-edge (RTL: left) thin 1px vertical track with a small square marker and a 3-digit
number — a page-scroll-fraction indicator, restrained, no percentage bar.
**PRESERVE CONCEPT** — rebuilt as V2's "Scroll Progress" primitive, same visual restraint
(1px track + small square, no thick bar, no percentage label unless it earns its place).

## Detail information architecture (tabs: Description / Team / Awards)
**REMOVE.** This is the one V1 idea explicitly *not* preserved — it fragments the vertical
narrative into a tab-switch interaction, which the current brief correctly diagnoses as
working against "one coherent story read top to bottom." Every tab's content becomes its own
chapter in the new Project Presentation Spine instead.

## Archive → Detail transition (`data-shared` / `data-shared-inner`, `SCENE=900/SCENE_RM=200`)
A genuine shared-element clone: the clicked row/image's element is cloned into a fixed-position
overlay, animated to the hero's final box, then swapped for the real hero. 900ms, no bounce.
**REBUILD AS SHARED V2 SYSTEM** — this is exactly the "richer transition" the user now wants
restored. Rebuilt on V2 motion tokens (`--m-page`/`--e-cinematic`), reduced motion becomes a
plain crossfade (matches V1's own `SCENE_RM=200` reduced-motion equivalent).

## Detail → Archive
V1 remembers `{ mode, y, pid }` on navigating into a project and restores scroll position on
return. **PRESERVE CONCEPT** — Projects V2 already does this (`this.archiveY`); kept unchanged.

## Mobile differences
No secnav-specific mobile treatment found in the inspected runtime beyond the generic
`responsive.css` collapse; the brief's own guidance (compact chapter pill, not a tall rail) is
a genuine improvement over V1, not a preservation.

## Reduced motion
V1 gates the hero/full/next settle transforms behind `!red`; secnav/progress transitions stay
functional but instant. **PRESERVE CONCEPT** exactly — every new V2.2 primitive gets the same
treatment: instantly resolved, fully accessible, no missing content.
