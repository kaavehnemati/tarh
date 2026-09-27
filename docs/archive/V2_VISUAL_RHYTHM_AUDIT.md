# V2 VISUAL RHYTHM AUDIT
Phase 2.1. Audits the four migrated pages against the spatial-editorial goal: visual richness
from content/media/composition/scale/motion, not decorative effects. No file changed by this
document — findings only.

## Legend
`TEXT` text-dominant · `MEDIA` media-dominant · `STRUCT` structured/archive · `INTER` interactive
· `DARK` Surface 4 · `FACT` visual/quantitative fact · `PAUSE` transition/pause
`CALM`/`FOCUS` — a chapter's role in Principle 01c's rhythm check; `Primary focus` — its one
dominant layer per Principle 01b.

## Calm/Focus & busyness QA (all four pages)

| Page | Sequence | Flags |
|---|---|---|
| About | FOCUS,FOCUS,CALM,FOCUS,FOCUS,CALM,CALM,FOCUS | 01→— is one idea (proposition→its photo), not a real repeat; 04→05 (media+interaction→interaction) differ in primary focus. **No busyness flag.** |
| Awards (post-change) | FOCUS,CALM,FOCUS,CALM,FOCUS | Alternates cleanly. **No flag.** |
| Journal | FOCUS,FOCUS,CALM,FOCUS (archive) + alternating (detail) | 01→02 is hero→its lead story, same pattern as About. **No flag.** |
| Contact (post-change) | FOCUS,CALM,FOCUS,CALM,CALM,CALM,FOCUS | Three CALM in a row (03–05) — permitted; Principle 01c flags repeated FOCUS, not repeated CALM. A quiet reading stretch through the form and studio info is the deliberately calm register a contact page's functional core should have. **No flag.** |

No chapter on any page combines more than one of {strong media, strong typography, strong
interaction, strong surface change, strong motion} without narrative reason (Principle 01b) —
each chapter's "Primary focus" column below names the one dominant layer.

## About V2

| # | Section | Type | Surface | Ambient | Primary focus | Calm/Focus |
|---|---|---|---|---|---|---|
| 01 | Opening | TEXT→MEDIA | 0 | full | typography | FOCUS |
| — | Studio media band (real photo) | MEDIA | 1 | (media, occluded) | media | FOCUS |
| 02 | Practice | TEXT | 1 | soft | typography (quiet) | CALM |
| 03 | Philosophy | TEXT | **4 DARK** | off | typography | FOCUS |
| 04 | People (leadership + portrait + team) | MEDIA + STRUCT | 0 | minimal | media+interaction | FOCUS |
| 05 | History (interactive chronology) | INTER | 1 | minimal | interaction | FOCUS |
| 06 | Evidence (numbers) | FACT | 2 | minimal | scale (facts) | CALM |
| 07 | Recognition | STRUCT | 0 | soft | structure (quiet) | CALM |
| 08 | Closing | TEXT | 0 | full | typography | FOCUS |

**Assessment: no white-stack.** 02→03 is TEXT→DARK (real state change), 03→04 is DARK→MEDIA,
04→05 is MEDIA→INTER, 05→06 is INTER→FACT. About already has the richest rhythm of the four —
real studio photography, a genuine dark interlude, an interactive chronology, and a facts field,
in addition to text chapters. This is the reference the other three should resemble, not the
page needing rework. **No change made** — see "About V2 assessment" below for the one real
opportunity (History imagery) which is blocked on missing assets, not on composition.

## Awards V2

| # | Section | Type | Surface | Ambient |
|---|---|---|---|---|
| 01 | Opening | TEXT | 0 | full |
| 02 | Selected recognition | STRUCT (card grid) | 1 | soft |
| 03 | Archive (filter/sort + rows + shared preview) | STRUCT+INTER | transparent | minimal |
| 04 | Recognised work | STRUCT | 1 | soft |
| 05 | Closing | TEXT | 0 | full |

**WHITE STACK flagged: 01 → 02.** Both are Surface 0/1, light, text/structure only, no real
media (the "shared preview" in 03 is real only when a project has real media — currently none
of the four real projects carry `src`, so it renders the neutral plate state). 04 is also
text/structure-only directly after 03's interactive register — a second, milder repetition of
the same texture (structured rows, no media, no interaction) right after the first.
**This is the page the brief calls "too text-led," correctly.** See "Awards V2 assessment."

## Journal V2

| # | Section | Type | Surface | Ambient |
|---|---|---|---|---|
| 01 | Opening | TEXT | 0 | full |
| 02 | Featured story | MEDIA (16:9 hero image) | off | off |
| 03 | Archive (mixed-rhythm card grid: large/medium/text/portrait cycle) | MEDIA+STRUCT | 1 | soft |
| 04 | Closing | TEXT | 0 | full |
| D1–D7 (detail) | opening → hero media → body+TOC → wide media → media pair → modules → relations | full sequence | mixed | mixed |

