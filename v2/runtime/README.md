# V2 runtime

JS loaded by every V2 page, independent of the root's frozen V1 copies.
See `../V2_ARCHITECTURE.md` for load order.

**The V2 interaction language** — five roles, never conflated:

| Role | Owner | Communicates |
|---|---|---|
| ACTION | `cursor.js` | what will happen if you click/tap this |
| STATE | `motif.js` | which item is currently selected/active |
| ENTRANCE | `reveal.js` | content arriving as reading position reaches it (one-time) |
| PROGRESSION | `section-tracker.js` + `scroll-coordinator.js` | continuous response to reading position |
| CONTINUITY | page-local Section Handoff composition | one chapter transferring attention to the next |

A section is not "interactive" merely because it has a cursor label — see
`V2_MIGRATION_PRINCIPLES.md` Principle 12 for the full four-layer breakdown
(Micro Interaction / Entry Reveal / Narrative Scroll / Page Transition).

| File | Publishes | Responsibility |
|---|---|---|
| `layout-mode.js` | `window.TA_LAYOUT` | viewport mode, pointer type, reduced-motion, scroll notifications. Only load if the page reads it. |
| `bidi.js` | `window.TA_BIDI` | `.parts()`, `.cls()`, `.range()` for bilingual strings. |
| `scroll-coordinator.js` | `window.TA_SCROLL` | ONE listener + ONE coalesced scheduler per scroll root (`.subscribe(fn, {root})`). Every other runtime file that reacts to scroll — `reveal.js`, `section-tracker.js`, and page-local Narrative Scroll ticks — registers here instead of its own `window.addEventListener("scroll")`. Must load before any of them. Purely event-driven: never self-reschedules. |
| `ambient.js` | `window.TA_AMBIENT` | the page-level ambient field (`[data-ambient-page]`), zoned by each section's `data-ambient-zone`. |
| `reveal.js` | `window.TA_REVEAL` | Entrance — the progressive reveal engine for `[data-reveal="media\|content\|group"]`. Subscribes to `TA_SCROLL` only while unrevealed content remains pending; unsubscribes (goes fully idle) once everything is revealed, resubscribes automatically when a `MutationObserver` finds fresh `[data-reveal]` content. |
| `ui-strings.js` | `window.TA_UI_V2.t(key, lang)` / `.cursorLabel(key, lang)` | global chrome vocabulary (menu, close, filter, reset, next, previous) and the Contextual Cursor's action labels. Page-specific editorial copy never goes here. |
| `motif.js` | `window.TA_MOTIF` | State — `.cellForIndex(i)`, the one canonical deterministic index→cell path for the reactive 3×3 motif. Never a page-local mapping. |
| `cursor.js` | `window.TA_CURSOR` | Action — the shared Contextual Cursor (`data-v2-cursor="<key>"`), fine-pointer + hover only. |
| `section-tracker.js` | `window.TA_SECTION_TRACKER` | Progression — `.track({root, selector, scrollRoot, onChange})`, "which section owns the reading line" (42% of the scroll root's viewport), built on `scroll-coordinator.js`. Provides state only; a page decides the UI. |
| `media-handoff.js` | `window.TA_MEDIA_HANDOFF` | Shared Architectural Media Handoff — the scroll-driven media-continuity engine used where a page hands a media element off between sections. Only load if the page calls `.mount()`. |
