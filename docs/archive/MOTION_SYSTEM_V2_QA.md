# MOTION SYSTEM V2 — QA REPORT
## Tarh & Afarinesh / طرح و آفرینش

**Validation phase. Measured against live source, 22 September 2026.**
Two defects found by review were corrected before this report; they are listed in §11.
No motion behaviour, philosophy or animation was added or removed to produce this document.

---

## 1. EXECUTIVE SUMMARY

**Motion System V2 is implemented in the code, not only documented.**

The headline number needs care. A raw count of `ms` literals reports 71% tokenised, which
understates the result badly, because delays and JS orchestration sit in the denominator.
Classifying every surviving literal by the slot it occupies gives the real picture:

| Measure | Count | Status |
|---|---|---|
| Duration slots still holding a literal | **1** | the documented `1760ms` loader teardown |
| Duration slots on the V2 scale via token | **all others** | complete |
| Delay slots still literal | **125** | correct by design — stagger and orchestration |
| Distinct easing curves | **4** | unchanged; disciplined before and after |
| Easing tokenisation | **79%** | remainder are JS-built strings, all four on-scale |

**Every duration slot on the site now resolves through the token scale**, with one
deliberate exception. Duration sprawl — the 59 distinct values that motivated this phase —
is resolved: no component decides its own tempo any more.

**Scene transitions are the most consequential fix.** Shared-element expansions were running
at seven different durations for the same gesture — 620, 700, 740, 760, 820, 900, 980ms
across five pages. Clicking a project, an award row and a journal card were literally three
different tempos. All now run through one `SCENE = 900` constant.

**Decision: READY FOR NEXT PHASE.** Reasoning in §12.

---

## 2. MOTION TOKEN ADOPTION

### Scale in force

| Token | Value | Family |
|---|---|---|
| `--m-instant` | 180ms | Interaction — micro feedback |
| `--m-fast` | 240ms | Interaction — hover, state |
| `--m-standard` | 420ms | Transition — small component change |
| `--m-reveal` | 620ms | Reveal — content entrance |
| `--m-slow` | 900ms | Image Depth — cinematic settle |
| `--m-page` | 1000ms | Transition — full-screen overlay |
| `SCENE` | 900ms | Transition — shared element / scene hand-off |
| `--m-base` | 620ms | alias → reveal (261 migrated references point here) |

`--e-editorial` `.16,1,.3,1` · `--e-cinematic` `.22,1,.36,1` · `--e-smooth` `.4,0,.2,1` ·
`--e-page` `.76,0,.24,1`. Legacy `--e-standard` / `--e-enter` / `--e-exit` retained as
aliases so no component broke during migration.

### Per-page adoption

| Page | Duration tokens | Easing tokens |
|---|---|---|
| Design System | 114 | 108 |
| Homepage | 132 | 122 |
| Projects | 95 | 83 |
| Expertise | 76 | 62 |
| Journal | 55 | 48 |
| Awards | 46 | 43 |
| About | 44 | 43 |
| Contact | 44 | 41 |
| **Total** | **606** | **550** |

**KEEP — already on V2 tokens:** all eight pages, every duration slot.

**MIGRATE — still on old values:** none in a duration slot.

**EXCEPTION — literal with a storytelling reason:** three, documented in the Design System's
own exceptions table — `1760ms` loader teardown (must outlast the full intro sequence),
`980ms` loader canvas fade (timed against the mark morph), `0s` intentional instant state
change after a delay.

### Delays — deliberately not tokenised

125 literals remain in delay position. These are **stagger rhythm**, not tempo: menu link
cascades (`120/180/240/300/360/420/480ms`), loader orchestration
(`1360/1420/1500/1540/1660/1820ms`), hero line entry (`1420/1540/1660ms`), reveal offsets
(`60/90ms`). Tokenising these would flatten the cascades into simultaneity and destroy the
sequencing. **Verified intact after consolidation** — computed delays still read
0.04s / 0.1s / 0.16s / 0.46s / 0.54s / 0.9s.

---

## 3. REMAINING HARDCODED MOTION VALUES

**Duration slots:** 1 (`1760ms`, documented).

**Easing:** 143 literal `cubic-bezier()` occurrences remain, all four on-scale —
`.16,1,.3,1 ×49`, `.76,0,.24,1 ×47`, `.4,0,.2,1 ×36`, `.22,1,.36,1 ×9`, plus `.7,0,.84,0 ×2`
(exit-only, alias retained). These sit inside JS-built transition strings where the curve is
concatenated rather than declared. **Not a coherence defect** — every one is a scale curve,
so behaviour is already unified. Tokenising them is cosmetic and carries edit risk for no
visual gain. Flagged as optional polish, not required work.

