# SPATIAL EDITORIAL ARCHETYPES — Design System V2.1

A compositional vocabulary, not prebuilt page sections. A page chooses and reinterprets these;
copying one identically across every page is exactly the sameness this document exists to
prevent. Each entry: purpose, what it may contain, and its mobile translation (never a naive
shrink).

## A — Editorial Hero
Strong page proposition. Display typography (`--t-dl`/`--t-dxl`), one ambient `full` zone, an
optional media edge, one 3×3 motif, an optional secondary statement.
**Mobile:** type stays full-scale (fluid clamps already handle it); motif stays but may move
off the media edge if one doesn't exist; secondary statement stacks below, never beside.

## B — Full Media Stage
Real canonical media, full/near-full width. Caption + credit rendered from the media record
(`TA_MEDIA.resolve()`), Progressive Reveal (`data-reveal="media"`).
**Mobile:** width stays full-bleed; aspect ratio may change to a taller crop (`heroRatio`
already supports this — see Journal's detail hero) rather than shrinking a wide image.

## C — Split Narrative
Asymmetric media/text (5/7, 7/5, 4/8 via `--span-*`), not centered, not equal columns. Media
and text need not share a vertical starting point.
**Mobile:** sequential stack, media first or text first per which orients the reader faster —
not always the same order as desktop.

## D — Sticky Media Story
One media stage spatially anchored (`position:sticky`) while narrative chapters scroll past it;
the active chapter may change the media's image/crop/caption/metadata.
**Mobile:** `sticky→static` (already the convention — see `responsive-v2.css` note in
`v2/V2_ARCHITECTURE.md` §1); becomes chapter → full-width media → next chapter, not a shrunken
sticky column.

## E — Index + Preview
A text register controls one shared preview surface via hover/focus/tap — never a thumbnail
per row. Reference: Awards' Archive.
**Mobile:** tap expands the preview inline below the row (no persistent preview column) —
already true of Awards' `previewDisplay:"none"` on mobile; V2.2 candidate: expand inline
instead of hiding outright, once real media exists to preview.

## F — Structured Field
Facts/archive/technical information. Rules, `data-grid-surface`, numbers, micro typography.
Ambient `minimal`. Reference: Awards' Archive rows, About's Evidence.
**Mobile:** single column, key/value rows stack (already the convention — see `responsive-v2.css`).

## G — Dark Interlude
Surface 4, short. Manifesto / quote / critical idea / chapter break. Never the whole page.
Reference: About's Philosophy.
**Mobile:** stays dark and short — never stretched to fill a mobile viewport height it doesn't
need.

## H — Visual Fact Field
Large number + micro label, contrast-driven. May pair with media/drawing. Reference: About's
Evidence.
**Mobile:** numbers may wrap to 2-up (`--r-two-up` convention) before collapsing to 1-up.

## I — Media Pair / Editorial Collage
Two+ canonical media items, asymmetric sizes where composition supports it. Never generic
equal cards. Reference: Journal detail's media pair.
**Mobile:** sequential stack in a deliberate order (larger/primary item first), not a shrunken
side-by-side.

## J — Editorial Closing
Final proposition / next action. May reconnect ambient, motif, related content, next-page nav.
Reference: every migrated page's closing section already does this.
**Mobile:** unchanged in spirit — single column, footer nav stacks.

## Not templates
No page is required to use all ten. A page's chapter sequence (see `V2_PAGE_BLUEPRINT.md`
"VISUAL RHYTHM") is a deliberate choice from this vocabulary, reinterpreted for that page's
actual content — two pages using archetype F should still look like different pages, because
the content, scale and surrounding chapters differ.

## Project Presentation Spine (project-detail-specific, not a general archetype)
Architectural Project Detail pages get one additional, page-type-specific pattern layered on
top of the ten archetypes above — see `V2_MIGRATION_PRINCIPLES.md` Principle 12 and its
"Project Presentation Spine" entry under Optional Reusable Patterns. It is not a general
archetype because it names a specific real-world content sequence (project idea → context →
strategy → experience → technical resolution → facts → team → recognition → related work), not
a reusable spatial shape another page type would reach for. Every chapter in the spine still
resolves through one of the ten archetypes above (Hero via B, Design Intent via A/C, Facts via
H, etc.) — the spine is the *order*, the archetypes are the *shape*.
