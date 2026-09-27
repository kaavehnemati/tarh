# CONTACT V2 REVIEW

## Status: CONTACT V2 — READY FOR REVIEW

## V1 strengths preserved
- Inquiry-first flow (pick a conversation type before any field appears).
- Context-sensitive form driven by `TA_CONTACT.fieldsFor[intent]` — no config duplicated.
- Line-based input styling (label / input / fine rule) — already V2's native language.
- Typed-value survival across language switch, intent switch and re-render (value cache
  outside state, restored post-render, skipping the focused element).
- Honest attachment control (textual acknowledgment, no fake upload).
- Studio info renders complete with or without an active inquiry; every row conditional on
  real data; office count (0/1/2/3) needs no layout change.
- Deep-link contract preserved: `#intent=`, `#expertise=<slug,...>` (defaults intent to
  `project`), `#lang=fa`.

## What was simplified / removed
- **Custom cursor** — removed. No V2 reference page uses one; the turquoise indicator + state
  color already used throughout V2 (and by Contact's own inquiry rows, expertise/stage toggles)
  covers the same "this is selectable" signal restrainedly, consistently with the rest of the
  system, on touch and fine pointer alike.
- **Reduced-motion dev toggle** — removed. Not a real product control; no other V2 page has
  one, and the system already reduces motion from the OS setting everywhere (ambient static,
  reveal immediate, page-entry motion none).
- **Bespoke "arrival from Homepage" animation** — removed as a one-off script; the shared
  `data-v2-rise`/`data-v2-in` page-entry motion runs instead. The functional half — arriving
  with a preselected intent/expertise via hash — is fully preserved.
- **Scroll-driven header repaint loop** — removed by construction: Contact uses the shared,
  static-sticky `HeaderNav`, same as About/Awards/Journal, with no page-specific scroll listener.

## What changed for V2
- Presentation ported from V1's literal `px`/hex values to V2 tokens throughout (typography
  roles, `--space-*`, `--grid-*`, `--m-*`/`--e-*`).
- Persian opening line composes its own 2-line break (`از یک گفت‌وگو / شروع می‌کنیم.`) rather
  than mirroring the English 3-line break — same copy as V1, recomposed per
  `RTL_LTR_GUIDE_V2.md`.
- Validation no longer signals invalid fields by color. `tokens-v2.css` has no error/state
  color role, and inventing a page-local hex would violate the Design Contract's own "no colour
  outside the palette" rule — so invalid fields signal through a heavier rule (1px → 2px, same
  ink color), a small square marker, explicit copy, and `role="alert"` / `aria-invalid` /
  `aria-describedby`. This is also a stricter accessibility posture than V1's color-only cue.
  **Flagged as a missing reusable capability** — a future `--state-error` token in
  `tokens-v2.css` would let this (and any future form) use color too; not added in this phase
  per the "do not silently mutate the foundation" rule.
- Contact now appears correctly in the shared nav: About/Awards/Journal's Contact link and
  About's `hrefContact` were updated from `../../Contact.dc.html` (V1) to the sibling
  `Contact.dc.html` (V2) now that this page exists — the one edit this phase makes to
  already-migrated pages, and it is a routing correction, not a redesign.

## Desktop quality
Sticky context column (§03) tracks the active field group at `top:96px`, matching Awards'/
About's sticky-column convention. Grid roles (`--span-label`/`--span-body`/`--span-lead`/
`--span-support`/`--span-wide`) used throughout — no literal `grid-column` numbers.

## Mobile quality
Sticky context (`[data-ct2-context]`) collapses to `position:static` at ≤1023px via a
component-scoped `@media` block (same pattern as About's team-grid) — the only page-local
`@media` on the page. All buttons/inputs carry `min-height:var(--c-control-h)` (44px). No fixed
widths; grid tracks use `minmax(0,1fr)`. Verified no horizontal overflow at 1440/1024/834/390/320.

## Persian quality
Composed, not mirrored (opening line). `TA_BIDI`-backed `.text-ltr`/`.text-number` isolate
email/phone/social values in both languages. Field `dir` follows the field's own nature
(`email`/`url` always `ltr`; everything else follows page `dir`), never a mirrored layout.

## Form usability
Single form region, no field-level animation (Principle 07: forms are `none`). Inquiry rows
collapse to the selected one on pick (progressive disclosure, matches V1); "Change inquiry
type" restores the full list. Selection never depends on hover — click/Enter/Space all work
identically; hover is not required.

## Accessibility
Labels, `aria-invalid`, `aria-describedby`, `role="alert"` on every error, `aria-pressed` on
every toggle (intent, expertise, stage), `role="status"` on the ready confirmation, keyboard
reachability for every control including `HeaderNav`'s menu (focus trap, Escape, scroll lock —
inherited unmodified from the shared component).

## Intentionally deferred real data (not invented)
- `[EMAIL]` / `[PHONE]` / `[CITY]` / `[ADDRESS]` — `contact-data.js` placeholders, rendered
  exactly as data provides; nothing invented.
- Social links (`Instagram`, `LinkedIn`) render as non-clickable pending state — `href: null`
  in the data, so no link is generated (per the "never make a null URL clickable" rule).
- Office count is 1 today; the layout (`hasOffices`, `offices` loop) already handles 0/2/3
  with no code change needed when real offices are added.
- No working submission endpoint exists or is implied — "Form ready" status text says
  submission "will be connected during implementation," matching V1's own honest framing.

## Exact dependencies
`../design-system/{tokens-v2,base-v2,responsive-v2}.css`, `../runtime/{bidi,ambient,reveal,
ui-strings}.js`, `../components/HeaderNav`, and shared root: `../../site-data.js`,
`../../media-utils.js`, `../../expertise-data.js`, `../../contact-data.js`.
**Zero root presentation imports.**

## Exact changed files
New: `v2/pages/Contact.dc.html`, `CONTACT_V1_AUDIT.md`, `CONTACT_V2_BLUEPRINT.md`,
`CONTACT_V2_REVIEW.md`. Edited (doc-only, Step 0): `v2/README.md`,
`PAGE_MIGRATION_CHECKLIST.md`. Edited (routing correction only): `v2/pages/Awards.dc.html`,
`v2/pages/About.dc.html`, `v2/pages/Journal.dc.html` — their Contact link now points at the
migrated `Contact.dc.html` sibling instead of V1's root copy. No V1 file touched.

## Confirmations
1. **Zero root presentation imports** — confirmed, see Exact dependencies above.
2. **V1 remained untouched** — confirmed; every edit this turn is inside `v2/` or a
   project-root doc (`v2/README.md`, `PAGE_MIGRATION_CHECKLIST.md`), never a root `.dc.html`.
3. **Design System V2 consumed, not redesigned** — confirmed; no token, breakpoint, ambient
   rule, reveal state, or `HeaderNav` behavior was changed. One gap was found (no error-state
   token) and documented rather than patched into the foundation.
4. **Real-data blockers remaining** — email, phone, address, social URLs, and a real
   submission endpoint. All are `contact-data.js`/backend concerns outside this phase.
