# V2 pages

Each page loads its presentation exclusively from `../design-system/`,
`../runtime/` and `../components/`, plus the shared data/media files at the
project root. Full contract: `../V2_ARCHITECTURE.md`. Helmet order:

```html
<script>window.TA_ASSET_BASE = "../../";</script>
<link rel="stylesheet" href="../design-system/tokens-v2.css" />
<link rel="stylesheet" href="../design-system/base-v2.css" />
<link rel="stylesheet" href="../design-system/responsive-v2.css" />
<script src="../runtime/layout-mode.js"></script>
<script src="../runtime/bidi.js"></script>
<script src="../../site-data.js"></script>
<script src="../../media-utils.js"></script>
<!-- then only the data modules the page reads -->
<script src="../runtime/scroll-coordinator.js"></script>
<script src="../runtime/ambient.js"></script>
<script src="../runtime/reveal.js"></script>
<script src="../runtime/ui-strings.js"></script>
<script src="../runtime/page-transition.js"></script>  <!-- cross-page curtain; every page -->
```

`TA_ASSET_BASE` must be set **before** `media-utils.js` loads, or image paths
from the shared data modules resolve inside `v2/pages/` and break.

## Bilingual text

Use the Layer 4 utilities from `tokens-v2.css`, chosen by `TA_BIDI.cls(string, lang)`:
years and counts → `text-number`; codes → `text-code`; Latin-only text inside Persian →
`text-ltr`; any other string → `text-mixed`. Never set `direction` inline on content.

Global chrome words (Menu, Close, Filter, Reset, Next, Previous) come from
`window.TA_UI_V2.t(key, lang)`, not a local ternary — see `../runtime/ui-strings.js`.

## Shared header

Use `<dc-import name="../components/HeaderNav" ...>` — see
`../components/README.md` for its props. Do not re-implement the header or
mobile menu locally.
