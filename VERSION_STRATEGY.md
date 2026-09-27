# VERSION STRATEGY
## Tarh & Afarinesh / طرح و آفرینش

**Phase 2B · V2 physically independent.** 25 September 2026.
**Cleanup pass 3 · V1 relocated to `v1/`; V2 fully independent.** 27 September 2026 — see §7.

---

## 1. The boundary

**V1 PRESENTATION = `v1/` / frozen.** The eight Design Components (relocated
from the project root in cleanup pass 3; content unchanged), plus
`tokens-v2.css`, `responsive.css`, `ambient.js`, `layout-mode.js`, all under
`v1/`. These files are V1's own copies now — frozen, unedited by this phase,
and never imported by a V2 page.

`bidi.js`, `reveal.js`, and the empty `Canvas.dc.html` scaffold were removed
in cleanup pass 2 (27 September 2026), before the relocation: confirmed by
grep to be unloaded by any V1 page (unlike the six files above, which V1's
own pages do load), so they were dead weight, not part of V1's live frozen
set. `v2/runtime/bidi.js` and `v2/runtime/reveal.js` remain V2's own live
copies. `docs/REGRESSION_BASELINE.md`'s SHA-256 anchors for these three files
are updated accordingly. NOTE: `V1_BASELINE.json` still lists a `bidi.js`
entry from 2026-09-24 (added there under `sharedModules`, despite being
unloaded); this pass left `V1_BASELINE.json` untouched by design (it remains
required by `PAGE_MIGRATION_CHECKLIST.md`), so that one entry is now stale
and should be dropped the next time `V1_BASELINE.json` is regenerated.

**V2 PRESENTATION = `/v2` / active.** Every V2 page (`v2/pages/*.dc.html`) loads
its typography, spacing, grid, motion, surface, responsive breakpoints, ambient
field, reveal engine, bidi helpers and shared components exclusively from
`v2/design-system/`, `v2/runtime/` and `v2/components/`. Zero `v1/` presentation
imports. As of cleanup pass 3, V2 also has zero *navigational* dependency on
V1 — every page's Home destination is `v2/pages/Homepage.dc.html`. See
`v2/V2_ARCHITECTURE.md` for the full contract.

**SHARED = data / media / domain utilities only.** `projects-data.js`,
`expertise-data.js`, `about-data.js`, `awards-data.js`, `journal-data.js`,
`contact-data.js`, `site-data.js`, `media-utils.js`, and `assets/`. Both
versions read the same records; neither forks them. These are the only files
still read by both `v1/` and `v2/` — they remain at the project root.

There is no ambiguity left: a file lives in exactly one of the two presentation
trees (`v1/` or `v2/`), or it is one of the nine shared data/media files above.

---

## 2. Structure

```
/                               shared data/media + docs/config only
  projects-data.js … site-data.js         SHARED canonical content (7 modules)
  media-utils.js                          SHARED — pure asset resolution
  assets/                                 SHARED media
  uploads/                                content-handoff staging area
  V1_BASELINE.json  ASSET_MANIFEST.json
  docs/                                    audits, baselines, historical archive

  v1/                             V1 presentation, frozen (relocated here, pass 3)
    Homepage.dc.html … Contact.dc.html      V1 pages (8, incl. Design System)
    tokens-v2.css  responsive.css           V1's own copies — do not edit for V2
    ambient.js  layout-mode.js
    support.js                              DC runtime for v1/ pages

  v2/
    design-system/  tokens-v2.css · base-v2.css · responsive-v2.css — V2's own
    runtime/        layout-mode.js · bidi.js · ambient.js · reveal.js · ui-strings.js ·
                    motif.js · cursor.js · scroll-coordinator.js · section-tracker.js ·
                    media-handoff.js
    components/     HeaderNav.dc.html — shared child DCs (2+ V2 pages)
    pages/          About · Awards · Contact · Expertise · Homepage · Journal · Projects
                    (all 7 fully migrated; independent of v1/ for both presentation
                    and navigation as of cleanup pass 3)
    assets/         V2-only imagery — never a copy of a shared asset
```

## 3. Why two copies of tokens-v2.css / responsive.css / ambient.js / layout-mode.js

