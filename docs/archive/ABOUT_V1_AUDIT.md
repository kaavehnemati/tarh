# ABOUT V1 AUDIT
## Tarh & Afarinesh / طرح و آفرینش

Audit of `About.dc.html` (V1) before building V2. V1 is not modified.

## Structure — nine sections

1. **Opening** — the statement "We design the relationship between people and place" at display
   scale (Persian composed independently), plus placeholder facts (Founded [YEAR], Based in [CITY]).
2. **The practice** — lead sentence plus two body paragraphs.
3. **History** — five milestones with a sticky oversized year and a 3×3 module moving across time.
4. **Philosophy** — "Design begins with the question, not the answer", plus three themes
   (Question / Collaborate / Make).
5. **People** — four leadership profiles on one shared portrait stage (hover or tap to select),
   a team index, and collaborators.
6. **Numbers and clients** — four statistics (`XX` placeholders) and a client matrix.
7. **Thinking** — one lead sentence plus links to Expertise and Journal.
8. **Selected recognition** — featured awards.
9. **Close** — "Work with us" and contact.

## Content

All content comes from `about-data.js` (`contentState:"prototype"`): 4 leadership profiles with
`[ROLE]` placeholders, a team index, 5 history milestones (founding year `[YEAR]`), 3 themes,
4 statistics with `XX` values, clients and collaborators. The opening and philosophy statements
live in the V1 markup, composed separately per language. **No company fact is real yet**, so V2
must preserve the placeholders and invent nothing.

## Findings

| Area | V1 | Issue |
|---|---|---|
| **Pacing** | Nine sections of similar weight | Reads as a company profile; history is the longest section although it is the least substantive (all placeholders) |
| **Surfaces** | Mostly flat canvas | Several text-only sections run back to back with no change of register |
| **Philosophy** | Mid-page, same ground as its neighbours | The strongest statement on the page carries no more weight than a list |
| **People** | Shared portrait stage | Already good: editorial, not employee cards. Keep |
| **Typography** | Inline `clamp()`; per-component metric ternaries | Not role-based |
| **Grid** | Inline `grid-column` numbers; per-language placement in `applyLang()` | Hidden grid |
| **Recognition** | Selects by `featuredOnAbout` | The same flaw found in Awards V2: prototype records carry the flag too |
| **RTL** | Composed per language; LTR islands | Good; keep |
| **Motion** | Mask reveals, sticky year + 3×3, portrait swap | Within the V2 families |

## Must survive into V2

- The two composed statements, with their per-language line breaks.
- The shared portrait stage — one image, a list of names, select to swap.
- Every placeholder, left as a placeholder: `[YEAR]`, `[ROLE]`, `XX`.
- The Persian composition and LTR islands.
