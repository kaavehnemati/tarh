# HANDOFF — resume at Phase 2D (Journal V2)

## Done
- Design System V2 foundations 1A–1H; shared layer in `tokens-v2.css` (base · `[dir="rtl"]` ·
  `@media` · Layer 4 bidi utilities) + `bidi.js` (`TA_BIDI.parts / cls / range`).
- **Awards V2** — `v2/pages/Awards.dc.html` · `AWARDS_V1_AUDIT.md` · `AWARDS_V2_REVIEW.md`
- **About V2** — `v2/pages/About.dc.html` · `ABOUT_V1_AUDIT.md` · `ABOUT_V2_REVIEW.md`
- V1 untouched — `V1_BASELINE.json`, 21/21 files match. Shared-file changes are logged in
  `VERSION_STRATEGY.md` §3.

## Next: Journal V2
Copy the Awards/About pattern exactly:
- Helmet order from `v2/pages/README.md`: `TA_ASSET_BASE` → `tokens-v2.css` → `responsive.css`
  → `site-data.js` → `media-utils.js` → `bidi.js` → data modules.
- Root `dir="{{ dir }}"`; no inline `font-family`, `direction` or `-fa` tokens.
- Grids use `repeat(var(--grid-cols),1fr)` + `--span-*`.
- Every mixed string goes through `TA_BIDI.parts()`; years and numbers use `.text-number`.
- Only promote real content: a record is real when its project has `contentState:"real"`
  (not `featuredOnAbout` / `featured` flags — prototype records carry them too).
- `--canvas-40` is not in `tokens-v2.css`; use `rgba(250,249,247,.4)` or promote it.

## Known before starting Journal
- Journal is image-led and **`assets/` is empty** — image sections render blank or as prototype
  plates. Restore photography, or accept a structural review only.
- `journal-data.js` provides `TA_JOURNAL` (entries with `projectId`, `forProject`, `project`).
- Text-only entries are a valid state — never give them fake imagery.

## Pending components (build in `v2/components/` when a 2nd user appears)
- `RecognitionRow` — now used by Awards **and** About → ready to extract.
- `IndexPreview` — needed by Projects, Expertise (and the Awards archive).
- Global header / fullscreen menu — currently a simplified header in each V2 page.

## Order after Journal
Contact → Projects → Expertise → Homepage (last).