Phase 2A tried to keep ONE copy of each at the root and have both versions load
it. That failed the actual test: V1's own `Design System.dc.html` already
consumed the "V2" tokens, so V1 and V2 presentation were never really separate —
editing the shared file for a V2-only reason risked a visible V1 change, and
nothing enforced the boundary except a naming convention.

Phase 2B forks each file once. The `v1/` copy (relocated from root in cleanup
pass 3) is V1's from now on — frozen, serving `Homepage/Projects/Expertise/
About/Awards/Journal/Contact/Design System.dc.html` exactly as before. The
`v2/` copy is V2's from now on — it may evolve (new tokens, new breakpoints,
new reveal states) without touching, or risking, a single V1 pixel.
`V1_BASELINE.json` still fingerprints these files (its entries don't encode a
path, so the relocation doesn't invalidate the hashes themselves — see §7);
V1 integrity is now a simpler claim than in 2A, because V2 pages import
nothing from `v1/` except the nine shared data/media files, which live at
the project root, read by both versions.

**`media-utils.js` was inspected, not assumed.** It contains only asset-path
resolution and plate fallback selection — no typography, spacing, grid, motion
or responsive logic. It stays a single shared file at the root; both versions
read the exact same function.

## 4. Routing

As of cleanup pass 3, every V2 page's Home destination is
`v2/pages/Homepage.dc.html` (a sibling reference, not a `v1/` escape). This
supersedes Phase 2A/2B's routing, which pointed all seven pages' Home link at
the root V1 Homepage. The switch was made only after `v2/pages/Homepage.dc.html`'s
four blocking bugs (see `docs/HOMEPAGE_FUNCTIONAL_PARITY_AUDIT.md`) were
fixed — see `docs/REGRESSION_BASELINE.md`'s addendum for what changed and why.
V1's own pages still link to each other normally within `v1/`; V1 is not
reachable from V2 navigation at all now.

## 5. Development rules

1. A V2 page imports **only** `v2/design-system/*`, `v2/runtime/*`,
   `v2/components/*`, and the nine shared data/media files. Never a `v1/`
   presentation file, and never a `v1/` page (see §4 — V2 has no
   navigational dependency on V1 either).
2. A new shared behavior (used by 2+ V2 pages) is built once in
   `v2/components/` or `v2/runtime/`, never copy-pasted a third time.
3. `v2/design-system/tokens-v2.css` changes as a release — it affects every
   V2 page at once.
4. `v1/` files are frozen for V1. Do not delete them; do not edit them for a
   V2-only reason (see `V2_DEPRECATION_GUIDE.md` for what a future V1
   sunset removes).
5. Re-verify `V1_BASELINE.json` after any session — the `v1/` files listed
   there must still match; nothing in this phase touched their content
   (only their location moved — see §7).

## 6. Migration rule — status

**Migration is complete.** All seven pages (Contact, Awards, About, Journal,
Projects, Expertise, Homepage) are built on the independent V2 foundation
(`v2/design-system`, `v2/runtime`, `v2/components`) — see `v2/V2_ARCHITECTURE.md`.
`PAGE_MIGRATION_CHECKLIST.md`'s order table reflects this. `V2_PAGE_BLUEPRINT.md`'s
DEPENDENCIES process remains the template for any future new V2 page.

## 7. Cleanup pass 3 — V1 relocation + V2 independence (27 September 2026)

Two changes, done together: **(a)** V1's 8 pages and its 5 own runtime/CSS
files were moved from the project root into `v1/` (content unchanged; each
page's `<head>` updated to reach the shared root data files, which did not
move, one directory level further up — `window.TA_ASSET_BASE` and each
`<script src>` for `site-data.js`/`media-utils.js`/`*-data.js`). **(b)** All
seven V2 pages' Home destination was redirected from the (now-relocated)
`v1/Homepage.dc.html` to `v2/pages/Homepage.dc.html`, after fixing that
page's four blocking bugs (§4; `docs/HOMEPAGE_FUNCTIONAL_PARITY_AUDIT.md`,
`docs/REGRESSION_BASELINE.md`). A related anomaly in `v2/pages/Awards.dc.html`
(one nav item routing through V1 while its siblings already used a V2-sibling
reference) was fixed to match. Full before/after verification (hash checks
on every untouched file, reference greps) is recorded in the corresponding
commit messages.
