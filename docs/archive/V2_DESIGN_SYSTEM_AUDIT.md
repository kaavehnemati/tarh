# V2 DESIGN SYSTEM AUDIT
## Tarh & Afarinesh / طرح و آفرینش

**Phase 0 — audit only. No file in the project was modified to produce this document.**
Measured against the live source on 22 September 2026: 8 page components, 7 canonical data
modules, `media-utils.js`, `layout-mode.js`, `responsive.css`.

---

## A. EXECUTIVE SUMMARY

The website does not have a motion-variety problem. It has a **motion-arithmetic** problem.

Measured across all eight pages: **4 distinct easing curves** — genuinely disciplined, and
three of them are already declared as tokens — but **59 distinct duration values**, and only
**42% of timing goes through a token** (343 token references against 475 hard-coded `ms`
literals). The four declared tokens are `--m-fast:240ms`, `--m-standard:420ms`,
`--m-slow:820ms`, `--m-page:1000ms`. Around them has grown a long tail: `890ms`, `910ms`,
`930ms`, `940ms`, `960ms`, `980ms` all appear exactly once each.

That is the mechanism behind "each block has a separate motion logic". The *character* is
consistent — everything clips, translates and settles on the same three curves. What differs
is **tempo**. Two adjacent sections revealing at 620ms and 900ms read as two different
systems even though they share an easing curve. **This is the single highest-value V2 fix and
it is almost entirely non-visual**: collapsing the tail onto a five-step scale changes very
few frames but unifies the felt rhythm across the whole site.

The second finding is more consequential than the brief assumes. Persian is not typeset by a
system at all — it is typeset by **35 distinct inline ternary decisions** of the form
`fa ? "1.5" : "1.04"` plus **20 paired `clamp()` size decisions**, re-made per component.
Persian weight resolves to only **500 or 600, never a display weight**. That is a structural
explanation for the perception that Persian reads lighter and less confident than English:
English display type gets genuine scale contrast, while Persian gets the same mid-weight at
every level of the hierarchy. Persian needs **semantic type roles**, not another weight sweep.
Tracking discipline is already correct — 1 non-zero value across 227 Persian spans.

The third finding qualifies the brief's premise. Auditing every section against "does this
whitespace carry tension or has it gone slack", most of the whitespace is doing real work.
Only a small number of surfaces are genuinely unfinished, and they cluster in one identifiable
condition: **text-only sections that follow an image-led section on a page whose surface
vocabulary has no middle register**. The site currently has essentially two grounds — warm
canvas and ink — with no intermediate tonal surface. Adding one is a more precise fix than
adding decoration to individual sections.

**Priorities:** P0 — duration consolidation and Persian type roles. P1 — one intermediate
surface register; the Awards page's tablet/mobile collapse to pure text. P2 — page-specific
items in section K. Nothing in this audit requires changing the site's composition, palette,
grid, imagery or interaction model.

---

## B. CURRENT DESIGN DNA — WHAT MAKES IT DISTINCTIVE

Measured, not assumed. These behaviours are why the site reads as a serious studio site:

**The shared-element image journey.** One fixed stage element plays three spatial roles —
hero visual, studio object, project stage — with no second image and no cross-fade. On the
homepage it survives from the hero into the pinned project sequence; `sharedFrom` /
`captureProjectVisual` appear 14 times across Projects, Expertise, Awards and Journal. This is
the site's strongest single idea and the hardest to rebuild if broken.

**Scroll as narrative, not as trigger.** The homepage uses genuine scroll-progress scrubbing
(`prog()`), not fire-once reveals. Elements move *with* the scroll rather than being
animated *by* it. Eight `requestTick()` schedulers drive this on demand and settle to idle.

**The 3×3 coordinate as a state indicator.** The logo's grid is used as an interface
mechanism — a turquoise module travelling between coordinates to signal the active expertise,
milestone or inquiry type. Brand geometry doing UI work, not decoration.

**Editorial asymmetry with intentional empty columns.** Hero lines at columns 1–8 / 3–10 /
5–12; index registers at 1–6 with the preview at 8–12. The empty columns are compositional.

**Two grounds, hard contrast.** Warm canvas and near-black ink, with turquoise strictly
rationed to state and accent. 33 canvas / 29 ink / 39 grey surface declarations.

