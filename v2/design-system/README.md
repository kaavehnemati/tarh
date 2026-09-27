# V2 Design System — the actual implementation, not a pointer

Three files, loaded by every V2 page in this order:

| File | Owns |
|---|---|
| `tokens-v2.css` | Palette, fonts, surface, grid-surface, motion, typography roles (`--t-*`), spacing (`--space-*`/`--pause-*`/`--rel-*`), grid (`--grid-*`/`--span-*`/`--container-*`), component tokens (`--c-*`), RTL language resolution (Layer 2), breakpoint resolution (Layer 3), bidi utilities (Layer 4: `.text-rtl/.text-ltr/.text-number/.text-code/.text-mixed`), the page-level ambient field CSS, the 3×3 grid motif, progressive-reveal visual states, and the responsive MENU/منو trigger. |
| `base-v2.css` | Link/focus/selection resets, and the shared page-entry motion (`[data-v2-rise]`, `[data-v2-in]`) every page's opening section uses instead of a page-local `@keyframes`. |
| `responsive-v2.css` | Breakpoint re-valuing of `--marg`/`--gap` (which `tokens-v2.css` aliases as `--grid-margin`/`--grid-gutter`) plus small global safety rules. V2 pages are self-contained inline-style documents with their own component-level `@media` blocks, so this file stays intentionally small — it is not a fork of the root `responsive.css`, which carries a large V1-specific selector library (`[data-hd]`, `[data-aw-row]`, string-matched `[style*=…]` fallbacks) that no V2 page ever needed. |

This is now V2's own copy — independent of the root `tokens-v2.css`/
`responsive.css`, which are V1's frozen copies. Changing a file here is a
release: it affects every V2 page at once. See `../V2_ARCHITECTURE.md`.
