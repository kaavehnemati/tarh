# PROJECTS V1 AUDIT

## Media reality check (read this before anything else)
`projects-data.js` marks four projects `contentState:"real"` (IKIA Airport Hotel, Future
Courtyard, Grand Hotel Tehran, Dariush Hotel Kish) and — unlike the earlier assumption in
`VERSION_STRATEGY.md` §9 and `V2_VISUAL_RHYTHM_AUDIT.md` — **these records do carry real `src`
paths** (e.g. `assets/projects/project-001/01_aerial_context.jpg`, a mix of supplied
photography and labelled editorial visualisations/diagrams). However, **the actual image files
were never delivered into this project** — `assets/` contains only `assets/about/
studio-portrait.png`; `assets/projects/` does not exist. `TA_MEDIA.resolve()` only checks
whether `m.src` is truthy, so it reports `isRealMedia:true` and suppresses the plate fallback
for these records — the honest result today is a blank/neutral media box (the container's
`background:var(--surface-1)`, no texture, no photo), not the textured "prototype plate" the
rest of V2 uses for genuinely-absent media. **This is a content-delivery gap, not a design
problem** — Projects V2 calls `TA_MEDIA.resolve()` exactly as Awards/Journal/About already do
and renders whatever it returns; the composition is built to look right the moment the actual
files are dropped into `assets/projects/`. Flagged to the user directly, not silently patched.

## PRESERVE
- **Index + shared preview register** (`data-ix-list` + sticky `data-ix-stage`) — the
  strongest single idea in V1 Projects. A text register that drives one shared preview on
  hover/focus is exactly V2.1's archetype E (Index + Preview), already proven in Awards V2.
  Carries forward as the archive's core.
- **Detail mode tabs** (Description / Team / Awards sharing one content region) — a real,
  compact interaction; ports to V2 as a Structured Field tab control.
- **Sticky narrative story block** (`sticky-narrative`, one of the three canonical `story` block
  types alongside `full-image` and `image-text`) — maps directly to archetype D.
- **Facts & figures, Project information, Services, Awards relationship, Journal relationship,
  Related projects, Next project** — all genuinely data-driven, all worth keeping; each maps to
  an existing V2.1 archetype (H, F, F, recognition-row pattern, journal-row pattern, I, J).
- **Deep-link contract**: `#p=<routeIndex>` is already load-bearing — Awards' and About's
  `hrefOf()` and Journal's `projectHref` all build this exact hash to link into a specific
  project. **Must be preserved unchanged** or every existing cross-page link breaks.
- **Filters** (expertise / type / status) on the archive — real, canonical-relationship-backed,
  not invented; worth keeping in a V2 filter panel (Awards' Principle-03 pattern).

## REFINE
- **"Visual view" alternate grid** — a second browsing mode showing the same projects as image
  cards. Without real media files today it would render a grid of empty boxes; even once
  photography lands, it duplicates the Index+Preview register's job rather than adding a
  distinct reading. **Decision: removed** (see Step below) — one calm register, not two
  competing ones, per Principle 01c (an archive shouldn's offer two FOCUS-tier browsing modes
  side by side for the same content).
- **Shared-element "scene" transition** (900ms clone-and-expand from archive row/image into the
  detail hero, `SCENE`/`SCENE_RM` constants) — real V1 craft, but a bespoke motion mechanism
  outside the V2 Motion System, and it has no real image to expand today (see media reality
  check). **Rebuilt through V2**: the standard V2 detail-entry motion (`data-v2-rise`/
  `data-v2-in` + `data-reveal`) is used instead, matching how Journal already handles
  archive→detail (a lighter title-clone handoff, not a full image scene). Revisit a
  richer image-expansion transition once photography ships.

## REMOVE
- **Image viewer overlay** (`data-viewer`, fixed lightbox with plate-based placeholder,
  prev/next, counter) — with no real files to view yet, a modal viewer adds interaction weight
  with nothing real to show. Full-bleed and drawing media already render at full/near-full
  scale in the normal flow (archetype B, Full Media Stage), which is where the visual weight
  belongs. **Removed this pass** — flagged as a V2.2 candidate once photography exists and
  usage suggests it is needed.
- **Custom cursor** (`data-cursor`, "View"/"Open"/"Next" labels) — same reasoning as Contact's
  audit: no V2 reference page uses one; hover/focus state changes already signal
  interactivity consistently across the system.
- **RM/reduced-motion toggle carried in this page's own state** — superseded by the
  system-wide `prefers-reduced-motion` handling every other V2 page already relies on.

## Content states respected
`published` / `contentState` gating in `projects-data.js` (`project()`'s own `published`
default logic) is read as-is — Projects V2 never re-derives visibility rules locally, and
never renders a project whose `published !== true` once real.
