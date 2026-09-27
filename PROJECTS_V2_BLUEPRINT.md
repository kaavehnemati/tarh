# PROJECTS V2 BLUEPRINT

## DEPENDENCIES
- Presentation: `../design-system/{tokens-v2,base-v2,responsive-v2}.css` — no root presentation
  imports.
- Runtime: `../runtime/{bidi,ambient,reveal,ui-strings}.js`. `layout-mode.js` not loaded (no
  page behavior needs `TA_LAYOUT`; the preview column hides via CSS media query like other
  pages' sticky columns).
- Shared data: `../../site-data.js`, `../../media-utils.js`, `../../projects-data.js`,
  `../../expertise-data.js`, `../../awards-data.js`, `../../journal-data.js`.
- Shared component: `../components/HeaderNav`.
- Confirmed against `v2/V2_ARCHITECTURE.md` §3 — zero root presentation imports.

## A — Projects Archive

| # | Archetype | Surface | Primary focus | Calm/Focus | Visual event | Media | Interaction | Mobile |
|---|---|---|---|---|---|---|---|---|
| 01 | A Editorial Hero | 0 | typography | FOCUS | display heading + count | — | — | full-scale type, stacks |
| 02 | F Structured Field (filters) | 1 | interaction | CALM | filter panel expand | — | toggle panel | full-width panel |
| 03 | E Index + Preview | transparent | interaction | FOCUS | shared preview updates | real project media (once shipped) | hover/focus (desktop), tap (mobile) | preview expands inline below the tapped row instead of a side column |
| 04 | J Editorial Closing | 0 | typography | CALM | closing statement | — | — | stacks |

**Density map:**
```
01 Editorial Hero        CALM/TYPE      (FOCUS on primary focus, CALM on rhythm — opening chapter)
02 Structured Field      CALM/FILTER
03 Index + Preview       FOCUS/MEDIA+INTERACTION
04 Closing               CALM/TYPE
```
**White-stack check:** 01(TEXT)→02(structured,interactive)→03(interactive+media)→04(TEXT) — no
two consecutive chapters are both light+text+no-structure+no-interaction. Pass.
**Busyness check:** each chapter has one named primary focus; sequence is
FOCUS,CALM,FOCUS,CALM — alternates, no repeated FOCUS run. Pass.

## B — Project Detail (final: continuous scroll, no tabs — see PROJECTS_V2_REVIEW.md)

| # | Chapter | Archetype | Surface | Primary focus | Calm/Focus | Media | Interaction | Mobile |
|---|---|---|---|---|---|---|---|---|
| 00 | Hero | B Full Media Stage | off | media | FOCUS | real hero media | scroll depth | shorter crop, no depth JS under reduced motion |
| 01 | At a Glance | A/H | soft | typography+scale | CALM | — | — | stacks |
| 02 | Design Intent (if `editorial.lead`/`chapters`) | A | off | typography | CALM | — | — | stacks |
| 03..N | Story blocks — role-aware: `context`/`strategy`/`experience`/`material`/`technical` if the record sets one, else positional Strategy-first/Experience-rest | B/C/D | mixed | alternates | alternates | real story media | one expansion moment (first `full-image`, desktop only); sticky counter | chapter→media→chapter; no width-interpolation on mobile |
| N+1 | Drawings (if any) | F | minimal | structure | CALM | drawing media | Drawing Build (first only) | stacks |
| N+2 | Project Information + Facts (merged) | F/H | minimal | structure+scale | CALM | — | — | stacks |
| N+3 | Team & Services (if any) | F | minimal | structure | CALM | — | — | stacks |
| N+4 | Recognition — awards+journal (if any) | F | soft | structure | CALM | — | links out | stacks |
| N+5 | Related Work (if any) | I | soft | media | FOCUS | real media | click through | sequential stack |
| N+6 | Next Project | J | full | media+type | FOCUS | real media | click through, depth | stacks |

**Chapter indicator + progress rail**: desktop shows both (compact pill + 120px rail); mobile
(≤767px) shows the pill only, repositioned for safe areas, rail hidden entirely.
**Archive mobile preview**: hidden below 1024px; each register row gets its own 56px thumbnail
instead (media-first, no hover dependency) — see PROJECTS_V2_REVIEW.md.
**Scroll/observer architecture**: `tick()` on `scroll` + `setTimeout` gating, not
IntersectionObserver/requestAnimationFrame — verified neither fires in this preview
environment; see PROJECTS_V2_REVIEW.md for the evidence and reasoning.

**Density map (typical project with 2 story blocks):**
```
01 Hero                  FOCUS/MEDIA
02 Design Intent          CALM/TYPE
03 Story: full-image     FOCUS/MEDIA
04 Story: image-text     CALM/SPLIT
05 Story: sticky-narr.   FOCUS/MEDIA (spatial motion)
06 Drawings              CALM/STRUCTURED
07 Facts                 CALM/SCALE
08 Related projects      FOCUS/MEDIA
09 Next project          FOCUS/MEDIA+TYPE
```
**White-stack check:** every chapter after the hero either carries media, a structural surface
change, or an interaction — no two consecutive chapters are both plain light text.
Pass, by construction of the story-block renderer (never two `image-text`-only in a row without
a media/full-image beat between them in the canonical data for project-001/002).
**Busyness check:** 08→09 is two FOCUS chapters in a row (related projects → next project), both
media-led — acceptable exception per Principle 01b/01c: this is the page's own closing
sequence, a single "here's where to go next" idea told in two beats, the same exception granted
to About's and Journal's opening two-chapter FOCUS run.

## Notes
- **`#p=<routeIndex>` hash contract preserved exactly** — Awards, About and Journal already
  link into this. No cross-page link changes needed beyond the routing correction (V1 root →
  sibling) already done for Contact.
- **Story renderer is generic**, keyed on the canonical `story[].type` (`full-image`,
  `image-text`, `sticky-narrative`) — never a per-project template. A future real project using
  only two of the three types renders correctly with no code change.
- **Removed from V1**: alternate "visual view" grid, image-viewer lightbox, custom cursor, RM
  toggle — see `PROJECTS_V1_AUDIT.md` for reasoning on each.
- **Missing capability**: none found this pass — `data-grid-surface`, `data-reveal`, sticky→
  static, and the recognition/journal-row visual language all already existed and covered
  every need here.
