# PAGE MIGRATION CHECKLIST
## Tarh & Afarinesh / طرح و آفرینش

Run in full for every page. A page is not migrated until every box is ticked in **both
languages**. One page at a time.

---

## Before starting

- [ ] Read `v2/V2_ARCHITECTURE.md`, `V2_DESIGN_CONTRACT.md`, `V2_MIGRATION_PRINCIPLES.md`.
- [ ] Fill in `V2_PAGE_BLUEPRINT.md`'s DEPENDENCIES section for this page before writing code.
- [ ] Check `v2/components/README.md` for a shared component that already fits (HeaderNav, and
      whatever has crossed the 2+-user threshold since).
- [ ] Screenshots captured at **1440 EN, 1440 FA, 390 EN, 390 FA** — the before (V1) state.

## Step 1 — Import from `v2/`, never from root presentation

- [ ] Helmet loads `../design-system/tokens-v2.css`, `../design-system/base-v2.css`,
      `../design-system/responsive-v2.css`, then `../runtime/*.js` needed, then the shared
      data/media files at the root, in the order documented in `v2/V2_ARCHITECTURE.md` §6.
- [ ] **Zero** `../../v1/tokens-v2.css` / `../../v1/responsive.css` /
      `../../v1/ambient.js` / `../../v1/layout-mode.js` imports (V1's own frozen
      copies, relocated to `v1/` in cleanup pass 3; `bidi.js`/`reveal.js` no
      longer exist there at all — removed as unused dead weight in pass 2).
- [ ] Header/menu use `<dc-import name="../components/HeaderNav">` — no local reimplementation.
- [ ] No V2 token, breakpoint, or page-entry keyframe redeclared anywhere in the page.

## Step 2 — Replace, don't restyle

- [ ] **Tokens** — no literal colour, size, space, duration or span in a migrated component.
- [ ] **Typography** — every text element references a `--t-*` role; no inline `font-size`.
- [ ] **Persian** — no `fa ? … : …` metric ternaries remain; no `-fa` token named directly.
- [ ] **Spacing** — `--space-*` / `--rel-*` / `--pause-*` only; section rhythm type chosen per
      section, deliberately unequal.
- [ ] **Grid** — layout grids use `repeat(var(--grid-cols),1fr)`; placement uses `--span-*`; no
      layout media queries (component-scoped structural `@media`, e.g. a sticky→static
      collapse, stays page-local — that is not a layout media query on the grid itself).
- [ ] **Motion** — durations and curves from `--m-*` / `--e-*`; page entry uses
      `data-v2-rise`/`data-v2-in`, never a page-local `@keyframes`.
- [ ] **Components** — V2 shared components used; no page-only duplicate.
- [ ] **Global chrome words** (Menu, Close, Filter, Reset, Next, Previous) — from
      `window.TA_UI_V2.t(key, lang)`, never a local ternary.

## Step 3 — Verify

- [ ] **Rendered result matches the blueprint**, not just the old V1 screenshot — V2 is a
      reinterpretation, not a pixel clone; a deliberate change is fine if it's documented.
- [ ] **RTL** — Persian composed, not mirrored; photography, drawings, 3×3 and diagonal not
      flipped; LTR islands intact.
- [ ] **Responsive** — correct at 1440, 1024, 834, 390 and 320; no horizontal overflow.
- [ ] **Reduced motion** — on, and the page is complete and usable.
- [ ] **Header** — EN / فا and Menu visible at every width, via `HeaderNav`.
- [ ] **No unresolved `var()`** — every custom property used on the page resolves.
- [ ] **No fabricated content** — no invented contact detail, statistic, or endpoint behavior.

## Step 4 — Protect

- [ ] The 13 Modernity Preservation Rules (see `DESIGN_SYSTEM_V2_READY.md`) still hold.
- [ ] Documented exceptions left bespoke — not forced into span tokens.
- [ ] Whitespace not reduced; Editorial Pauses intact.
- [ ] `V1_BASELINE.json` still matches the `v1/` files (relocated in cleanup pass 3;
      hashes are content fingerprints, unaffected by the move) — nothing in V1 was touched.

---

## Order

All seven pages are migrated (last: Homepage, cleanup pass 3, 27 September 2026 —
its four blocking bugs were fixed as part of that pass; see `VERSION_STRATEGY.md` §7).

| # | Page | Status |
|---|---|---|
| 1 | Awards | migrated |
| 2 | About | migrated |
| 3 | Journal | migrated |
| 4 | Contact | migrated |
| 5 | Projects | migrated |
| 6 | Expertise | migrated |
| 7 | Homepage | migrated |