**Language-composed, not mirrored.** Persian and English resolve different grid placements,
different line breaks and different measures (38ch vs 58–62ch) — genuinely composed per
language, with LTR islands preserved for years, counters and Latin names.

**Fine-line UI.** Hairline rules, 7–10px turquoise squares, no cards, no shadows, no radii.

---

## C. MOTION AUDIT

### C.1 Inventory — what actually exists

| Family | Mechanism | Where | Verdict |
|---|---|---|---|
| Mask reveal | `clip-path` on an overlay, image settles `scale(1.05→1)` | Projects, About, Journal | **KEEP** — the core reveal |
| Keyframe line-up | `@keyframes *-lineup`, `clip-path:inset(0 0 105% 0)` | Homepage, Expertise, Awards, About | **MERGE** into mask reveal |
| Clip-up fact | numerals clip from below + 12px lift | Projects, About | **KEEP** — distinct purpose |
| Word opacity | 17%→100% per word on scroll | Homepage studio only | **KEEP** — deliberately singular |
| Scroll scrub | `prog()` drives transform continuously | Homepage | **KEEP** — signature |
| Sticky stage | pinned composition, content passes | all 8 pages | **KEEP** |
| Shared element | capture → expand → hand off | 5 pages | **KEEP** — signature |
| Counter clip | vertical clipped numeral exchange | Homepage, Projects, Expertise | **KEEP** |
| Diagonal wipe | `polygon()` sweep as scene transition | Homepage Philosophy→Research | **KEEP** — once only, correctly |
| Cursor lag | interpolated follow, fine pointer only | 6 pages | **KEEP** |
| Hover lift | `translateY(-3px)` + square fade | nav, all pages | **UNIFY** — see C.3 |
| Arrow slide | 8px line translation | all pages | **KEEP** |

**There are no redundant motion families.** Every pattern has a distinct visual purpose.
The one genuine duplication is *keyframe line-up vs mask reveal* — both are "content clips
into view from an occluded state", implemented twice: once as CSS `@keyframes` for
first-paint, once as JS-driven `clip-path` for scroll. They should share one grammar.

### C.2 The real problem — duration sprawl

59 distinct durations. Distribution of the heavily-used values:

`240ms ×32` · `420ms ×57` · `620ms ×86` · `820ms ×30` · `1000ms ×20`

Those five carry the majority and are close to a clean scale. The tail is the problem:
`890/910/920/930/940/960/980ms` each appear once or twice — invisible individually,
collectively responsible for adjacent sections feeling independently tuned.

Note `620ms ×86` is the **most used duration on the site and is not a token.** It has become
the de-facto standard reveal while `--m-standard` is 420ms.

### C.3 Recommended consolidation — one grammar, five steps

Do not reduce the *number of motion families*. Reduce the number of *tempos*.

| Role | Token | Value | Curve |
|---|---|---|---|
| Interaction | `--m-instant` | 180ms | `--e-standard` |
| UI state | `--m-fast` | 240ms | `--e-standard` |
| Content settle | `--m-standard` | 420ms | `--e-enter` |
| Reveal | `--m-reveal` | 620ms | `--e-page` |
| Scene / shared element | `--m-slow` | 900ms | `--e-page` |

`--m-reveal:620ms` promotes the value the site already chose for itself. The 760–980ms tail
collapses into `--m-slow`. `--m-page:1000ms` stays for full-screen overlays only.

Target: **≥85% tokenised**, from 42% today. Four easing curves stay as they are — that part
of the system is already right. `cubic-bezier(.7,0,.84,0)` (2 uses, exit-only) can fold into
`--e-page`.

**Fatigue points** — where simultaneous motion is genuinely too dense:

- **Homepage hero:** three lines scrubbing at different lag multipliers *plus* stage clip
  *plus* image scale *plus* rail square *plus* numeral counter — five concurrent channels.
  Reducing to three (type, image, one indicator) would lose nothing legible.
- **Projects detail:** mask reveals and fact clip-ups can trigger within the same viewport.
  A shared observer with a small stagger would read as one system rather than two.

Everything else is within budget.

---

## D. WHITESPACE / SURFACE AUDIT

### D.1 Whitespace that is working — protect it

Do not touch these. The emptiness is the composition:

- **Homepage hero** — empty columns 9–12 beside line 1 are what make the type read as
  architecture rather than as a banner.