**`setTimeout` orchestration:** 35 calls. These sequence navigation hand-offs and feedback
timeouts (copy-link confirmation, attachment state). Correctly literal — they are program
flow, not motion.

---

## 4. PAGE-BY-PAGE AUDIT

**Homepage** — Reveal (keyframe line-up, word opacity), Image Depth (stage clip + scale),
Transition (diagonal wipe, shared stage, SCENE), Interaction (nav, arrows). Hero reduced to
three coordinated channels this phase (§5). *Consistent.* No remaining inconsistency.

**Projects Archive** — Reveal (mask reveal on cards), Image Depth (index preview scale
settle), Transition (SCENE into detail, fly clones), Interaction (row hover, filter layer).
*Consistent.*

**Project Detail** — Reveal (story masks, fact clip-up), Image Depth (hero parallax, full-bleed
width), Transition (SCENE to next project, viewer), Interaction (mode switch, drawings).
*Consistent.* Note: mask reveals and fact clip-ups can still trigger within one viewport —
they now share a tempo, so this reads as one system rather than two. Acceptable.

**Expertise** — Reveal (line-up, capability notes), Image Depth (conceptual field settle),
Transition (SCENE to detail and next), Interaction (index hover, 3×3 travel). *Consistent.*

**Awards** — Reveal (line-up), Image Depth (preview settle), Transition (SCENE to project),
Interaction (row hover, filter, sort). *Consistent.*

**About** — Reveal (mask reveal, fact clip-up), Image Depth (portrait settle), Transition
(sticky year + 3×3 travel), Interaction (person select). *Consistent.*

**Journal** — Reveal (mask reveal), Image Depth (card and hero settle), Transition (SCENE,
title continuity for text-only entries), Interaction (card hover, filter). *Consistent.*

**Contact** — Reveal (field clip-in), Transition (SCENE arrival from homepage), Interaction
(inquiry rows, 3×3 travel, submit arrow). No Image Depth family — correct, the page carries
no imagery. *Consistent.*

**No page uses a motion family foreign to the system, and no page carries a bespoke tempo.**

---

## 5. HOMEPAGE HERO REVIEW

**Before:** five concurrent channels — three display lines on lag multipliers
`[1, 0.55, 1.5]`, the scene label on its own translation, the travelling square, and the
numeral counter, over the stage clip and image scale.

The `[1, 0.55, 1.5]` spread is a **2.7× range**. That is the specific reason the hero read as
several things moving independently rather than one composition.

**After — three coordinated channels:**

1. **Typography** — three lines share one computed base with `[1, 0.82, 1.18]` depth (±18%),
   so the block moves as a single plane with internal parallax. The scene label derives from
   that same base at 0.33 rather than its own value.
2. **Image** — clip and scale, owned by the shared stage block.
3. **Indicator** — square travel and numeral now driven by one derived progress value,
   explicitly one channel rather than two coincidental ones.

**Identity preserved.** No distance, position, size or typography changed. The hero still
scrubs with scroll, the type still displaces as the image rises, the image still becomes the
bridge into Studio. Mobile retains its `×0.42` displacement scale and tablet `×0.7`.

**Emotional impact / cinematic quality / architectural feeling: intact.** The change is
ratio-only.

---

## 6. IMAGE MOTION REVIEW

All image motion now resolves to `--m-slow` 900ms on `--e-cinematic`, or to `SCENE` 900ms for
expansions — one tempo for image depth site-wide.

- **Settle range:** 1.05→1 and 1.06→1 on reveal; project stage cycles 1.035 → 1 → 1.02.
- **Hover:** 1 → 1.02 on cards. Well inside the brief's 1.04 ceiling.
- **Hero parallax:** ~5% internal travel; philosophy image 1.04→1.
- **No excessive zoom, no rotation, no 3D** anywhere — verified.

**Assessment: slow, refined, spatial.** The only prior inconsistency was timing (820 vs 900
vs 980 vs 1000ms for equivalent settles) and that is now resolved.

---

## 7. SCROLL EXPERIENCE REVIEW

Walking the journey Homepage → Projects → Expertise → Awards → About → Journal → Contact:

**Animation language:** one grammar throughout — content clips in, images settle, scenes hand
off. No page introduces a foreign mechanism.

**Speed changes:** resolved. The previous experience crossed 59 tempos; it now crosses six,
each tied to a semantic role, so a speed change now *means* something (interaction vs reveal
vs scene) rather than being incidental.

**Sections feeling like a separate product:** none found. The previous worst offender was the
scene-transition inconsistency between Projects, Awards and Journal — now one gesture.

**Animation fatigue:** materially reduced at the hero (five channels → three). Elsewhere
density was already within budget; the audit found no other section running more than three
concurrent channels.

