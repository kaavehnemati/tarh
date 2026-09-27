# JOURNAL V1 AUDIT
Read-only audit of `Journal.dc.html` + `journal-data.js`. V1 not modified.

## Structure
Archive: opening (large title + count) → featured story → filter row (type
chips) → mixed-rhythm grid (large/medium/text-only/portrait cards, varied
spans) → load more. Detail: hero (theme-aware) → lead → body modules
(paragraph/heading/quote/image/pair/video/audio) → inline project/expertise
refs → TOC (long articles only) → share/copy-link → related → next story.

## PRESERVE FROM V1
- **Mixed editorial rhythm** — archive is not a uniform card grid; large,
  medium, text-only and portrait items interleave by design. This is the
  strongest idea in Journal V1 and must carry into V2.
- **Text-only entries as a valid state** — no forced image; card layout
  adapts to absence of media.
- **Content-type taxonomy** (news/article/research/paper/book/update) is
  real and data-driven — keep it.
- **Inline project/expertise references** resolve through canonical data
  (no duplicated titles) — keep the pattern.
- **TOC only for long articles**, generated from actual body headings.
- **Audio/video as optional modules** — absent unless the entry has one.
- **Author model** (`p1/p2/studio/guest`) with `[ROLE]` placeholder intact.

## IMPROVE IN V2
- Filter row is always-visible chips (7 types) — Awards V2 established
  progressive disclosure (Principle 03); Journal should reuse that pattern
  rather than a permanent chip row once categories exceed a glance.
- No global ambient signature — sections are flat canvas.
- Font foundation and menu markup duplicated locally instead of the V2 shell.
- No 3×3 motif usage.
- Header/menu not using the V2 labelled-MENU responsive contract.

## REMOVE / SIMPLIFY
- Nothing structurally — the archive rhythm and detail template are sound
  ideas; this is a system migration, not a content rework.
