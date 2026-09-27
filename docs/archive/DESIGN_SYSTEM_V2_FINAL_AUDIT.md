# DESIGN SYSTEM V2 — FINAL INTEGRATION AUDIT
## Tarh & Afarinesh / طرح و آفرینش

**Phase 1G · audit only · measured against live source, 24 September 2026.**
No visitor-facing page was touched, and no file was modified.

---

## 1. EXECUTIVE SUMMARY

The six foundations are **individually sound and mutually consistent in intent**. Motion,
surface, type, spacing, grid and component rules do not contradict one another, name the same
concepts the same way, and all document Persian as a composed language rather than a mirror.

But the audit's core question — *can this system generate the whole site without page-specific
decisions?* — gets an honest **not yet**. Three connection gaps would force exactly those
page-level decisions during migration:

1. **The V2 tokens exist in one file only.** Every token defined in phases 1B–1F lives in the
   Design System's own `:root`. Each visitor page is a self-contained component with its own
   `:root`; none of them declares a single surface, type, spacing, grid or component token.
   Measured: across all seven pages, **0** references to `--surface-*`, `--t-*`, `--space-*`,
   `--span-*` or `--c-*`. Migrating a page today would mean copying ~200 tokens into it — seven
   diverging copies of the system.
2. **Persian tokens don't resolve by language.** Type roles and spacing relationships come in
   paired forms (`--t-hl` / `--t-hl-fa`, `--rel-heading-body` / `--rel-heading-body-fa`). A
   component must still *choose* the `-fa` variant itself — which is precisely the inline
   ternary the Typography V2 phase set out to remove. The pages currently hold **69** such
   ternaries; the system as written would preserve them rather than retire them.
3. **Grid spans are declared for one breakpoint.** `--span-lead` etc. carry desktop values
   only. Their tablet and mobile placements are documented in a table but not tokenised, so a
   migrated page would still need its own media queries to collapse.

All three are small, mechanical, and confined to shared infrastructure — none touches visual
design. **Decision: READY FOR PAGE MIGRATION after a short Phase 1H that closes these three
gaps.** Detail in §11–12.

---

## 2. CURRENT DESIGN DNA — PROTECTION RULES

Carried from the Phase 0 audit and still binding. Every migrated page is checked against these:

1. The shared image journey — one image, three roles, no cross-fade.
2. Scroll scrub stays scrub — never converted to fire-once reveals.
3. Asymmetry stays — unequal pairs, empty columns, stepped type.
4. Two grounds stay dominant — Surfaces 1 and 2 are accents on 6–8 sections, not a new default.
5. Turquoise stays rationed — state, accent, small geometry only.
6. No cards, radii, shadows or glass — `--c-radius:0` by rule.
7. Type keeps its scale contrast — oversized display against 11px metadata.
8. Brand geometry does interface work — the 3×3 indicates state.
9. The diagonal stays singular — once, Philosophy → Research.
10. Persian stays composed — own offsets, own measure, LTR islands intact.
11. Reduced motion stays first-class — every new device static by definition.
12. Content-aware omission stays — no module renders without data.
13. Whitespace is not the problem — Editorial Pause is a decision, never a gap to fill.

**V2 rules that could make the site generic if misapplied** — flagged so migration doesn't
over-apply them:

- *Span tokens* can flatten composition if every section is forced into `lead/support`. The
  hero stagger and project stage are documented exceptions and must stay bespoke.
- *Section rhythm types* can equalise pacing if every section defaults to "Standard". The five
  types exist to be *unequal*.
- *Component reuse* can pull toward uniformity. The unified index-with-preview must keep each
  page's own content density, not become one generic list.
- *Surface 1* can become a new grey default if applied to every text section. Six to eight
  sections, no more.

---

## 3. MOTION INTEGRATION REVIEW

**Sound.** Motion is the only V2 system already partly adopted by pages (21 V2 references
across six pages, from the Phase 1A migration). Four families, six-step scale, four curves.

- Surfaces are static by rule — no conflict with motion.
- Type-to-motion mapping uses existing families only — no conflict.
- Spacing-to-motion rules (large pause + delayed reveal → no stagger) are documented in the
  spacing section and consistent with the reveal family.
- Component states reference motion tokens only.

