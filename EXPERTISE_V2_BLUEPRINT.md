# EXPERTISE V2 BLUEPRINT

## DEPENDENCIES
Presentation: `../design-system/{tokens-v2,base-v2,responsive-v2}.css` only. Runtime:
`../runtime/{bidi,ambient,reveal,ui-strings,cursor,motif,section-tracker}.js`. Shared data:
`../../site-data.js`, `../../media-utils.js`, `../../expertise-data.js`, `../../projects-data.js`,
`../../journal-data.js`. Shared component: `../components/HeaderNav`. Zero root presentation
imports (confirmed against `v2/V2_ARCHITECTURE.md` §3).

## SYSTEM CAPABILITIES
- **Header theme**: `canvas` — no overlay-hero layout here, same reasoning Projects documented.
- **Contextual cursor**: `explore` on Register rows and Related Expertise rows (state→detail
  navigation); `view` on Selected Work project cards; `next` on the Next Expertise closer.
  Never on capability rows (dense structured info, not a click-through) or form-adjacent UI
  (none on this page).
- **Section tracking**: shared (`TA_SECTION_TRACKER`), `scrollRoot: window`, drives Detail's
  compact chapter indicator only — no separate progress rail (Projects already owns that
  register; Expertise stays quieter, per Interaction Density MEDIUM-HIGH not HIGH).
- **Motif mode**: reactive. Primary: the Register (hover/focus/persistent-active discipline).
  Secondary: Related Expertise (temporary hover only). Budget: 2 reactive appearances +
  1 static (closing) = 3 total, within the 2–4 guideline.
- **Interaction density**: MEDIUM–HIGH.
- **Mobile translation**: Register's sticky preview column collapses to inline per-row
  thumbnails (Projects' proven mobile pattern, reused, not reinvented); Process's sticky
  narrative becomes sequential chapter→media; hover states become tap/focus-driven.
- **Reduced-motion fallback**: hero/next depth removed; chapter counter transitions instant;
  Register's media crossfade shortens to `--m-fast`; all state (active discipline, related
  hover) remains fully readable without motion.

## OVERVIEW (dynamic — length follows `TA_EXPERTISE.all()`, never assumes a fixed count)

| # | Chapter | Archetype | Entry Reveal | Narrative Scroll | Micro Interaction | Section Handoff |
|---|---|---|---|---|---|---|
| 01 | Editorial Hero | A | H1 visible immediately (orientation-critical, never delayed) | — | — | overlaps into Register (no gap) |
| 02 | Expertise Register (Index+Preview) | E | heading `content` reveal | **shared Section Tracker drives scroll-active discipline** (hover/focus > scroll-active > default row 0); preview/motif/caption follow | hover/focus temporarily overrides scroll state; EXPLORE cursor; reactive motif | preview panel carries into next chapter's sticky column |
| 03 | Cross-disciplinary story (real projects, ≥2 replaces the old static diagram) | I (sticky) | statement `content` reveal | **shared Section Tracker drives active project chapter**; preview media + discipline tags update as each project chapter crosses the reading line | VIEW cursor on chapters | sticky column release into Closing |
| 04 | Selected Work (fallback only — renders ONLY if no real multi-discipline project exists) | I | media reveal | — | VIEW cursor | — |
| 05 | Editorial Closing | J | content reveal | — | — | — |

**Why the old "Between disciplines" section was removed**: it showed an abstract diagram (lines,
dots, no real data) that communicated nothing verifiable — decorative filler per the user's own
assessment. Replaced with a scroll-driven cross-disciplinary project story using REAL
`project.expertise` relationships (≥2 tags) resolved through `TA_EXPERTISE.projects()`/
`TA_PROJECTS`. If no project in the current data has 2+ expertise tags, this chapter is
omitted outright (never faked) and the page falls back to a plain Selected Work grid — a
strong omission over decorative filler, per the brief's own instruction.

**Scroll quality check**: 01(static, immediate)→02(scroll-active register, ~1-2vh per row)→
03(scroll-active project chapters, ~50vh per chapter)→05(reveal) — a meaningful state change
occurs at least every 1-2 viewport heights through the Register and Cross-disciplinary story;
no dead zone longer than that.

## DETAIL (dynamic — chapters conditionally rendered per record's real content)

| # | Chapter | Entry Reveal | Narrative Scroll | Condition |
|---|---|---|---|---|
| 00 | Hero | media reveal + hero settle on scroll | hero depth (≤5%/1.02, scroll+setTimeout tick) | always |
| 01 | Approach | label + lead `content` reveal | — | `lead` or `body` exists |
| 02 | Capabilities | heading `content`, rows `group` stagger | — | `capabilities.length` |
| 03 | Process | (sticky narrative is itself the entrance) | **shared narrative counter** — active phase follows reading position | `hasProcess` && phases exist |
| 04 | Selected Work | media reveal | — | `projects(slug).length` |
| 05 | Knowledge | rows `group` stagger | — | real Journal relationship, not the `hasKnowledge` flag |
| 06 | Related Expertise | label `content` reveal | hover/focus preview swap | `related(slug).length` |
| 07 | Next Expertise | media reveal | next-project depth on scroll | always — strong section handoff into the next discipline |

A compact chapter indicator (shared `TA_SECTION_TRACKER`, `scrollRoot: window`) drives Section
Awareness across whichever chapters actually rendered for this record.

## Taxonomy resilience
Every count, index, motif-cell mapping, and section-existence check reads from
`TA_EXPERTISE.all().length` / `.projects()` / `.phases()` / `.related()` / `.next()` at render
time — nothing hardcodes "five disciplines." Adding, removing or reordering a record in
`expertise-data.js` changes the Register length, motif cycle, and Next-Expertise target with
no page code change (smoke-tested via `__addForTest`/`__removeForTest`, see review doc).
