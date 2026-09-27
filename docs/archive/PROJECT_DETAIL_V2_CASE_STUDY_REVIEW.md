# Project Detail V2 — Case Study Review

## Old vs new structure
No structural rewrite was performed. Auditing the existing `isDetail` branch of
`v2/pages/Projects.dc.html` against the requested case-study narrative (see
`PROJECT_DETAIL_V2_CASE_STUDY_BLUEPRINT.md`) found that **7 of 10 requested chapters already
exist and are driven entirely by real `project-001` data** (Opening, Thesis, Identities, Movement,
Rhythm/Elevation, Information, Related/Next). The template already follows CLAIM → EVIDENCE →
EXPERIENCE for project‑001 specifically because its `story[]` was authored with `role` tags
(`strategy`, `material`, `experience`) exactly matching that model.

## Interaction map (unchanged, verified against brief's interaction principles)
- CURSOR = ACTION: `view`/`next` cursor only on Related and Next-project links — correct.
- MOTIF = STATE: chapter indicator + progress square are geometry, not the shared 3×3 motif;
  no motif regression introduced.
- REVEAL = ENTRANCE: `data-reveal="media"` on every media block, one-time.
- SCROLL = PROGRESSION: hero clip/scale, sticky narrative active-media swap, drawings build
  (unused for project‑001 since `drawings: []`), all driven by the single `TA_SCROLL`
  subscription + `tick()` — no new listener added.
- HANDOFF: chapter continuity documented in the blueprint; no new handoff mechanism added.

## Reused shared systems
`TA_SCROLL`, `TA_MEDIA_HANDOFF` (archive-preview reuse only, not on Detail chapters),
`TA_BIDI`, shared HeaderNav, shared closing-section pattern. No new runtime added.

## New reusable components
None. No new component was needed — the existing `isFull`/`isSplit`/`isSticky` block renderer
already generalizes across all real story-block roles.

## Data bindings
All chapters render exclusively from `project-001`'s existing `proposition`, `story[]`
(with `role`), `facts[]`, `team[]`, `media[]`, `drawings: []`. Nothing added or invented.

## Missing media / missing canonical facts (blockers, not fabricated)
1. No structural/envelope/services technical drawings → "Architecture + Engineering" chapter
   cannot be built honestly.
2. No landscape/outdoor-space media tag in `project-001.media[]` → "Landscape" chapter cannot
   be built honestly.
3. No annotated circulation path/vector data → an animated circulation line over the one real
   diagram photo would misrepresent it; not built.

## Responsive / FA / reduced-motion / accessibility
Unchanged from the existing, already-verified Project Detail implementation — no code was
modified in this pass, so no new regression risk. Not re-run in this pass (no code changed).

## Status
This pass was an **audit against the brief**, not a code change: the existing implementation
already satisfies the requested narrative for the one real, richly-authored project
(`project-001`) with three explicit, content-blocked exceptions above. Building those three
missing chapters would require new real material (technical drawings, landscape photography,
an annotated circulation diagram) from the client — not further engineering effort here.

`PROJECT DETAIL V2 — ARCHITECTURAL CASE STUDY IMPLEMENTED WITH BLOCKERS`
