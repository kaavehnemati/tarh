# JOURNAL DETAIL V2 BLUEPRINT

**Why Detail never opened:** archive cards linked to `Journal.dc.html#article=<slug>`,
but V2 `componentDidMount` only tested `/lang=fa/` — `article` was never parsed,
there was no detail state, and `setLang()` overwrote the hash with `#lang=fa`,
discarding the article.

## Routing
One contract: `#article=<slug>&lang=fa`, parsed key/value (order-free). Resolved
via `TA_JOURNAL.bySlug()` → `byId()`; an invalid slug falls back to Archive and
cleans the hash. `setLang()` rebuilds the hash preserving the article. In-page
navigation (card, prev/next, back) uses `pushState`; `hashchange` + `popstate`
re-read the route so browser Back/Forward work. Archive view = no `article` param.

## Sections (one renderer for every entry shape)
| # | Section | Surface | Ambient | Reveal | Renders when |
|---|---|---|---|---|---|
| D1 | Opening — back link, type·date, title, excerpt, author(s)·role | 0 | full | none (orientation) | always |
| D2 | Hero media | 3 | off | media | `hero` |
| D3 | Body — paragraph / heading / quote | 0 | soft | content on headings+quotes only; paragraphs none | `body`, else excerpt |
| D4 | Wide media + caption/credit | 3 | off | media | `media.wide` |
| D5 | Media pair — 5-col portrait + offset 4-col square | 0 | soft | media | `media.pair` |
| D6 | Modules — video / audio / document register | 0 | soft | none | `video` / `audio` / `doc` |
| D7 | Related project + expertise topics, prev / next | 0 | full | none | always |

No null-source media produces controls: video/audio/doc with `src`/`file` null
render as a register row stating "file to be provided" — no fake player, no fake
download. Short entries (`short:true`, news) naturally collapse to D1/D3/D7.

## Data
Authors from `TA_JOURNAL.authors` (+`coAuthor`), role from `roleEn/roleFa`.
Project via `TA_JOURNAL.project(projectId)` (canonical, published-only) → routes to
`Projects.dc.html#p=<routeIndex>`. Topics via `TA_EXPERTISE.bySlug()` →
`Expertise.dc.html#<slug>`. Prev/next follow canonical `sortOrder`, wrapping.

## RTL / responsive
All mixed strings through `TA_BIDI.parts()`. Body at `--span-body` + `--measure`
(Persian measure via tokens). Pair uses fixed spans that collapse under the
existing 4-column mobile grid; prev/next is a 2-column nav with the "next" side
aligned to the inline end.
