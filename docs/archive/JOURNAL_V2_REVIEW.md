# JOURNAL V2 REVIEW
`v2/pages/Journal.dc.html` against `Journal.dc.html` (V1). Third V2 page.

## Structure
01 Opening (editorial, full ambient, motif) → 02 Featured story (image-led,
ambient off, title continuity) → 03 Archive (soft ambient, progressive-
disclosure filter, mixed-rhythm register) → 04 Closing (full ambient, motif,
links to About). 3 motif placements (Opening, Archive, Closing) — within budget.

## V1 strengths preserved
- **Mixed editorial rhythm** — the archive cycles large/medium/text/portrait
  card sizes (`CYCLE` in the logic) rather than a uniform grid; text-only
  cards render with no image slot at all, matching V1's `hasMedia` model.
- **Content taxonomy** (news/article/research/paper/book/update) reads
  directly from `journal-data.js`'s `TYPES`/`TYPE_ONE` — no new labels invented.
- **Inline canonical media** — every card and the featured story resolve
  through `TA_MEDIA.resolve()` against the entry's own `hero`, never a
  page-local plate.
- **Author + role model** kept (`[ROLE]` placeholder intact where present).

## Improved in V2
- Filter row now reuses **Awards V2's progressive-disclosure pattern**
  (Principle 03): FILTER trigger + active-count badge, collapsing panel,
  reset — rather than V1's permanent 7-chip row.
- **Global ambient** (Principle 01) replaces flat canvas: full on Opening/
  Closing, soft on Archive, off on the image-led Featured section — the
  image dominates there, ambient is not layered over it.
- **3×3 motif** used 3 times (interactive on Archive heading, static anchor
  on Opening, micro on Closing) — new to Journal, none in V1.
- Header/menu/shell now consume the canonical `[data-v2-shell]` +
  `data-v2-menu-trigger`/`drawer` contract instead of page-local markup.
- All type/date/author strings run through `TA_BIDI.parts()` for correct
  mixed Persian/Latin rendering.

## Deliberately not carried into this pass
- **Journal Detail** (article template) — the brief scoped this migration
  to the archive/index page only ("Journal V2" in the blueprint refers to
  the archive). Detail migration would be a separate, larger page.
- TOC, audio/video modules, share/copy-link — all live in Detail, not here.

## Changed files
- New: `v2/pages/Journal.dc.html`, `JOURNAL_V1_AUDIT.md`, `v2/JOURNAL_BLUEPRINT.md`,
  `JOURNAL_V2_REVIEW.md`.
- No V1 file, canonical data file, or global token file modified.
