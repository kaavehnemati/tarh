# DESIGN SYSTEM V2 — READY
## Tarh & Afarinesh / طرح و آفرینش

**Status: stable foundation, ready for page-by-page migration.** 24 September 2026.

---

## Completed systems

| System | Status | Lives in |
|---|---|---|
| Motion | ✅ | `tokens-v2.css` — 14 tokens, six-step scale, four curves |
| Surface | ✅ | `tokens-v2.css` — five grounds, no new hue |
| Typography | ✅ | `tokens-v2.css` — 17 roles, EN + FA ladders, 102 tokens |
| Spacing | ✅ | `tokens-v2.css` — base scale, 9 semantic roles, 3 pause levels, 8 relationships |
| Grid | ✅ | `tokens-v2.css` — 12 / 8 / 4 columns, 9 spans, 5 containers |
| Components | ✅ | `tokens-v2.css` — 11 tokens; 16-component inventory |
| **Distribution layer** | ✅ | `tokens-v2.css` — Layers 2 and 3 |

Documentation of every system lives in `Design System.dc.html`, which is now the first
consumer of `tokens-v2.css` rather than its owner.

---

## The distribution layer — what Phase 1H added

`tokens-v2.css` holds all **203 tokens** in three layers:

1. **`:root`** — base values, English, desktop. Grouped palette · fonts · surface · motion ·
   typography · spacing · grid · component. Surfaces 0 and 4 now reference the palette instead of
   repeating its hex values.
2. **`[dir="rtl"]`** — **60 re-points**. Every type role and the three spacing corrections switch to
   their Persian value by inheritance; tracking zeroes at every role; measure and title caps
   follow the language. *A component names one role; the language resolves it.* This is what
   retires the 69 per-component ternaries.
3. **`@media`** — spans and column count resolve per breakpoint (12 → 8 → 4), matching
   `responsive.css`. Margins and gutters are left to `responsive.css`, which `--grid-margin` /
   `--grid-gutter` already alias. Reduced motion collapses the scale so no component needs its own
   fallback.

4. **Bidi utilities** *(Phase 2B fix)* — `.text-rtl`, `.text-ltr`, `.text-number`, `.text-code`,
   `.text-mixed`, paired with `bidi.js`. Numbers are always LTR and isolated so neutral
   punctuation beside them can't jump sides; a string is an LTR island only when it has **no
   Persian script at all** — so "SBID جایزه بین‌المللی طراحی" stays RTL, where first-strong-character
   detection (`dir="auto"`) would get it wrong.

**Verified:** every `var()` in the file resolves; every Persian token has an English base; no
duplicate key in the RTL block; all 80 custom properties used by the Design System page resolve
from the shared file.

**Consumption rule for layout grids:** `grid-template-columns:repeat(var(--grid-cols),1fr)`.
A literal `repeat(12,1fr)` combined with span tokens misplaces content below desktop — this was
caught and fixed on the Design System page itself during this phase.

---

## Component consumption rule

Every component consumes, in this order, and owns nothing but its structure:

```
Component → Grid → Spacing → Typography → Surface → Motion
```

No isolated component styling. No value a foundation already provides.

---

## What is protected — Modernity Preservation Rules

1. The shared image journey — one image, three roles, no cross-fade.
2. Scroll scrub stays scrub.
3. Asymmetry stays — unequal pairs, empty columns, stepped type.
4. Two grounds dominate — Surfaces 1/2 on six to eight sections only.
5. Turquoise stays rationed.
6. No cards, radii, shadows, glass.
7. Type keeps its scale contrast.
8. Brand geometry does interface work.
9. The diagonal stays singular.
10. Persian stays composed, never mirrored.
11. Reduced motion stays first-class.
12. Content-aware omission stays.
13. Whitespace is not the problem — Editorial Pause is a decision.

---

## What future migration must follow

- `PAGE_MIGRATION_CHECKLIST.md` — every page, both languages, before the next begins.
- `V2_DEPRECATION_GUIDE.md` — what each inline pattern is replaced with.
- Order: Awards → About → Journal → Contact → Projects → Expertise → Homepage.

---

## What must never be changed casually

- **`tokens-v2.css`** — a change here changes every page. Treat as a release, not an edit.
- **The Persian weight ladder** — loaded weights only (300/400/500/700). Requesting 600 gets
  synthesised by the browser.
- **The motion scale** — adding a tempo reopens duration sprawl.
- **The five surfaces** — a sixth becomes a new default.
- **The documented exceptions** — hero stagger, shared image stage, project stage, diagonal.
- **Layer 2** — removing a re-point silently reintroduces English values into Persian.

---

## Still open, unrelated to V2

The four project records remain `contentState:"real"` with their media deleted, so image-led
sections render blank. Restore the photography, or revert those records to prototype, before any
migration whose acceptance depends on judging imagery.