**Assessment: no white-stack.** 01→02 is TEXT→MEDIA, 02→03 continues MEDIA at a different
scale/density, and the detail template alone runs five of the ten archetypes (Editorial Hero,
Full Media Stage, Structured Field via TOC, Media Pair, Editorial Closing via Relations). This
is explicitly the strongest V2.1 reference per the brief. **No change made.**

## Contact V2

| # | Section | Type | Surface | Ambient |
|---|---|---|---|---|
| 01 | Opening | TEXT | 0 | full |
| 02 | Inquiry type | INTER (but visually: text rows + rules) | 1 | soft |
| 03 | Contextual form | INTER | 0 | off |
| 04 | Studio information + offices | STRUCT | 1 | minimal |
| 05 | Other pathways | TEXT | 1 | soft |
| 06 | Closing | TEXT | 0 | full |

**WHITE STACK flagged: 01 → 02 → 03 → 04.** Four consecutive chapters are Surface 0/1, light,
with no media, no scale event, and no surface contrast beyond ambient-zone opacity — exactly
the "white canvas + text + rules + small turquoise accents" pattern the brief describes. 02 and
03 are genuinely interactive (selection, form), which the brief's own No-White-Stack rule
exempts ("without interaction" is one of the disqualifying conditions) — but 03→04 has no
interaction contrast (form → static info rows) and no scale/surface event between them. This
is the weakest sequence of the four pages. **This is the page the brief calls out explicitly.**
See "Contact V2 assessment."

## Page assessments / changes made

### About V2 — assessment, no change
Already the richest of the four (real photography, a genuine Surface 4 interlude, an
interactive chronology, a facts field). The one real opportunity — canonical imagery at
History's key milestones (Step 20) — is blocked on the same missing-assets problem documented
above; `about-data.js`'s history entries carry no media records to resolve. Not invented.
**No file changed.**

### Awards V2 — assessment + change
Confirmed too text-led (the brief's own diagnosis was right). Two changes, both additive and
reversible, using only existing V2 capabilities — no new markup pattern, no redesign:
- "02 Selected recognition" gained `data-grid-surface="light"` — the Structured Field surface
  identity (registration lines + static turquoise wash) it never opted into, giving it a
  distinct visual texture from the plain-rules opening.
- "04 Recognised work" gained `data-grid-surface="standard"` — a denser variant, so it reads
  as a different register from both 02 and the Archive above it, rather than a third repeat of
  "rules + text."
Real media in the shared preview (03) remains the higher-leverage fix once project photography
exists — the composition already supports it with zero further change.

### Journal V2 — assessment, no change
Confirmed the strongest reference (brief's own diagnosis). Featured hero, mixed-rhythm archive
grid, and the five-archetype detail template already deliver real rhythm. **No file changed.**

### Contact V2 — assessment + change
Confirmed the weakest sequence (brief's own diagnosis) — four light, text/rule chapters in a
row. Two changes, honoring "no real media exists → use scale/surface/interaction, don't invent
an image" (Step 23):
- New short Surface 4 interlude (archetype G, Dark Interlude) inserted between "01 Opening" and
  "02 Inquiry type" — one line, ambient off, ends the immediate white-canvas run right after the
  hero and gives the page a second surface state before the interactive middle section.
- "04 Studio information" gained `data-grid-surface="standard"` — Structured Field identity
  (Principle 09), differentiating it from both the form above and "05 Other pathways" below.
No image was invented; no form field, validation, or data source changed.

## Cross-page finding: the real-media blocker

`assets/` contains exactly one real image (`assets/about/studio-portrait.png`, already used by
About). The four `contentState:"real"` projects (`project-001..004`) carry no `src` on their
media objects, so `TA_MEDIA.resolve()` returns the neutral plate state for all of them — Awards'
"shared preview," Journal's card thumbnails, and any Projects/Expertise media are all rendering
placeholder plates today, not photography. **Steps 7, 8, 20, 21, 22's instruction to make media
a first-class primitive is correct in principle but has almost nothing to draw on today.** Per
the brief's own Step 24 and Step 23 fallback ("if no real media exists, do not invent an image —
use scale, surface contrast, structured information, interaction instead"), the changes below
lean on composition/scale/surface/interaction, not new imagery. Restoring real photography
remains the single highest-leverage fix for V2's visual richness — flagged again here, as it
was in the original `VERSION_STRATEGY.md` §9, and still unresolved.
