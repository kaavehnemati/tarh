# AWARDS V2 REVIEW
## Tarh & Afarinesh / طرح و آفرینش

`v2/pages/Awards.dc.html` against `Awards.dc.html` (V1). First page migrated to Design System V2.

---

## Structure — V1 → V2

| V1 | V2 | Why |
|---|---|---|
| Opening | **01 Opening** — editorial hero, one-line philosophy, year range | Adds a stance: recognition as part of practice |
| — | **02 Selected recognition** — the three most recent *Winner* records at numeric scale | V1 gave real awards the same weight as 27 placeholders |
| Recognition index | **03 Archive** on **Surface 2** with the hairline grid field | The Phase 0 audit's weakest surface; a register needs structure, not decoration |
| Filter overlay | Inline category + level filters in the archive head | Filtering stays one tap away without a full-screen layer |
| — | **04 Recognised work** — projects ranked by recognition count | Ties awards back to the architecture they honour |
| Close | **05 Closing** — one statement, closing rhythm, then the footer | Editorial ending instead of a bare link |

**Content preserved.** All 35 records render in the archive — 35/35 verified — with the same year,
name, category, level and project. Nothing is invented.

**Only real content is promoted.** *Selected recognition* shows `level:"Winner"` records whose linked
project is `contentState:"real"` — today the three Project 01 winners (SBID International Design
Awards; International Hotel & Property Awards — Restaurant within a Hotel, and — Spa Hotel).
*Recognised work* counts only those real relations — today Imam Khomeini International Airport
Hotel, 8 recognitions. Placeholder records appear in the archive but are never elevated.

*Fixed in review:* the first version selected by `featuredOnAbout`, which prototype records also
carry, so it promoted placeholder "Award 01/04/05" at numeric scale while the real winners never
appeared. Realness now comes from the linked project's `contentState`, not from a flag.

---

## Design System V2 consumption — measured

| | V1 | V2 |
|---|---|---|
| Persian metric ternaries | 5 | **0** type-metric ternaries — `[dir="rtl"]` resolves every role. (Two `fa ? … : …` remain, both the EN/فا button opacities: UI state, not type metrics.) |
| Inline `grid-column` numbers | 10 | **0** — `--span-*` only |
| Literal `repeat(12,1fr)` | yes | **0** — `repeat(var(--grid-cols),1fr)` |
| Literal font sizes | inline `clamp()` | **2** — the `12px / 13px` EN/فا switch labels only |
| Literal durations | several | **1** — `60ms`, a delay (stagger), correctly literal |
| Unresolved `var()` | — | **0** |

Loads `../../tokens-v2.css` and sets `window.TA_ASSET_BASE = "../../"` before `media-utils.js`, per
`v2/pages/README.md`.

---

## Review

**Identity preserved.** Archive-first, not a trophy wall. Sticky years, chronological grouping,
one shared project preview (never per-row thumbnails), studio/person rows still valid without a
project, asymmetric label/body and index/preview splits, turquoise only as state.

**Hierarchy improved.** The page now has three distinct registers instead of one flat list: a
selected few at numeric scale, the full archive, and the work it points to. Real recognitions
read as more important than placeholders because the data says they are.

**Readability.** Rows are split into name (heading-S) and a quieter meta + subject column; the
archive head carries sort, filters and a live `shown / total` count.

**Persian quality — verified live.** With فا selected: `dir="rtl"`, Vazirmatn, the hero resolves
`--t-dm` to its Persian value (`clamp(34px,3.8vw,72px)`) at weight **700** with zero tracking, and
metadata tracking drops to 0 — all by inheritance, with no per-element language logic.
Line breaks are composed per language, not mirrored.

**A bug found and fixed during review.** The Latin-name rule was carried over from V1: any string
containing Latin was forced LTR, so *"جوایز بین‌المللی طراحی SBID"* rendered in the wrong reading
order. V2 now treats a name as an LTR island only when it contains **no Persian script at all**.
Verified: that string now reads RTL. *(V1 still has the original behaviour — left untouched by
rule; worth fixing when V1 is retired.)*

**Responsiveness.** Layout collapses 12 → 8 → 4 through the token layer with no page media
queries. The shared preview hides on mobile via a `matchMedia` listener, so the register stands
alone. No horizontal overflow at the preview width.

**Motion quality.** Reveal on the hero (clip + 24px lift on `--m-reveal` / `--e-editorial`),
interaction on rows (indent + indicator on `--m-standard`), image depth on the preview (scale
settle on `--m-slow` / `--e-cinematic`). No page-specific animation. Reduced motion disables the
hero reveal and the token layer collapses the scale.

---

## Deliberate differences from V1

- **No fullscreen menu, cursor or progress rail yet.** Those are global components; they belong
  in `v2/components/` once a second V2 page needs them, not rebuilt per page.
- **Filters are inline and cover category + level.** Year is already the grouping axis, so V1's
  year filter is redundant against sticky year groups.
- **Header links point to V1 pages** (`../../X.dc.html`) until those pages have V2 versions.

## Open

- Project imagery is still missing, so the shared preview correctly stays empty for real
  projects rather than showing a placeholder plate. Its behaviour is verified; its visual
  impact can only be judged once photography returns.
- `RecognitionRow` should become a `v2/components/` component when About V2 is migrated —
  Awards is the first of its two users.
