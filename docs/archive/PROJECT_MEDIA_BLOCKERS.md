# PROJECT MEDIA BLOCKERS

Checked: `assets/` (only `assets/about/studio-portrait.png` exists), `uploads/` (About-page
drawings and pasted screenshots — unrelated to project photography). **No `assets/projects/`
directory exists anywhere in this project's workspace.** No source material for this media was
found to restore from. The paths below are exactly what `projects-data.js` references and
resolves through `TA_MEDIA`/`TA_PROJECTS` — nothing invented, nothing substituted.

## project-001 — Imam Khomeini International Airport Hotel
`assets/projects/project-001/`
- `01_aerial_context.jpg` (hero/homepage)
- `02_facade_close.jpg` (story/detail)
- `04_wide_front.jpg` (archive)
- `05_hero_dusk_alt.jpg`, `06_overall_exterior.jpg`, `07_arrival_golden_hour.jpg`,
  `08_entrance_twilight.jpg`, `09_entrance_day.jpg`, `10_lobby_atrium.jpg`,
  `11_lounge_interior.jpg`, `12_closing_twilight.jpg`, `13_movement_arrival_pause_diagram.jpg`
  (story / sticky-narrative)
- `03_axis_hold_DO_NOT_PUBLISH.jpg` — explicitly withheld in data (`roles: []`), not needed

## project-002 — Future Courtyard
`assets/projects/project-002/`
- `01_aerial_context.jpg` (hero/homepage), `02_public_edge.jpg` (archive/story)
- `03_structure_interior.jpg`, `04_arrival_sequence.jpg`, `05_central_courtyard.jpg`,
  `06_landscape_path.jpg`, `07_interior_atrium.jpg`, `08_public_lounge.jpg`,
  `09_material_detail.jpg`, `10_twilight_view.jpg`, `11_concept_diagram.jpg`,
  `12_site_plan.jpg`, `13_regional_context.jpg`, `14_terrace_view.jpg`, `15_closing_night.jpg`

## project-003 — Grand Hotel Tehran
`assets/projects/project-003/` — full set referenced by `story`/`media` (regional context,
street-low-angle, urban-approach, facade-green-detail, sky-terrace, arrival-entrance,
lobby-atrium, guest-suite, rooftop-sunset, concept-diagram, site-plan, twilight-exterior).

## project-004 — Dariush Hotel Kish
`assets/projects/project-004/` — full set referenced by `story`/`media` (aerial-resort-context,
garden-edge-day, entry-twilight, arrival-golden-hour, resort-gardens-aerial,
seaside-palace-context, grand-lobby, luxury-suite, resortscape-gulf, blue-hour-front,
twilight-seaside).

## Net effect while missing
Every `TA_PROJECTS.visual()`/`.story()`/`.drawingList()` call for these four projects resolves
`isRealMedia:true` (the data has a `src`) but the browser 404s the file — rendering a neutral
`var(--surface-1)` box wherever a real photo/drawing belongs, on Project Detail, the Archive's
Index+Preview, its per-row mobile thumbnails, Related Work, and Next Project. The shared
archive→detail transition correctly detects there is nothing real to hand off and degrades to
a plain reveal — it does not animate an empty box.

## Status
**BLOCKING.** Restoring these files into `assets/projects/project-00{1..4}/` at the exact
paths above is the only outstanding step before Projects can be called visually
production-ready. No other change is needed on this page for that to take effect — every
media call already resolves generically through the canonical data.
