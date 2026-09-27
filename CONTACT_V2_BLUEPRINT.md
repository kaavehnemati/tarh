# CONTACT V2 BLUEPRINT

## DEPENDENCIES
- Presentation: `../design-system/tokens-v2.css`, `base-v2.css`, `responsive-v2.css` — **no
  root presentation imports.**
- Runtime: `../runtime/bidi.js`, `../runtime/ambient.js`, `../runtime/reveal.js`,
  `../runtime/ui-strings.js`. `layout-mode.js` not loaded — Contact has no behavior gated on
  `TA_LAYOUT` (no shared preview to hide, unlike Awards).
- Shared data: `../../site-data.js`, `../../media-utils.js` (loaded for parity/future use, not
  strictly required — Contact renders no media), `../../contact-data.js`, `../../expertise-data.js`.
- Shared component: `../components/HeaderNav`.
- Confirmed against `v2/V2_ARCHITECTURE.md` §3 — zero root presentation imports.

## Section table

| # | Section | Content type | Surface | Ambient | Motion | Grid role | Motif? | Reveal | Component | RTL | Mobile | Reduced motion |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Opening — "Let's begin with a conversation." | editorial | 0 | full | page-entry only | `--span-wide` heading, motif at `--span-support` | yes — one, anchor size | none (orientation-critical H1) | — | own Persian line break, not mirrored | heading scales down, motif stays | `data-v2-rise`→none |
| 02 | Inquiry type | interactive/structured | 1 | soft | fast state transitions on select | `--span-label` heading / `--span-body` list | no | `content` on the section intro only; rows `none` | — | numbers `.text-number`, labels `.text-mixed` | full-width rows, number+label same line | immediate |
| 03 | Contextual form | interactive | 0 | off (kept neutral so form contrast never competes with a moving field) | `--m-fast` focus/error only | `--span-label` sticky context / `--span-body` fields | no | `none` throughout | — | field dir per field (`email`/`url` ltr, else `auto`→page dir); labels follow page dir | sticky context collapses to static, stacks above fields | immediate, no field animates |
| 04 | Studio / direct contact + offices | structured | 1 | minimal | `content` on heading only | `--span-label` / `--span-body` | no | `content` (heading), rows `none` | — | address/phone/email rows `.text-ltr`/`.text-number`; office city follows page dir | rows stack, single column | immediate |
| 05 | Other pathways (Careers / Media) | interactive | 1 | soft | `--m-standard` arrow hover, fine pointer only | two `--span` columns | no | none | — | arrow flips side per `dir` | stacks full-width | immediate |
| 06 | Closing / footer | editorial | 0 | full | page-entry only on the closing line | `--span-lead` line, `--span-full` footer rule | yes — one, micro size (motif total = 2, within the 2–4 budget) | none | — | footer link columns follow page dir order | stacks to one column | `data-v2-rise`→none |

## Notes

- **Ambient zone choices** deliberately avoid `full`/`soft` on the form section (03) — a moving
  turquoise field behind active form fields would compete with focus states and error text,
  which must never depend on color alone. Surface 0 with `off` keeps the ambient system present
  on the page (01, 02, 04, 05, 06 all use it) without ever touching the form itself.
- **Motif budget**: 2 across the whole page (opening, closing) — Principle 04's 2–4 range,
  weighted toward the two editorial bookends rather than the structured/interactive middle,
  matching how About and Awards use it (openings/closings, not archive rows).
- **Custom cursor**: not used. See `CONTACT_V1_AUDIT.md` REMOVE/SIMPLIFY and
  `CONTACT_V2_REVIEW.md`.
- **Missing reusable capability found**: `tokens-v2.css` has no error/state color role. Contact
  signals invalid fields with an icon + weight change + explicit copy (never color alone,
  which the brief requires anyway) instead of inventing a page-local hex. Documented as a
  candidate for a future `--state-error` token — not added here.
- **Field vocabulary** (`FIELD_DEF`: label/type/dir/autocomplete/required per field id) is page
  config, not canonical data — `contact-data.js` only says *which* field ids apply per intent
  (`fieldsFor`); it was never meant to carry per-field UI metadata. Kept page-local, same as V1.
- **Expertise options** resolve live from `TA_CONTACT.expertise` (itself backed by
  `TA_EXPERTISE`) — no taxonomy duplication.
- **Real-data blockers carried forward unresolved, as instructed**: `contact-data.js`'s email,
  phone, address and social hrefs are all placeholders (`[EMAIL]`, `[PHONE]`, `[ADDRESS]`,
  `href:null`). Contact V2 renders exactly what real data would allow and nothing invented —
  see `CONTACT_V2_REVIEW.md`.

## Before marking the page done
- [x] EN and FA validated at 1440 / 834 / 390
- [x] No opaque background on a `full`/`soft`/`minimal` ambient-zone section
- [x] No page-local ambient/stacking fix — root has `data-v2-shell="1"` only
- [x] No page-local motion duration/curve outside the V2 tokens
- [x] 3×3 motif count on the page is 2, not one-per-section
- [x] Keyboard focus reaches every interactive element (inquiry row, expertise/stage toggle,
      attachment control, submit, HeaderNav menu)
- [x] Reduced motion leaves the page fully usable with no missing content
- [x] Compared against `CONTACT_V1_AUDIT.md` — strengths preserved, novelty chrome retired
