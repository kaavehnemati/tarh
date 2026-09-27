# AWARDS V1 AUDIT
## Tarh & Afarinesh / طرح و آفرینش

Audit of `Awards.dc.html` (V1), measured before building V2. V1 is not modified.

---

## Structure

Three sections:

1. **Opening** — "Awards & recognition" at display scale, a count line, a year range, a
   placeholder-data note, then a control row: Newest / Oldest sort and a FILTER button.
2. **Recognition index** — records grouped by year. Each group has a **sticky year** beside
   its rows. Each row shows award name, category · level, and the related project (or
   "— Studio" for studio, person, research and publication recognition). Hovering a
   project-linked row shows **one shared project preview** in a right-hand column.
3. **Close** — one link to About and the brand line.

Plus the global header, fullscreen menu, a full-screen **filter overlay** (year · category ·
recognition level, with live count), a progress rail, and the custom cursor.

## Content

All data comes from `awards-data.js` — **35 records**: 8 real recognitions for Project 01
(Imam Khomeini International Airport Hotel, 2014–2015) and 27 prototype placeholders. Fields
used: year, name / nameFa, category, level, projectId, scope. `org`, `country` and
`featuredOnAbout` exist in the data but **V1 never displays them**.

## Findings

| Area | V1 behaviour | Issue |
|---|---|---|
| **Hierarchy** | Every record gets identical row weight | 35 rows read as one undifferentiated list; the 8 real **Winner / Shortlist** records carry no more presence than placeholders |
| **Surfaces** | All three sections on flat canvas; zero imagery once the preview hides | The weakest surface on the site (Phase 0 audit). On tablet/mobile it is a pure text list |
| **Typography** | Inline `clamp()` sizes; 5 `fa ? … : …` metric ternaries | Not role-based; Persian decided per element |
| **Grid** | 10 inline `grid-column` placements on a literal 12-column grid | Hidden grid; collapses via generic CSS fallbacks |
| **Spacing** | Viewport and px literals | Unnamed rhythm |
| **Motion** | Keyframe line-up on the title; hover row shift; mask on preview | Consistent with V2 families already |
| **Responsive** | Preview hidden below ~834px; rows reflow | Correct, but leaves the text-only weakness exposed |
| **RTL** | Composed — register reads from the right, Latin award names stay LTR | Good; keep |
| **Connection to work** | A project appears only as small metadata inside a row | Recognition is never tied back to the architecture it honours |

## What must survive into V2

- The archive-first character — recognition as a register, not a trophy wall.
- Sticky years and chronological grouping.
- One shared project preview — never thumbnails on every row.
- Studio/person/research rows that stay valid without a project.
- Latin award names as LTR islands inside Persian.
- Sort (newest / oldest) and filtering by category and level.
