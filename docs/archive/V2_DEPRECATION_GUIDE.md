# V2 DEPRECATION GUIDE
## Tarh & Afarinesh / طرح و آفرینش

What page migration removes, what replaces it, and what must stay. Nothing listed here has been
removed yet — visitor-facing pages are untouched until their migration phase.

**Single source of truth:** `tokens-v2.css`. Every value a page needs comes from it.

---

## 1. Measured duplication — what migration removes

| Page | `:root` tokens | Also in `tokens-v2.css` | Value drift | px spacing literals | px font-size literals | distinct hex |
|---|---|---|---|---|---|---|
| Homepage | 35 | 27 | none | 88 | 94 | 14 |
| Projects | 34 | 27 | none | 108 | 118 | 14 |
| Expertise | 33 | 27 | none | 58 | 72 | 12 |
| Awards | 30 | 27 | none | 52 | 52 | 12 |
| About | 33 | 27 | none | 58 | 73 | 12 |
| Journal | 31 | 27 | none | 70 | 63 | 12 |
| Contact | 31 | 27 | none | 71 | 49 | 7 |

**The 27 shared tokens are identical in all seven pages and in `tokens-v2.css`.** No page has
drifted. Removing a page's `:root` copy therefore changes nothing visually — it is the safest
first step of every migration.

The 3–8 page-only tokens per page (e.g. `--plate-2`, `--plate-dark`, `--warn`) move into
`tokens-v2.css` when first needed by a second page, not before.

---

## 2. Deprecated patterns

| Do not use | Use instead | Owner |
|---|---|---|
| Arbitrary px spacing — `padding:18px`, `margin-top:44px` | `--space-*`, `--rel-*`, `--pause-*` | Spacing |
| Component-specific font size — `font-size:clamp(28px,…)` inline | `--t-*` role | Typography |
| `fa ? "1.5" : "1.04"` metric ternaries | one role name; `[dir="rtl"]` resolves it | Typography |
| Naming a `-fa` token in a component | the base role name | Typography |
| Custom animation duration — `transition:…620ms` | `--m-*` | Motion |
| Literal `cubic-bezier(…)` | `--e-*` | Motion |
| Random colour — any hex outside the palette | palette or `--surface-*` token | Surface |
| `grid-template-columns:repeat(12,1fr)` on a layout grid | `repeat(var(--grid-cols),1fr)` | Grid |
| Inline `grid-column:4 / span 9` | `--span-*` | Grid |
| Per-page layout maps (`WORK_LAYOUT`, `REL_LAYOUT`, `VIS`) | `--span-*` | Grid |
| A media query written for layout | Layer 3 of `tokens-v2.css` | Grid |
| Duplicated component variants (3× index-with-preview, 2× recognition row) | one shared component | Components |
| Page-only design tokens | a system token, or none | System |
| Rounded corners, shadows, glass | `--c-radius:0`, hairlines | Components |

---

## 3. Legacy aliases — retire AFTER migration, not before

These exist so the Phase 1A motion migration broke nothing. Removing them early breaks pages.

| Alias | Resolves to |
|---|---|
| `--m-base` | `--m-reveal` |
| `--e-enter` | `--e-editorial` |
| `--e-standard` | `--e-smooth` |
| `--e-exit` | exit-only curve |

Retire once no page references them.

---

## 4. Not deprecated — keep literal

- **Delay values** in transitions (stagger cascades, loader orchestration). Tokenising collapses
  sequencing into simultaneity.
- **`setTimeout` orchestration** — program flow, not motion.
- **Documented exceptions:** hero line stagger, shared image stage, project pinned stage,
  diagonal wipe, the `1760ms` loader teardown.
- **Specimens** in the Design System that intentionally pin desktop values to illustrate them.

---

## 5. Minor cleanup (non-blocking)

- `--surface-fall` — reserved for the Surface 0 → 1 transition; give it a first use or remove.
- `--surface-grid-strong` — unused; remove unless a register needs it.
- The Design System's own `@media` block still overrides `--marg:20px; --gap:16px` at mobile,
  where `responsive.css` uses `20px / 14px`. Align the Design System to `responsive.css`.
