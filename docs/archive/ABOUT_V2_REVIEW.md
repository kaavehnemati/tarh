# ABOUT V2 REVIEW
## Tarh & Afarinesh / طرح و آفرینش

`v2/pages/About.dc.html` against `About.dc.html` (V1). Second page on Design System V2.

## Structure — V1 (9) → V2 (8)

| # | Section | Surface | Change |
|---|---|---|---|
| 01 | Opening — the composed statement | 0 | Display L, full editorial width; placeholder facts moved out of the hero |
| 02 | The practice — lead + two paragraphs | **1** | Tonal step so two text sections don't run on one ground |
| 03 | **Philosophy** — statement + three themes | **4 (ink)** | The page's manifesto now changes register instead of sitting mid-list |
| 04 | People — shared portrait stage + team index | 0 | Kept V1's editorial model; select by tap, hover or keyboard |
| 05 | History — five milestones as a register | **1** | Compact register, not a timeline — it holds only placeholders today |
| 06 | Evidence — numbers + clients | **2** + grid field | A register, so structure rather than decoration |
| 07 | Selected recognition | 0 | Links to Awards V2 |
| 08 | Closing — thinking statement | 0 | Closing rhythm, then the footer |

V1's separate *Thinking* section became the closing statement, which gave the page an ending.

## Content preserved

Every value comes from `about-data.js` or V1's own markup: 4 leadership profiles, the full team
index, 5 milestones, 3 themes, statistics, 12 clients. **All placeholders stay placeholders** —
`[YEAR]`, `[ROLE]`, `XX` — nothing is invented. The two statements keep V1's per-language line
breaks.

**Recognition carries the Awards V2 fix.** V1 selects by `featuredOnAbout`, which prototype records
also carry. V2 shows only Winners whose project is `contentState:"real"` — today the three real
Project 01 awards, starting with *SBID International Design Awards*.

## Design System V2 — measured

No inline font family or direction; fonts and Persian metrics resolve through `tokens-v2.css`.
Grid is `repeat(var(--grid-cols),1fr)` with `--span-*` only. All years, statistics and names
render through `TA_BIDI.parts()` and the Layer 4 utilities. **0 unresolved tokens** after one fix:
`--canvas-40` exists only in V1 pages, so V2 now uses its value directly (worth promoting into
`tokens-v2.css` when a second V2 page needs it).

## Review

- **Identity** — calm, editorial, asymmetric; turquoise only as state; no cards.
- **Hierarchy** — three registers now (statement, people, evidence) with one manifesto moment,
  instead of nine sections of equal weight.
- **Persian** — composed statements, RTL through `[dir="rtl"]`, numbers and Latin runs isolated.
- **Responsive** — 12 → 8 → 4 via tokens; the portrait stage hides on mobile and the names stand alone.
- **Motion** — Reveal on the hero only; interaction on the people list. Calm by design.

## Deliberately not carried over

- The sticky oversized year with the travelling 3×3 module — it animates placeholder years.
  Restore it once real history exists.
- Header menu, cursor and progress rail — global components, to be built once in `v2/components/`.

## Open

- Portraits and studio imagery are prototype plates until real photography returns.
- `RecognitionRow` now has two users (Awards, About) — the moment to extract it into
  `v2/components/`.
