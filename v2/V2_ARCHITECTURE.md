# V2 ARCHITECTURE
Directory-level contract for Design System V2. Read this before writing any
V2 page. Companion to `../V2_DESIGN_CONTRACT.md` (visual rules) and
`../V2_PAGE_BLUEPRINT.md` (per-page planning template).

## 1. Directory ownership

| Directory | Owns | A page may... |
|---|---|---|
| `v2/design-system/` | `tokens-v2.css` (palette, type, spacing, grid, motion, surface, bidi utilities, ambient CSS, grid motif, reveal states, grid surface, responsive menu) · `base-v2.css` (link/focus/selection resets + shared page-entry motion `[data-v2-rise]`/`[data-v2-in]`) · `responsive-v2.css` (breakpoint re-valuing of `--marg`/`--gap` + global safety) | `<link>` all three, in this order, before anything else. Never redeclare a token. |
| `v2/runtime/` | `layout-mode.js` (viewport/pointer/motion state) · `bidi.js` (`TA_BIDI`) · `ambient.js` (`TA_AMBIENT`, the page-level field) · `reveal.js` (`TA_REVEAL`, progressive reveal) · `ui-strings.js` (`TA_UI_V2`, global chrome vocabulary) · `motif.js` (`TA_MOTIF`) · `cursor.js` (`TA_CURSOR`) · `scroll-coordinator.js` (`TA_SCROLL`) · `section-tracker.js` (`TA_SECTION_TRACKER`) · `media-handoff.js` (`TA_MEDIA_HANDOFF`, scroll-driven media continuity; only load if the page calls `.mount()`) · `page-transition.js` (`TA_PAGE_TX`, the cross-page curtain — load on every page) | `<script src>` each; never inline an equivalent. |
| `v2/components/` | Shared child Design Components used by 2+ V2 pages | `<dc-import name="../components/X">`. A pattern used by exactly one page stays in that page. |
| `v2/pages/` | The page DCs themselves | Import from the three trees above, plus the shared data/media files at the project root. |
| `v2/assets/` | V2-only imagery (nothing V1 ever had) | Reference directly; never duplicate a root asset here. |

## 2. What may remain shared (root-level, both versions read it)

- The seven canonical data modules: `projects-data.js`, `expertise-data.js`,
  `about-data.js`, `awards-data.js`, `journal-data.js`, `contact-data.js`,
  `site-data.js`.
- `media-utils.js` — inspected and confirmed presentation-agnostic (path
  resolution + plate fallback only, no typography/spacing/grid/motion/
  responsive logic).
- `assets/` — real photography/drawings, resolved by `media-utils.js` for
  both versions.

## 3. What MUST NOT be imported by a V2 page

`tokens-v2.css`, `responsive.css`, `ambient.js`, `layout-mode.js` under `v1/`
(relocated there from the project root in cleanup pass 3). Those are V1's own
frozen copies now. A V2 page importing any of them is a regression — fix by
pointing at the `v2/design-system/` or `v2/runtime/` equivalent. (`bidi.js`
and `reveal.js` were removed entirely in cleanup pass 2 — they were unused
dead weight, not part of V1's live frozen set; `v2/runtime/bidi.js` and
`v2/runtime/reveal.js` are unaffected.) As of cleanup pass 3, a V2 page must
also never link to any `v1/` page — every page's Home destination is the
sibling `v2/pages/Homepage.dc.html` (see `../VERSION_STRATEGY.md` §4).

## 4. Component extraction rule

Shared behavior/pattern (used by 2+ V2 pages, same DOM shape) → a
`v2/components/` child DC. Unique editorial composition → stays page-local,
even if two pages show conceptually similar data.

Two patterns were evaluated and NOT extracted, on purpose:
- **"Recognition row"** — Awards' "Selected recognition" (an auto-fit card
  grid: year / name / level / subject, stacked per card) and About's
  "Selected recognition" (a 3-column row: year / name / level, no subject)
  are different compositions that happen to read the same underlying award
  records. Unifying them would mean restructuring one to match the other —
  a redesign, which this phase does not do. If a future page needs a third
  recognition treatment, revisit whether any two are close enough to share.