- **Homepage studio** — the 3-column supporting paragraph against 9 empty columns is the
  scale contrast that sells the statement.
- **Projects archive opening** — oversized PROJECTS with the count floated right; the gap
  *is* the catalogue gesture.
- **Contact opening** — deliberately quiet before the inquiry index. Filling this would make
  the page feel like a form.
- **Expertise "Between disciplines"** — the 3×3 field with connector lines already carries
  its own structure.
- **All eight homepage scene transitions** — the pacing between scenes depends on release.

### D.2 Surfaces that are genuinely unfinished

The site has **two grounds and no middle register**: warm canvas `#FAF9F7` and ink
`#121B1B`. `--grey` and `--turq-pale` exist but are used for image plates and small
state fills, never as section grounds. Every text-only section therefore sits on the same
flat canvas as every image section. Where a text section *follows* an image-led section, the
drop in visual density reads as an unfinished surface rather than as intentional quiet.

Sections meeting that condition, in priority order:

| Page | Section | Why it goes slack |
|---|---|---|
| Awards | **whole page** | 3 sections, zero imagery. On tablet/mobile the shared preview is hidden entirely, leaving a pure text list on flat canvas — the weakest surface on the site |
| Projects detail | Project information → Facts → Quote → Services | four consecutive text-only sections after a media-rich sequence |
| Expertise detail | Approach → Capabilities | two text sections between hero media and process media |
| About | The practice · Thinking | text islands between the studio image and history media |
| Contact | Studio information → Other pathways → footer | three text sections closing the site |
| Journal | Lead · Share | short text bands inside a media-led article |

### D.3 Proposed V2 surface vocabulary

Derived from what the project already contains — no new colour is invented:

**Surface 0 — Canvas.** `#FAF9F7`. Default. Unchanged.

**Surface 1 — Tonal canvas.** A near-imperceptible warm step down from canvas, drawn from
the existing `--grey` `#E8E8E4` at very low mix. Purpose: let a text-only section read as
a *deliberate different ground* rather than as the same ground with less on it. This single
addition addresses most of D.2 — no geometry, no gradient, no pattern.

**Surface 2 — Grid field.** The existing hairline 12-column field already used in the
homepage hero, held at very low opacity, applied *only* where a section's content is a
register or index (Awards rows, Expertise capabilities). The grid is already part of the
language; this extends it to sections that currently have no spatial anchor.

**Surface 3 — Ink.** `#121B1B`. Philosophy, menu. Unchanged.

**Surface 4 — Image / immersive.** Unchanged.

Rules: one surface per section, never two devices on the same surface, and any section that
already carries imagery or geometry stays on Surface 0. **Estimated application: 6–8 sections
site-wide**, not every text section.

Explicitly rejected: atmospheric gradients (foreign to a palette built on two flat grounds),
soft shadows (the site has none by design), material textures, decorative logo patterns,
edge vignettes.

---

## E. PERSIAN / RTL AUDIT

### E.1 The structural finding

Persian has **no type system**. It has per-component decisions:

- **35 distinct paired line-height / metric ternaries** (`fa ? "1.5" : "1.04"`)
- **20 paired `clamp()` size decisions**
- Persian `font-weight` resolves to **only 500 or 600** — 31 and 14 occurrences. There is
  **no Persian display weight anywhere on the site.**

English display type earns authority through scale *and* weight contrast across the
hierarchy. Persian receives the same mid-weight at hero, section title, card title and
navigation. That is the mechanism behind Persian reading as lighter and less confident — not
the typeface, and not letter-spacing.

Tracking is already handled correctly: **1 non-zero letter-spacing across 227 Persian spans.**
Measure is already differentiated (38ch Persian vs 58–62ch English). Line-height is already
raised for Persian (1.5–2.0 vs 0.98–1.62). The foundations are right; the system is missing.

### E.2 Recommended V2 approach — roles, not sweeps

Replace the 55 scattered decisions with **semantic Persian type roles**, each carrying size,
line-height and weight together:

| Role | Applies to |
|---|---|
| `fa-display` | hero, philosophy, CTA statements |
| `fa-title` | section titles, project titles |
| `fa-subtitle` | card titles, expertise items, award names |
| `fa-lead` | propositions, standfirsts |
| `fa-body` | paragraphs, descriptions |
| `fa-ui` | navigation, buttons, filters |
| `fa-meta` | metadata, counters, captions |

