# V2 — Tarh & Afarinesh

Version 2 of the website, built on Design System V2 (`v2/design-system/` +
`v2/runtime/` — see `V2_ARCHITECTURE.md`, physically independent of V1 since
Phase 2B).

**Migrated:** all seven pages — About, Awards, Contact, Expertise, Homepage,
Journal, Projects — are fully built on the V2 stack and cross-link only to
sibling `v2/pages/*.dc.html` files, including each page's Header "Home"
destination, which points at `v2/pages/Homepage.dc.html`. V2 has no
navigational dependency on V1 (`v1/`) at all; the only thing V2 still reads
from outside itself is the genuinely shared root data/media (see below).
The four blocking bugs that previously kept V2's own Homepage from being a
safe Home destination (see `../docs/HOMEPAGE_FUNCTIONAL_PARITY_AUDIT.md`)
were fixed before this switch was made; that audit's original "Decision: NO"
is superseded — see `../docs/REGRESSION_BASELINE.md`'s addendum.

```
v2/
  design-system/   tokens-v2.css · base-v2.css · responsive-v2.css — V2's own, independent of V1
  runtime/         layout-mode.js · bidi.js · ambient.js · reveal.js · ui-strings.js
  components/      shared child Design Components used by 2+ V2 pages (HeaderNav)
  pages/           V2 page Design Components — one per V1 page, migrated in order
  assets/          V2-only imagery or graphics — never a copy of a shared asset
```

There is deliberately **no `data/` folder**: V1 and V2 read the same canonical data
modules at the project root. Content is shared; only presentation differs — and
since Phase 2B, presentation is not shared at all. See `V2_ARCHITECTURE.md` and
`../VERSION_STRATEGY.md` for the full rules.