- **"IndexPreview"** — Awards, Projects, and Expertise all now implement their own
  Index+Preview register independently (Awards' Archive, Projects' register, Expertise's
  Register). Still not extracted into a shared component — each has genuinely different
  state shape (filters, motif cell mapping, cursor actions) and extracting prematurely would
  cost more than the duplication. Revisit only if a fourth page needs the identical pattern.

One pattern WAS extracted: **`HeaderNav`** — the sticky header (brand, nav,
language switch, MENU trigger) and its fullscreen mobile drawer, byte-identical
in structure across About/Awards/Journal. It owns its own open/close state,
focus trap, Escape handling, scroll lock and focus restoration — a page only
passes `nav`, `drawerLinks`, `brand`, `hrefHome`, `lang`, `onSetEn`/`onSetFa`,
and a `menuId` suffix for its dialog id.

## 5. Page implementation rule

A V2 page:
- Sets `dir="{{ dir }}"` and `data-v2-shell="1"` on its root; nothing else
  presentation-related on the root.
- Never writes its own `@keyframes` for a page-entry reveal — uses
  `data-v2-rise` / `data-v2-in` from `base-v2.css`.
- Never writes its own responsive breakpoint for `--marg`/`--gap` — those
  come from `responsive-v2.css`.
- Uses `window.TA_UI_V2.t(key, lang)` for chrome vocabulary (menu, close,
  filter, reset, next, previous) instead of a local `fa ? "…" : "…"`
  ternary — editorial copy (titles, intros, captions) stays page-local.

## 6. Dependency / bootstrap order

Every V2 page's `<helmet>`, in this order:

```html
<link rel="preconnect" .../> <link rel="preconnect" .../> <link href=".../css2?..." rel="stylesheet" />
<script>window.TA_ASSET_BASE = "../../";</script>
<link rel="stylesheet" href="../design-system/tokens-v2.css" />
<link rel="stylesheet" href="../design-system/base-v2.css" />
<link rel="stylesheet" href="../design-system/responsive-v2.css" />
<script src="../runtime/layout-mode.js"></script>   <!-- only if the page reads TA_LAYOUT -->
<script src="../runtime/bidi.js"></script>
<script src="../../site-data.js"></script>
<script src="../../media-utils.js"></script>
<script src="../../<page>-data.js"></script>        <!-- only the data modules the page reads -->
<script src="../runtime/scroll-coordinator.js"></script>  <!-- before any scroll-dependent runtime -->
<script src="../runtime/ambient.js"></script>
<script src="../runtime/reveal.js"></script>
<script src="../runtime/ui-strings.js"></script>
<script src="../runtime/motif.js"></script>          <!-- only if the page uses the reactive motif -->
<script src="../runtime/cursor.js"></script>          <!-- only if the page uses the contextual cursor -->
<script src="../runtime/section-tracker.js"></script> <!-- only if the page uses shared scroll-active tracking; built on scroll-coordinator.js, so load it after -->
<script src="../runtime/media-handoff.js"></script>   <!-- only if the page calls TA_MEDIA_HANDOFF.mount() -->
<script src="../runtime/page-transition.js"></script> <!-- cross-page curtain; load on every page -->
```

Tokens/styles first (nothing renders without them) → layout/bidi runtime →
canonical data → media utilities → ambient/reveal runtime → UI strings. A
page-local `<style>` block (component-scoped `@media`, e.g. About's People
grid areas) comes last, after this list, and never redeclares a token or a
page-entry keyframe.

## 7. Regression baseline (Phase 2B)

About, Awards and Journal were re-pointed from root presentation files to
`v2/design-system` + `v2/runtime`, had their duplicated header/menu markup
replaced with `HeaderNav`, had their per-page `aw2-/ab2-/jr2-rise` keyframes
replaced with the shared `v2-rise`/`v2-in`, and gained global UI strings for
Menu/Close. No section markup, token values, breakpoints, or copy changed —
this was a physical relocation and de-duplication, not a redesign. Compare
each page against its pre-2B version at 1440/390 × EN/FA if in doubt; the
render should be pixel-identical except two known, deliberate fixes:
- About's nav links now lift on hover like Awards'/Journal's always did
  (a one-line inconsistency, not a redesign).
- Journal no longer double-declares the link/focus/selection reset that
  `base-v2.css` already provides.