Each role resolves per language, so a component asks for a *role* rather than re-deciding
Persian metrics inline. Weight differentiation across roles is what gives Persian display
type parity with English — approached as hierarchy, not as a global weight increase.

**A prior attempt at this failed and is instructive.** A weight sweep applying fixed
`font-variation-settings` per role was implemented and rolled back at your request. The
lesson: Persian parity must come from the *role system with per-component judgement*, not from
a numeric weight table applied globally. V2 should build the roles and tune them
component-by-component against real Persian strings.

### E.3 Specific Persian issues found

- **Long titles are under-tested.** "مجموعه مسکونی تراس‌های شمالی و باغ‌های پیوسته" exists as
  a deliberate stress-test record; the compact index column previously overflowed with a full
  Persian location string and was fixed by introducing `locationShort`. Other compact
  surfaces have not had the same treatment.
- **Uppercase-derived metadata.** Persian metadata inherits styles whose identity in English
  comes from `text-transform:uppercase` + tracking. Persian has no uppercase, so those
  labels lose their differentiation from body text. Persian metadata needs its own
  differentiator — weight or colour, not tracking.
- **Numerals are correct — leave them.** Persian numerals are formatted through `faNum()`
  with LTR islands preserved for years, areas, counters and measurements. No global numeral
  conversion should be introduced.
- **Mixed strings are correct — leave them.** Latin substrings inside Persian content
  deliberately fall through to the English stack.

---

## F. TYPOGRAPHY AUDIT

**English.** Schibsted Grotesk 400/500/600/700, Google Fonts. Display `clamp(62px,9.4vw,164px)`
down to 10.5px metadata. Negative tracking on display (−.05em to −.02em), positive on
uppercase metadata (.1em–.14em). Weight 500 for display, 400 body. **This system is coherent —
leave it alone.**

**Persian.** Vazirmatn 300/400/500/700. Display `clamp(52px,7.6vw,132px)`, tracking 0,
line-height 1.3–2.0. As E.1 establishes, the values are individually reasonable but not
systematised.

**Inconsistencies found:** the same conceptual role is expressed with different clamp values
across pages — e.g. section titles appear as `clamp(34px,3.4vw,58px)`,
`clamp(28px,2.6vw,42px)` and `clamp(26px,2.4vw,38px)` on different pages. Some of that is
intentional page character; some is drift. V2 should name the roles first, then decide which
variations are deliberate.

**Do not change any font size in V2 without first assigning the semantic role.**

---

## G. GRID & LAYOUT AUDIT

**Declared system.** 12 columns desktop, conceptual 8 at tablet, 4 at mobile.
Margins `--marg` 40px desktop stepping down responsively; `--gap` 24px.

**Intentional asymmetry — protect.** Hero 1–8 / 3–10 / 5–12. Index register 1–6 with preview
8–12. Studio statement 1–7 with body 1–3. Project stage text 1–4 against a 66vw image.
Journal featured media/text split. These are the site's compositional signature.

**Accidental inconsistency — candidates for V2.**
- Section label columns vary between `1 / span 2` and `1 / span 3` for the same role.
- Related-item layouts use per-page layout maps (`WORK_LAYOUT`, `REL_LAYOUT`, `VIS`)
  with overlapping intent.
- `responsive.css` still carries string-matched fallbacks such as
  `[style*="grid-column"]` alongside the semantic `data-r-layout` hooks. Both work; the
  duplication is a maintenance risk, not a visual one.

**RTL.** Grid placement is resolved per language in `applyLang()` on every page rather than
by logical properties — verbose but deliberate, and it produces genuinely composed Persian
layouts. **Keep the approach**; consider extracting the repeated placement tables.

---

## H. SPACING AUDIT

Section rhythm runs on viewport units — `14vh`, `16vh`, `18vh`, `20vh` between sections,
`8vh`–`12vh` within. Homepage scene heights are content-derived (`250vh` hero,
`470vh` projects, `310vh` expertise).

**Finding:** spacing is *consistent in character* but *not named*. There is no
`--space-section` / `--space-block` vocabulary, so the same relationship is expressed as
`14vh` on one page and `16vh` on another. As with typography, V2 should name the roles
before adjusting any value.

