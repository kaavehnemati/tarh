# CONTACT V1 AUDIT

## PRESERVE
- **Inquiry-first flow.** The user names the conversation (Start a Project /
  Collaboration / Media-Press / Careers / General) before any field appears.
  Strongest structural idea on the page — carries forward unchanged in spirit.
- **Context-sensitive form.** Base fields (name, email, message) plus fields
  driven by `TA_CONTACT.fieldsFor[intent]` — real adaptive behavior, not a
  giant universal form. Carries forward as-is; the field vocabulary
  (`FIELD_DEF`) is form config, not data, so it stays page-local like in V1.
- **Line-based input styling** — label, input, fine bottom rule, no boxes.
  Exactly V2's own form language already (nothing to change).
- **Typed-value survival** — values cached outside React-ish state and
  restored after every re-render (skipping the focused element) so language
  switching, intent switching, or a layout re-measure never wipes what the
  user typed. Real, load-bearing logic — preserved.
- **Honest attachment control** — a textual row ("Attach file" →
  acknowledgment), no fake drag box, no fake upload progress. Preserved.
- **Studio/direct-contact independence** — the studio info section renders
  complete with or without an active inquiry; every row is conditional on
  real data existing (`addRow` helper skips empty values). Preserved
  principle, and the office-count-agnostic layout (1/2/3 offices, no
  redesign) is exactly what Contact V2 must also do.
- **Honest placeholder discipline** — `[EMAIL]`, `[PHONE]`, null social
  hrefs render nothing rather than a fake link. This is a hard content rule
  in the brief too — preserved exactly.
- **Deep-link intent/expertise preselection** (`#intent=`, `#expertise=`)
  and the "arriving from Home" transition — useful, real behavior. The
  hash contract is worth preserving; the bespoke arrival animation is
  V1-specific chrome, reinterpreted below.

## IMPROVE
- **"Let's begin with a conversation."** is the strongest line on the page.
  V1's Persian version is a literal 2-line mirror of the English 3-line
  break. V2 should compose its own Persian line break instead of matching
  English structure (RTL_LTR_GUIDE_V2.md §2: Persian is never a mirror).
- **Validation color** relies partly on a literal warn hex (`--warn:#7A2E22`)
  that doesn't exist in the V2 token set. V2 has no error/state token yet —
  flagged as a missing capability (see blueprint), not invented locally.
- **Header scroll-collapse** (padding/background driven by a rAF tick loop)
  is V1-specific chrome. Every migrated V2 page already uses a simpler,
  static sticky header (`HeaderNav`) with no scroll-driven repaint loop —
  Contact should match that, not reintroduce a page-specific scroll listener.

## REMOVE / SIMPLIFY
- **Custom cursor** (`data-cursor-el`, 78px circle, rAF-tracked, "Select"
  label). Audited against the brief's own test: does it genuinely improve
  inquiry-type selection or submission? No V2 reference page (About, Awards,
  Journal) uses one — they all signal "active/selectable" with the existing
  turquoise micro-indicator + color transition, which Contact already has on
  every interactive row. Adding a page-wide novelty cursor here would be the
  one-off V1 relic the migration is meant to retire. **Decision: removed.**
  Documented in `CONTACT_V2_REVIEW.md`.
- **Reduced-motion toggle button** in the V1 footer (`RM on/off`) is a
  developer/QA convenience, not a real product control — no other V2 page
  has one, and the OS-level `prefers-reduced-motion` already governs the
  whole system per `V2_MIGRATION_PRINCIPLES.md`. **Decision: removed.**
- **Bespoke "arrive from Homepage" sequence** (grid-mark scale, staggered
  fade-ups, coordinated ~640ms timeline) is a one-off scripted transition
  independent of the shared reveal grammar. V2's opening sections use the
  shared `data-v2-rise`/`data-v2-in` page-entry motion everywhere else;
  Contact does the same instead of a bespoke arrival script. The functional
  part worth keeping — arriving from Homepage/Expertise preselects intent
  and expertise via the hash contract — is preserved; only the one-off
  animation is dropped.
- **`stay` handler on the header's own Contact nav link** (scrolls to top,
  prevents default) is redundant once `HeaderNav` marks the current page's
  nav item inert like Awards/About/Journal already do (`on:"0"`/`"1"`,
  non-interactive current-page marker, no click handler needed).

## Arrival behavior audited
- From Homepage CTA: `#from=home` triggers the bespoke arrival animation in
  V1 — superseded by the standard page-entry motion in V2 (see above); the
  intent-preselection part of any future Homepage CTA still works through
  `#intent=`.
- From Expertise: `#expertise=<slug>,<slug>&intent=project` (or bare
  `#expertise=`, defaulting intent to `project`) preselects disciplines.
  Preserved exactly — this reads live from `TA_EXPERTISE` via
  `TA_CONTACT.expertise`, so no taxonomy is duplicated.

## EN/FA behavior
Correct in V1: direction, font, uppercase-off in Persian, LTR isolation on
email/phone value rows. Ports directly to V2's `TA_BIDI` utilities instead
of the inline `dir="{{ f.dir }}"` per-field hand-rolling V1 used — same
effect, systemized.

## Desktop/mobile
V1 has no explicit mobile recomposition for Contact beyond the shared
`responsive.css` generic collapse (12-col → 1-col, sticky → static). V2
needs the same effective behavior, done through Contact's own page-local
`@media` (consistent with About's team-grid pattern), since V2's
`responsive-v2.css` intentionally carries no page-specific selectors.

## Reduced motion
V1 handles it per-effect (arrival script checks `state.reduced`, entry
keyframes have a `forceReducedMotion` prop). V2's system-wide reduced-motion
handling (ambient static, reveal immediate, `[data-v2-rise]` none) covers
all of this automatically once Contact stops inventing its own animations.
