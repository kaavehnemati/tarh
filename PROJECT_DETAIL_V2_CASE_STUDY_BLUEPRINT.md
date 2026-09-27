# Project Detail V2 — Case Study Blueprint

Maps the case-study narrative (CLAIM → EVIDENCE → EXPERIENCE) onto the **existing** Project
Detail template in `v2/pages/Projects.dc.html` (`isDetail` branch) and `project-001`'s real
data in `projects-data.js`. No new fabricated content — only real `story[]`, `facts[]`,
`team[]`, `drawings[]`, `media[]` are used.

| Case-study chapter | Existing section (`data-sec`) | Source data | Status |
|---|---|---|---|
| 00 Opening | `hero` (D0) | `hero` media, title, location/years/typology | done |
| 01 Thesis | `glance` (D1) | `proposition` + `facts` snapshot (`glance`) | done |
| — Brief / Response | `intent` (D2, optional) | `d.lead` / `d.chapters` | renders only if canonical intent copy exists — not authored for project‑001, correctly hidden |
| 02 One Complex, Two Identities | `story[0]` → `isFull` block | `story` item, `role:"strategy"`, `p001-overall-exterior` | done, uses real editorial-visualisation image + real copy |
| 03 Movement as driver (signature) | `story[2]` → `isSticky` block | `role:"experience"`, 8 real media incl. `p001-movement-diagram` | done — sticky narrative col + scrolling media stack; diagram is one of the 8 stacked images |
| 04 Architecture + Engineering | — | none | **not built** — `drawings: []` for project‑001; no structural/envelope/services layer exists in canonical data. Building this chapter now would require fabricating technical evidence, which is explicitly forbidden. Left absent by design. |
| 05 Rhythm, Colour + Elevation | `story[1]` → `isSplit` block | `role:"material"`, `p001-facade-close`, real caption | done |
| 06 Spatial Experience | folded into `story[2]` sticky block (interior/lounge/lobby media already inside the 8-image stack) | same | done — not split into a second dedicated chapter because the real media is already the sticky block's content; a second identical-media chapter would be redundant, not additive |
| 07 Landscape + Outdoor | — | none | **not built** — no landscape/outdoor media tagged in `project-001.media[]` (roles present: hero/homepage/archive/story/detail/interior/arrival/context/diagram/closing; none tagged landscape). Not fabricated. |
| 08 Project Information | `information` (D5) | `d.info` rows + `facts` | done, hides unsupported rows already |
| — Team | `team` (D6) | real `team[]` | done |
| — Recognition | `recognition` (D7) | real awards/journal relations if any | done, conditional |
| 09 Related / Next | `related` (D8) + `D9 Next` | canonical related/ordering | done |
| Closing DNA | shared final-section pattern used site-wide | — | already shared, not duplicated here |

## Chapter continuity (what survives into the next chapter)
- Hero → Glance: title/number persist in the fixed chapter indicator.
- Identities (02) → Rhythm (05): façade material established in 02 is the literal subject of 05.
- Rhythm (05) → Movement (03 render order: material block precedes the sticky block in `story[]`
  order — see note below): the façade rhythm becomes the envelope the visitor moves past.
- Movement sticky block ends on `p001-closing-twilight`/diagram, handing directly into
  Information (facts) without a section gap (`D5` opens where the sticky column releases).
- Related → Next: real ordering/hero media carries straight into `D9`.

## Note on story order vs. brief's suggested numbering
The brief's suggested chapter order (Thesis → Identities → Movement → Engineering → Elevation →
Spatial → Landscape → Info) is a target narrative, not a mandate to reorder real authored
content. `project-001.story[]` is authored in the order **Identities → Rhythm/Elevation →
Movement**, i.e. it already goes analytical (organisation, façade) → experiential (movement,
arrival, interiors) — which reads correctly as CLAIM → EVIDENCE → EXPERIENCE without needing to
re-sequence the client's approved editorial copy.

## Honest gaps (do not fabricate)
1. **04 Architecture + Engineering** — no canonical technical/structural media. Omitted.
2. **07 Landscape** — no canonical landscape-specific media tag. Omitted.
3. **Circulation line drawn over a diagram** — the one diagram image (`p001-movement-diagram`)
   exists but there is no vector/annotated circulation path data to animate a line along; drawing
   a fake path over a real photograph would misrepresent it as documentation. Not built.

These three gaps are the honest reason the page cannot fully match every brief chapter today —
adding them requires real technical drawings / landscape photography / an annotated circulation
diagram from the client, not more implementation effort.