**Do not compress.** The large spatial intervals are brand, not waste. The one exception:
Persian sections occasionally inherit English spacing that was tuned against tighter English
line-heights, leaving slightly slack blocks — a Persian-specific adjustment, not a global one.

---

## I. BRAND DNA / PATTERN AUDIT

**Working well.** The 3×3 module as an active state indicator (expertise coordinates, history
milestones, contact inquiry types). Hairline grid field in the hero. The single diagonal wipe
at Philosophy→Research — used exactly once, which is why it lands. Turquoise strictly rationed.

**Underused.** The grid field appears only in the homepage hero. It is the most natural
device for the text-only registers identified in D.2 (Awards rows, capabilities) and is
already part of the language.

**Not overused anywhere.** The restraint is correct — no section is pattern-heavy.

**Rule for V2:** brand geometry should keep doing *interface* work. Any new application must
carry meaning (state, structure, register) rather than fill space.

---

## J. COMPONENT INVENTORY

| Component | RTL | Motion | Verdict |
|---|---|---|---|
| Header | composed | compact-on-scroll, dark/light adapt | **KEEP** |
| Fullscreen menu | composed | clip + stagger | **KEEP** |
| Language switch | LTR island | opacity | **KEEP** |
| Section label | inherits EN tracking | none | **REFINE** — Persian differentiator |
| Project card | composed | hover scale 1.02 + square | **KEEP** |
| Index register | composed | shared preview | **KEEP** |
| Shared image stage | not mirrored | scrub + capture | **KEEP** — signature |
| Project hero | composed | parallax + theme-aware header | **KEEP** |
| Story blocks | composed | mask reveal | **KEEP** |
| Sticky narrative | composed | sticky + counter | **KEEP** |
| Drawings | LTR canvas | clip reveal | **KEEP** |
| Information table | composed | none | **REFINE** — surface anchor |
| Facts | LTR numerals | clip-up | **KEEP** |
| Quote | composed | none | **REFINE** — surface anchor |
| Expertise index | composed | shared field + 3×3 | **KEEP** |
| Capabilities | composed | hover note reveal | **REFINE** — surface + Persian weight |
| Award rows | composed | hover preview | **REFINE** — see K |
| Journal cards | composed | hover + title continuity | **KEEP** |
| Contact form | composed | field clip-in | **KEEP** |
| Viewer | localised | fade | **KEEP** |
| Footer | composed | none | **REFINE** — closing surface |
| Media resolver | n/a | n/a | **KEEP** |
| Progress rail | side-swaps | scrub | **UNIFY** — duration only |

**16 KEEP · 7 REFINE · 0 REVISIT.** No component needs redesign.

---

## K. PAGE-BY-PAGE FINDINGS

**Design System** — internal reference plus Responsive and Content QA panels. *Must not
change:* the QA panels are the project's validation surface. V2 adds documentation of the new
token scales here first. **P0.**

**Homepage** — 8 scenes, strongest page. *Protect:* shared image journey, scroll scrubbing,
word reveal, diagonal wipe, four-project pinned sequence, mobile project chapters.
*V2:* duration consolidation; reduce hero's five concurrent channels to three. **P1.**

**Projects archive** — index and visual modes, filter layer. *Protect:* single shared preview,
asymmetric visual rhythm. *V2:* surface anchor for the index register. **P2.**

**Project detail** — richest template. *Protect:* content-aware module omission, shared entry.
*V2:* the four consecutive text-only sections (D.2). **P1.**

**Expertise overview** — *Protect:* 3×3 coordinate logic, conceptual media field, intersection
grid. *V2:* Persian index weight. **P2.**

**Expertise detail** — *Protect:* type-led hero deliberately inverted from Project hero.
*V2:* Approach/Capabilities surface; Persian capability hierarchy. **P2.**

**Awards** — **weakest surface on the site. P1.** Three text-only sections; on tablet and
mobile the shared preview is hidden, leaving a pure list on flat canvas. Sticky years provide
the only structure. *V2:* grid-field surface (Surface 2) and a Persian metadata differentiator.
*Protect:* archive-first character — do not add thumbnails to every row.

**About** — *Protect:* sticky oversized year with 3×3 travel, one shared portrait stage,
scale contrast. *V2:* "The practice" and "Thinking" surfaces. **P2.**