**Refinement (minor):** legacy aliases are still declared — `--m-base` (= `--m-reveal`),
`--e-enter` (= `--e-editorial`), `--e-standard` (= `--e-smooth`), `--e-exit`. They were kept
deliberately so the 1A migration broke nothing. Retire them **after** page migration, not before.

---

## 4. SURFACE INTEGRATION REVIEW

**Sound.** Five surfaces, no new hue, application gate documented.

- `--surface-0` and `--surface-4` repeat the literal values of `--canvas` and `--ink`. They
  should reference the palette (`var(--canvas)`, `var(--ink)`) so a palette change propagates.
  Minor, but it is a second source of truth for two colours.
- `--surface-fall` is declared and documented as "the only sanctioned gradient" but used
  nowhere. Keep it — it's reserved for the Surface 0 → 1 transition — but it needs a named use
  case in migration guidance, otherwise it stays dead.
- `--surface-grid-strong` is unused. Candidate for removal unless a register needs it.
- Component–surface awareness is documented for the four REFINE components (information,
  quote, capability, footer). No component currently *breaks* on any surface.

---

## 5. TYPOGRAPHY INTEGRATION REVIEW

**Sound in content, incomplete in connection.**

- 17 roles × EN/FA, Persian ladder on loaded weights only (300/400/500/700 — **no 600
  requested anywhere**, verified). The synthesised-600 defect from Phase 1C is closed.
- **Gap 2 lives here** — roles resolve by *name*, not by *language*. See §11.
- **Ownership overlap:** body measure is owned by Typography (`--measure-en/fa`), title and
  hero measure by Grid (`--grid-title-max`, `--grid-hero-max`). Neither `--grid-title-max` nor
  `--grid-hero-max` is referenced by any type role. Decide one owner: recommend **Grid owns all
  measure caps, Typography references them.**
- 71 of 99 type tokens are unused in the Design System itself. This is **expected, not a
  defect** — they are definitions awaiting pages. It becomes a defect only if they are still
  unused after migration.

---

## 6. SPACING INTEGRATION REVIEW

**Sound.** Base scale, nine semantic aliases, three Editorial Pause levels, eight type-to-type
relationships, three RTL corrections.

- Spacing ↔ type is correctly connected by `--rel-*` tokens.
- Spacing ↔ grid is correctly separated: the gutter is horizontal only, vertical row gaps come
  from spacing. No overlap.
- Spacing ↔ surface transitions documented (0→0 section-lg, 0→1 section, 3→0 section-xl).
- **Same language-resolution gap as type:** the three `--rel-*-fa` corrections must be chosen
  explicitly by the component.

---

## 7. GRID INTEGRATION REVIEW

**Sound in content, incomplete for responsive.**

- Nine semantic spans codified from measured usage (4/3/7/2/8/9 columns). Five containers.
- `--grid-margin` and `--grid-gutter` correctly alias the existing `--marg` / `--gap`, so the
  responsive breakpoint overrides in `responsive.css` flow through automatically. ✓
- **Gap 3 lives here** — span tokens carry desktop values only. See §11.
- 15 of 21 grid tokens unused in the Design System — expected pre-migration.

---

## 8. COMPONENT INTEGRATION REVIEW

**Sound.** Sixteen components, all consuming the five foundations by rule. Nine component
tokens, radius 0.

- No component defines its own grid, type scale or motion — verified against the documented
  inventory.
- **Hidden-grid risk in the pages, not the system:** the pages hold **155 inline
  `grid-column` placements** and per-page layout maps (`WORK_LAYOUT`, `REL_LAYOUT`, `VIS`). These
  are exactly the hidden grid systems the component rules forbid. They are migration work, and
  the span tokens are ready for them once Gap 3 is closed.
- The two UNIFY items (three index-with-preview implementations; two recognition-row layouts)
  should be built as shared components *before* the pages that use them are migrated.

---

## 9. RTL INTEGRATION REVIEW

**Consistent across all six systems in documentation.** Every system states what mirrors, what
doesn't, and what is recomposed — and they agree:

| | Mirrors | Never mirrors | Recomposed |
|---|---|---|---|
| Grid | splits, index/preview, nav | photography, drawings, 3×3, diagonal | hero offsets |
| Type | reading edge | LTR islands | line breaks, measure |
| Spacing | — | — | three `-fa` corrections |
| Components | nav order, arrows | ↗ mark, LTR fields | Persian metadata register |
| Motion | arrow direction | brand diagonal | — |