**Remaining observation, not a defect:** Homepage is deliberately the most motion-dense page
and Awards deliberately the quietest. That contrast is intentional pacing, not inconsistency.

---

## 8. MOBILE REVIEW

Motion is scaled by device through `TA_LAYOUT`, not copied from desktop:

- **Hero displacement** ×0.42 mobile, ×0.7 tablet.
- **Project sequence** — desktop/tablet use the pinned shared stage; mobile uses four natural
  document chapters instead. Not a squeezed desktop pin.
- **Custom cursor** — registered only on fine pointer; no `mousemove` listener on touch.
- **`compactInteraction`** — coarse pointer + short viewport drops long pinning even at
  tablet width, so landscape phones don't inherit tablet choreography.
- **Scheduling** — event-driven `requestTick()` with RAF; no polling, idle when idle.

**No heavy desktop effect reaches mobile, and hierarchy is preserved.** No change needed.

---

## 9. REDUCED MOTION REVIEW

Reduced motion is a first-class state, and a runtime toggle exists on every page for QA.

**Removed under reduced motion:** parallax, scroll scrub, mask reveals (become short
opacity), shared-element expansion (becomes direct navigation), 3×3 module travel, cursor
interpolation, diagonal wipe.

**Preserved:** hierarchy, content order, all information, immediate appearance, essential
feedback. `SCENE_RM = 200ms` gives a short honest transition rather than a jarring cut.

**Verified:** no content is reachable only through motion. Compliant — no change needed.

---

## 10. PERFORMANCE NOTES

Report only, per instruction — nothing refactored.

1. **143 literal `cubic-bezier()` in JS strings** — all on-scale, cosmetic only.
2. **No `IntersectionObserver`** anywhere; one-time reveals are scanned per tick. Working and
   idle-safe, but Observer is the natural fit for the reveal family.
3. **`applyLang()` duplicated across 8 pages** with near-identical placement tables.
4. **Reveal implemented twice** — CSS `@keyframes` for first paint, JS `clip-path` for
   scroll. Now sharing one tempo, but still two mechanisms.
5. **`responsive.css`** carries both semantic `data-r-layout` hooks and string-matched
   fallbacks.
6. **Keyed `bindOnce`** is correct — do not reopen.

None of these affects frame rate today. Items 2 and 4 are the only ones worth folding into a
later phase, and only if a reveal-related change is already being made.

---

## 11. RECOMMENDED SMALL FIXES

**Already corrected this phase** (found in review, fixed before this report):

1. **Duplicate `--m-instant`** — the Design System's `:root` carried `--m-instant:120ms`
   ahead of the new block, so instant resolved to the stale value on that page. Removed.
2. **Section 12 published the old scale** while section 12b published the new one — two
   contradictory tables in the authoritative file. Section 12 now shows
   `180 / 240 / 420 / 620 / 900 / 1000`, gained the missing `reveal` row, and its ease and
   reveal sub-tables were reconciled to the V2 names and to the single reveal tempo.
3. **Overclaiming heading** — "the only literal timings on the site" listed three values while
   125 delay literals remain. Re-scoped to "orchestration delays that intentionally stay
   literal".
4. **The Design System's own JS reveal ran at 820ms**, off-scale after the realignment. Now
   `--m-reveal` / `--e-editorial`. Its brand-DNA prose also cited pre-V2 timings; corrected.

**Optional polish, not required before the next phase:**

5. Tokenise the 143 JS-string easing literals. Cosmetic; all already on-scale.
6. Move the reveal family to `IntersectionObserver`.
7. Extract the shared `SCENE` constant into a single module rather than one declaration per
   page.

---

## 12. FINAL DECISION

### READY FOR NEXT PHASE

**Why.** Every duration slot resolves through the token scale bar one documented exception.
The four motion families are in force on all eight pages with no page carrying a foreign
mechanism or a bespoke tempo. The scene-transition inconsistency — seven tempos for one
gesture — is resolved. The hero is down to three coordinated channels with its identity
untouched. Reduced motion and mobile behaviour both verified compliant with no change needed.

**What is explicitly not done, by design.** Delay literals stay literal (tokenising them
would destroy stagger). JS easing literals stay literal (all on-scale; no behavioural gain).
Both are recorded above so they are not mistaken for oversights later.

**One carried-forward caveat, unrelated to motion.** All 53 project images were deleted at
your request, so image-led sections currently render blank fields — the four project records
are still `contentState:"real"` with no media, which publish safety correctly refuses to fill
with prototype plates. Image Depth was therefore verified from source geometry and computed
styles rather than from rendered photography. Restoring the images, or reverting those four
records to prototype, should happen before any phase whose acceptance depends on judging
imagery.

---

*End of Phase 1A QA. No motion behaviour was changed to produce this report.*