**Journal** — *Protect:* featured composition, text-only entries as valid editorial state,
title-continuity transition. *V2:* Lead and Share bands. **P3.**

**Contact** — *Protect:* intent-before-fields, editorial form styling, 3×3 as the single brand
moment, quiet opening. *V2:* closing three sections. **P2.**

---

## L. RESPONSIVE FINDINGS

Foundation is sound: central `TA_LAYOUT` detection, `compactInteraction` combining coarse
pointer with short viewport, semantic `data-r-layout` hooks, event-driven scheduling with no
polling, idle when the user is idle.

**Findings.**
- **Awards tablet/mobile** — preview hidden below 834px leaves the text-only weakness of K.
  The most acute responsive issue on the site. **P1.**
- **Homepage mobile** — four natural project chapters replace the pinned stage. Correct.
- **Tablet** — real 8-column compositions exist; some sections still resolve 12-column
  fragments at 834px. **P2.**
- **Persian mobile** — long Persian titles in compact surfaces need the `locationShort`
  treatment extended. **P2.**
- **No hover-only information** anywhere — verified.

---

## M. REDUCED MOTION FINDINGS

Already compliant: reduced motion is a first-class state, not an afterthought. Shared
transitions become direct navigation; masks become short opacity; scrub becomes static;
cursor and 3×3 travel disable; parallax disables. A runtime toggle exists on every page for QA.

**V2 requirement:** every new surface device (Surface 1 and 2) must be **static by
definition** — no animated gradients, no drifting grids. If a device needs motion to work, it
is the wrong device.

---

## N. PERFORMANCE / COMPLEXITY FINDINGS

Documented only — no refactor proposed.

- **475 hard-coded `ms` literals** across 8 pages. Same values re-typed per component.
- **`applyLang()` duplicated 8×** with near-identical placement tables.
- **`responsive.css` carries both** semantic hooks and string-matched fallbacks.
- **Reveal logic implemented twice** — CSS keyframes for first paint, JS `clip-path` for
  scroll. Merging into one grammar (C.3) would remove the duplication.
- **No `IntersectionObserver`** anywhere; one-time reveals are scanned per tick. Working and
  idle-safe, but Observer would suit the reveal family.
- **Keyed `bindOnce`** is correct and should not be reopened.

---

## O. V2 MODERNITY PRESERVATION RULES

**A protection checklist. Any V2 change that violates one of these is wrong, regardless of
how much more "coherent" it makes the system.**

1. **The shared image journey must survive.** One image object, three spatial roles, no
   cross-fade, no second element. If a motion consolidation breaks the hero→studio→project
   hand-off, the consolidation is wrong.
2. **Scroll must keep scrubbing.** Homepage motion is driven by scroll *position*, not by
   fire-once triggers. Do not convert scrub to reveal in the name of fewer motion types.
3. **Asymmetry stays.** Empty columns are composition. Do not centre, do not normalise the
   hero offsets, do not equalise the index/preview split.
4. **Two grounds stay dominant.** Surface 1 and 2 are *accents on specific sections*, not a
   new default. If more than about eight sections leave Surface 0, the palette has drifted.
5. **Turquoise stays rationed.** State, accent, small geometry. Never a surface, never a
   gradient, never a large field.
6. **No cards, no radii, no shadows, no glass.** Hairlines and type only. This is the single
   easiest rule to violate while "enriching empty surfaces".
7. **Type keeps its scale contrast.** Display type is genuinely oversized against 11px
   metadata. Do not compress the range to make sections feel fuller.
8. **Brand geometry keeps doing interface work.** The 3×3 indicates state. Never decorative.
9. **The diagonal stays singular.** Once, at Philosophy→Research. A second one destroys the
   first.
10. **Persian stays composed, not mirrored.** Different grid placements, different line
    breaks, different measure, LTR islands intact. Never resolve Persian by flipping English.
11. **Reduced motion stays first-class.** Every new device static by definition.
12. **Content-aware omission stays.** A module with no data does not render — no empty
    states, no placeholder plates in real records.
13. **Whitespace is not the problem.** Any intervention must answer "why does this surface
    need another layer" — if there is no answer, leave it.

---

## P. PROPOSED DESIGN SYSTEM V2 SCOPE

**In scope.**