**The single RTL weakness is mechanical, not conceptual:** Gap 2. Persian is designed as a
first-class language in every document, but the token layer doesn't yet switch it
automatically.

---

## 10. RESPONSIVE INTEGRATION REVIEW

Typography scaling (clamp) + spacing reduction (clamp with floor) + motion reduction
(`TA_LAYOUT`) all work together without conflict: each scales on its own axis, none fights
another.

**One conflict risk:** grid collapse is the only system with no tokenised responsive
behaviour (Gap 3). Everything else responds automatically; spans do not. That asymmetry is
exactly where page-specific media queries would creep back in.

Mobile motion reduction, compact interaction, and the four-chapter mobile project model are
all intact and unaffected by V2.

---

## 11. REMAINING ISSUES

### Checked and cleared
- **`--gap` / `--marg` appeared twice** in a token scan. The second pair is the mobile
  `@media` override (`--marg:20px; --gap:16px`), not a duplicate — the responsive override
  working as intended. No defect; nothing changed.

### Foundation refinements required before migration — proposed Phase 1H
All shared-infrastructure, zero visual change:

| # | Gap | Fix |
|---|---|---|
| **1** | V2 tokens live in the Design System only | Extract all V2 tokens into one shared `tokens-v2.css` (custom properties only), loaded by every page alongside `responsive.css`. One source, not seven copies. |
| **2** | Persian tokens chosen by the component | Add a `[dir="rtl"]` block in that file that re-points each role to its `-fa` value (`--t-hl: var(--t-hl-fa)` …). Components reference one name; language resolves automatically. This is what actually retires the 69 ternaries. |
| **3** | Spans declared for desktop only | Add breakpoint overrides of `--span-*` in the same file, using the tablet/mobile values already documented in the grid table. |

### Minor, not blocking
- Point `--surface-0/4` at `var(--canvas)` / `var(--ink)`.
- Assign one owner for measure caps (recommend Grid).
- Give `--surface-fall` a named use or remove it; remove `--surface-grid-strong`.
- Retire legacy motion aliases **after** migration.

---

## 12. MIGRATION READINESS

| Page | Status | Why |
|---|---|---|
| **Awards** | **READY after 1H** | Smallest page, weakest surface, every needed token exists. Recommended first. |
| Projects | NEEDS 1H + unified index component | Depends on the index-with-preview unification. |
| Expertise | NEEDS 1H + unified index component | Same dependency. |
| About | READY after 1H | Uses the recognition row — unify with Awards first. |
| Journal | READY after 1H | Lowest-priority surface work; self-contained. |
| Contact | READY after 1H | Closing-section rhythm and footer only. |
| Homepage | **Last** — READY after 1H | Highest risk; signature interactions are documented exceptions. Migrate once the system is proven on the others. |

**Final decision: READY FOR PAGE MIGRATION — conditional on Phase 1H.**

The system *does* allow a more coherent and mature site while preserving the architectural
identity — every rule was derived from what the site already does, and the protection rules
above are complete. What it doesn't yet do is *distribute* itself. Phase 1H is roughly one
shared file with three blocks; after it, pages consume the system rather than re-deciding it.

---

## 13. RULES FOR PAGE MIGRATION

1. **Load, don't copy.** A page consumes `tokens-v2.css`; it never re-declares a V2 token.
2. **Reference roles, never literals.** No font size, spacing value, duration or span number
   written inline.
3. **One name per role.** Never reference a `-fa` token directly — language resolves itself.
4. **Replace, don't restyle.** A migration swaps an inline value for its token. If the
   rendered result changes, the mapping is wrong — stop.
5. **Exceptions stay exceptions.** Hero stagger, project stage, shared image stage and the
   diagonal are not migrated to span tokens.
6. **Unify before migrating.** Build the shared index-with-preview and recognition-row
   components before the pages that use them.
7. **Surfaces by the gate.** Apply Surface 1/2 only where the five-question gate says so —
   target six to eight sections site-wide.
8. **Verify each page in both languages at 1440 and 390**, with reduced motion on, before the
   next page begins.
9. **Run the §2 protection checklist after every page.**
10. **Migrate one page at a time, Awards first, Homepage last.**

---

*End of Phase 1G. Visitor-facing pages untouched. Awaiting approval of Phase 1H.*