1. **Motion token scale** — five durations, four curves, ≥85% tokenised (C.3).
2. **Reveal grammar merge** — one clip-based reveal family serving both first-paint and
   scroll.
3. **Persian semantic type roles** — seven roles replacing 55 inline decisions (E.2).
4. **Surface vocabulary** — Surfaces 0–4, with 1 and 2 newly defined (D.3).
5. **Spacing role names** — name the existing rhythm before adjusting any value (H).
6. **Section-label Persian differentiator** (E.3).
7. **Targeted surface application** — the 6–8 sections in D.2, Awards first.
8. **Documentation in the Design System page** — new scales visible in the internal reference.

**Explicitly out of scope.**

- Any change to composition, grid placement or imagery.
- Any change to the palette, or any new colour.
- Any change to English typography.
- Any new motion family, page transition or hover effect.
- Any change to the content architecture, canonical data or media resolver.
- Any change to the responsive breakpoint system or interaction model.
- Any font change in either language.
- Any technical refactor of `applyLang()` or `responsive.css` fallbacks — documented in
  N as opportunities, not V2 work.

---

## Q. PROPOSED MIGRATION ORDER

The brief's order is sound with one amendment: **Awards should move earlier**, because it is
both the weakest surface and the smallest page — making it the ideal first real test of the
surface vocabulary.

| Phase | Work | Priority |
|---|---|---|
| 1 | **Design System V2** — motion tokens, Persian roles, surface vocabulary, spacing names, documented in the internal reference | P0 |
| 2 | **Awards V2** — first application of Surface 2 and Persian metadata roles; smallest page, weakest surface, fastest verification | P1 |
| 3 | **Homepage V2** — duration consolidation, hero channel reduction; highest risk, so second only after the system is proven on Awards | P1 |
| 4 | **Projects V2** — archive surface anchor, four text-only detail sections | P1 |
| 5 | **Expertise V2** — Approach/Capabilities surface, Persian index hierarchy | P2 |
| 6 | **About V2** — two text islands | P2 |
| 7 | **Contact V2** — closing three sections | P2 |
| 8 | **Journal V2** — Lead and Share bands | P3 |

After each phase: verify both languages at 1440 and 390, confirm reduced motion, and confirm
the section's before/after composition is unchanged.

---

## R. RISKS

**What could accidentally make V2 worse.**

1. **Filling whitespace because the brief mentions empty space.** The greatest risk in this
   project. Most of the whitespace is the design. Six to eight sections need a surface; the
   rest need nothing.
2. **Flattening motion to unify it.** The goal is fewer *tempos*, not fewer *families*. If
   V2 removes the scroll scrub, the shared element or the word reveal, it has removed the
   reasons the site is distinctive.
3. **Solving Persian with a global weight number.** Already attempted and rolled back. Persian
   parity is a hierarchy problem — build roles, tune per component against real strings.
4. **Adding a second diagonal or a second strong device** to make a quiet section
   interesting.
5. **Letting Surface 1 become the new default.** Then the site has one ground again, just a
   greyer one.
6. **Touching English typography** while systematising Persian. English is coherent.
7. **Retuning durations by feel rather than by scale.** The fix is arithmetic; done by eye it
   just produces a different 59 values.
8. **Refactoring while redesigning.** The complexity notes in N are deliberately separate.
   Mixing them into V2 makes visual regressions impossible to attribute.
9. **Breaking the content architecture.** Canonical data, publish safety and the media
   resolver are settled. V2 is presentation only.
10. **Losing the Design System QA panels.** They are how every subsequent phase is verified.

**What must be protected during implementation.** Section O, in full, checked after every
phase.

---

## CURRENT STATE NOTE

One condition affects V2 verification. All 53 project images were deleted at your request, so
`assets/` is empty. The four project records are still marked `contentState:"real"` with
real client, team and award text, which means publish safety correctly returns
`missingRealMedia` and those projects render **blank image fields** rather than prototype
plates.

**Consequence for V2:** image-led sections cannot be visually verified in their intended
state, and the whitespace assessment in section D is based on the composition as authored
rather than as currently rendered. Before Phase 2 begins, either restore the photography or
revert those four records to prototype so the generated plates return. This audit's findings
are unaffected — they were measured from source geometry, not from the current render.

---

*End of Phase 0 audit. No project file was modified. Awaiting review before Phase 1.*
