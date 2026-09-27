# Homepage functional parity audit — 27 September 2026

> **Superseded, same day (cleanup pass 3).** The "Decision: NO" below was explicitly reversed by the user after every one of this audit's unconditional blockers (B1–B4) was fixed in `v2/pages/Homepage.dc.html`, and the reduced-motion blocker (B3) was resolved by removing that feature from the page rather than fixing it, per explicit product decision. All seven V2 pages' Home destination now points at `v2/pages/Homepage.dc.html`. See [REGRESSION_BASELINE.md](REGRESSION_BASELINE.md)'s "V1 relocation and Home-routing switch" addendum for what changed and the verification performed. The rest of this document is preserved as the historical evidence that justified the original "NO" — it is no longer the current decision, only the record of why one was needed.

**Decision: NO. Keep the six V2 pages' Home destinations unchanged.** V2 has the main content inventory and independent presentation infrastructure, but outgoing Persian detail links, drawer Home behavior, tracker state, and reduced-motion content access fail. This is an audit, not authorization to repair or reroute anything.

Contract: [REGRESSION_BASELINE.md](REGRESSION_BASELINE.md), including its final initial-language fix addendum. Earlier migration reviews are historical evidence, not proof of current behavior. References below are current source line numbers, re-verified 27 September 2026 against `v2/pages/Homepage.dc.html` (SHA-256 `b89a36f9fbab9c9e1cb828e2ba3a303e55cecdbc2ddc2fdd19bbc80c173a5824`, unchanged from the initial audit and matching [REGRESSION_BASELINE.md](REGRESSION_BASELINE.md)'s post-fix anchor) and `Homepage.dc.html` (SHA-256 `b45a411154246998737d4e8c38e3e1c70e296a08cb6f9b0fa193c688e3fffb70`, unchanged). The §4 dependency-table line citations for the six sibling V2 files were independently re-checked and are accurate as written; only the in-file Homepage.dc.html line numbers in the blockers table (§3) needed correction, applied above — the underlying bug mechanics were unaffected.

## 1. Functional/content inventory

Both pages contain eight sections, in this order. Neither has a Journal article feed; both expose Journal through navigation/footer. Absence of a Journal feed is not a parity gap.

| Section | V1 inventory | V2 inventory / difference classification |
| --- | --- | --- |
| Hero | Three-line bilingual statement, practice/location placeholder, scene number, scroll indicator; first project's shared media journey | Same content roles. V2 HeaderNav, type, media composition and scroll formulas: **INTENTIONAL V2 DESIGN DIFFERENCE**. Intro morph loader omitted: **LEGACY V1 BEHAVIOR NOT REQUIRED**. |
| Studio | Bilingual studio statement, word reveal, placeholder team/city paragraph, “About the studio” CTA | Same statement and placeholders. Both CTAs actually target `#projects`, not About: inherited **BUG**, not a new V2 regression; correct destination/copy needs a content decision. About remains accessible in navigation. |
| Selected projects | Four ordered canonical projects; proposition, project number/title, location/year, discipline, counter/dots, archive CTA, desktop stage and mobile chapters | Same four records: `project-001` IKIA Airport Hotel, `project-002` Future Courtyard, `project-003` Grand Hotel Tehran, `project-004` Dariush Hotel Kish. Desktop retains identity/discipline. V2 mobile markup renders proposition and location/year, but omits the computed `ch.title` and discipline: **PARITY GAP** in project identification. Detail navigation remains available. Mobile archive CTA is absent locally, but available through HeaderNav/footer: **INTENTIONAL V2 DESIGN DIFFERENCE**. |
| Expertise | Five canonical disciplines; links, active register, associated media and motif; scroll/hover/focus state | Same five: architecture, interior architecture, urban design, engineering, sustainable design. Tracker integration is broken (B2). V2 crossfade instead of V1 clipping: **INTENTIONAL V2 DESIGN DIFFERENCE**. |
| Philosophy | “Space is not the result. It is the experience.”, media/frame, scene number, scroll transition | Same bilingual statement; uses first canonical project media. Different transition geometry is intentional; clipping required content in reduced motion is **BUG** (B3). |
| Research | “Thinking before form”; Density studies, Shade and thermal comfort, Brick/tile/reuse, Modular assembly; placeholder drawing, three annotations, Material/Model/Detail plates | Same subjects and drawing content. Buttons replace V1's misleading `#projects` links: **INTENTIONAL V2 DESIGN DIFFERENCE**; their old jump is **LEGACY V1 BEHAVIOR NOT REQUIRED**. Automatic active state is broken (B2). |
| Recognition | Three `TA_AWARDS.homepage()` records; year, bilingual award name, subject “Studio recognition”; Awards links | Same records: `a19-uk`, `a15-sbid`, `a15-mena`. Category replaces studio/project subject: **INTENTIONAL V2 DESIGN DIFFERENCE** for today's studio-level records. Category stays English in FA despite available canonical translations: **PARITY GAP** (B5). |
| Contact + footer | Three-line closing statement, conversation CTA, responsive square/diagonal; Studio/Index/Social columns, placeholders, brand/legal line, footer EN/FA controls | Same closing copy, index and placeholders. V2 retains language controls in HeaderNav but omits their footer duplicate: **INTENTIONAL V2 DESIGN DIFFERENCE**. Contact departure settle is omitted: **LEGACY V1 BEHAVIOR NOT REQUIRED**. |

Shared placeholder content: `[TEAM SIZE]`, `[CITY]`, `[EMAIL]`, `[PHONE]`, `[OFFICE]`, working drawing, and “© 2026 — Placeholder legal.” Instagram/LinkedIn both point to `#contact`, not social profiles. These are **EXISTING CONTENT/ASSET ISSUE** items, not newly missing V1 functionality. Whether to replace them with existing shared About/Contact information before launch is **NEEDS DECISION**; inventing values is unnecessary.

## 2. Complete navigation map

Paths in this table are relative to each Homepage. V1 destinations resolve at root; V2 destinations resolve under `v2/pages/`.

| Surface | V1 | V2 / outcome |
| --- | --- | --- |
| Brand / drawer Home | `#top`; drawer calls `closeMenu` | Brand `#`; drawer `#` in EN and **`##lang=fa` in FA**. Drawer Home does not close/unlock (B4). |
| Header and drawer Projects | `#projects` | `Projects.dc.html` with optional `#lang=fa`; intentional archive destination. |
| Header/drawer Expertise, Awards, About, Journal, Contact | Corresponding root `*.dc.html`, optional `#lang=fa` | Corresponding sibling V2 `*.dc.html`, optional `#lang=fa`; correct. |
| Studio CTA | `#projects` | `#projects`; inherited label/destination mismatch. |
| Desktop project / shared project media | V1 expansion then `Projects.dc.html#p=<index>`; optional `&lang=fa` | Active desktop stage goes directly to sibling `Projects.dc.html#p=<canonical index>`; optional `&lang=fa`, correct. Fixed journey media is decorative/non-clickable; project access remains in Selected Projects. |
| Mobile project chapters | Expansion then detail with `&lang=fa` | `Projects.dc.html#p=<index>` in EN; **`#p=<index>#lang=fa` in FA**, losing language (B1). |
| All projects | Archive callback uses `Projects.dc.html#from=home`, optional `&lang=fa` | `Projects.dc.html`, optional `#lang=fa`; removal of V1 arrival choreography is **LEGACY V1 BEHAVIOR NOT REQUIRED**. |
| Five expertise rows | `Expertise.dc.html#expertise=<slug>`, optional `&lang=fa` | Same in EN; **`#expertise=<slug>#lang=fa` in FA**, losing both discipline selection and language (B1). |
| Research items | `#projects` | State buttons; no navigation. |
| Three recognition rows | Awards archive | Awards archive for all current records. Conditional project-detail branch uses canonical index and correct `&lang=fa`, but no current homepage award has `projectId`; historical `#p=4` evidence is not current content. |
| Conversation CTA | `Contact.dc.html#from=home`, optional `&lang=fa` | `Contact.dc.html`, optional `#lang=fa`; working general inquiry entry. No preselected intent was lost. |
| Footer Index | Projects `#projects`; Expertise/Awards/About/Journal pages | Sibling Projects/Expertise/Awards/About/Journal pages, optional `#lang=fa`. |
| Footer social labels | `#contact` twice | Same placeholders; no external social navigation. |

No direct V2 Homepage anchor resolves to a root/V1 page. No referenced sibling HTML destination was missing. Browser-loaded EN project indices 0–3 and all five EN discipline detail routes resolved to the expected headings. FA Awards/About/Journal/Contact destinations rendered RTL; correctly formed FA project/discipline routes also worked. This does not validate every interaction within those destination pages.

## 3. Concrete blockers and evidence

| ID / classification | Reproduction and source | Minimum acceptance condition before canonical routing |
| --- | --- | --- |
| B1 — **BUG** | V2 Homepage lines 424 and 497 concatenate `hsh` beginning with `#` after an existing detail hash. Chrome: `Projects.dc.html#p=0#lang=fa` opens the correct project in **EN/LTR**; `Expertise.dc.html#expertise=architecture#lang=fa` opens the **EN archive**. Correct `&lang=fa` controls open Persian details. | All five discipline links and four mobile project links preserve both selection and FA. Fixing outgoing link composition does not require URL synchronization or history redesign. |
| B2 — **BUG** | Homepage lines 316/320 store the tracker callback argument directly as the active index. `v2/runtime/section-tracker.js:100` supplies `{key,index,total,el,els}`. Homepage numeric comparisons therefore never select a row/layer. At 1440 and 390, after scrolling to Expertise, all five row opacities were `0.32`, all five media layers `0`, motif remained `5`; research had no automatic active highlight. Keyboard-focus probe did not restore the expertise state. | Consume valid tracker indices; demonstrate automatic reading-position selection and hover/focus override/release, including coarse-pointer use. Blank expertise media caused by opacity zero is distinct from missing image files. |
| B3 — **BUG** | Homepage `redStatic` (line 363) changes sticky wrappers to `position:static;height:auto` while content remains absolutely positioned. At 1440, system reduced motion and the manual toggle both yield **0px Hero and Projects wrapper heights**, while outer sections retain 2250px/4230px. Philosophy's reduced branch (lines 442–443) forces final wipe: `polygon(0% 0%,100% 0%,100% -50%,0% 40%)`; the statement lies outside the clipped region. At 390, mobile projects remain available but the Philosophy clip persists. V1 reduced-motion project wrapper remained 900px. | All eight sections, all projects and their links must remain readable/reachable with system reduction and manual reduction, in EN/FA at desktop/tablet/mobile. Static flow must provide a real content fallback. |
| B4 — **BUG** | Homepage drawer Home construction (line 504) produces `##lang=fa`. `HeaderNav.dc.html:53` has no same-document close handler. At 1440 and 390, opening the drawer then clicking Home left `aria-hidden=false` and `body.style.overflow=hidden`; Escape did close and unlock it. | Home returns to a usable page and closes/unlocks the drawer in EN/FA; use a valid same-document destination. No global hash/history policy change is needed. |
| B5 — **PARITY GAP** | Homepage line 476 uses `subject: a.cat` in both languages. FA renders English “Recognition” / “Best Hotel Design”; `awards-data.js` already exports Persian category labels. | Render canonical FA category labels, or retain a deliberately chosen translated subject. |
| B6 — **PARITY GAP** | Homepage mobile chapter markup (lines 136–141) omits project title and discipline that V1 mobile exposed. `projectChapters` still computes `title`. Browser confirmed only proposition/location/year in the visible mobile chapters. | Restore project identity/discipline access on the chapter, or explicitly approve their omission as editorial scope. Missing photographs make reliance on image recognition particularly ineffective. |

B1–B4 are unconditional functional blockers. B5–B6 are bounded content/language gaps requiring correction or an explicit content decision; no approval is assumed. Existing placeholders and media files are separate content readiness matters, not architecture regressions.

## 4. Data and architectural independence

| Module | V1 | V2 |
| --- | --- | --- |
| `projects-data.js` | `homepage()`, project media/metadata, detail identity | Same canonical records; `indexOf()` for detail routes. Desktop uses `homepage` media role; mobile uses `archive` role instead of V1's `homepage`: **INTENTIONAL V2 DESIGN DIFFERENCE**. |
| `expertise-data.js` | Taxonomy, titles, coordinates, associated media | Same taxonomy, `all()`, `bySlug()`, `selectedProjectIds`, `presentation.coord`. No copied taxonomy. |
| `awards-data.js` | `homepage()`, `project()` subject resolution | Same `homepage()` records; optional project resolution via projects API. Category translation is available but unused. |
| `site-data.js` | Loaded; page identity/legal copy remains local | Loaded; local brand duplicates canonical name and local year remains 2026 despite canonical copyright year being null. **NEEDS DECISION** about adopting canonical identity/legal fields. |
| `about-data.js` | Loaded; Home studio paragraph remains local | Loaded but not consumed by Home rendering. Canonical practice/foundation information already exists; no V1 Home company facts were lost. Placeholder replacement is **NEEDS DECISION**. |
| `journal-data.js` | Not loaded | Loaded but not consumed by Home rendering; no article section. Extra unused load, not content parity failure. |
| `contact-data.js` | Not loaded | Not loaded. Canonical email/phone/socials exist, while both footers retain placeholders. Its header explicitly anticipates later footer adoption. **NEEDS DECISION**, not grounds to duplicate data locally. |
| `media-utils.js` | Shared media resolution | Valid shared content/path helper; `TA_ASSET_BASE="../../"` resolves root assets. **SHARED ROOT DATA DEPENDENCY**, not V1 presentation. |

Home editorial statements, research labels/diagram and footer placeholders are page-local in both versions; V2 copies that authored content, not the canonical project datasets. No stale project/award selection was found: both browser inventories had the same four project IDs and three award IDs.

V1 uses root `support.js`, `responsive.css`, `layout-mode.js` and substantial inline presentation/event logic. V2 uses `v2/pages/support.js`, `v2/components/HeaderNav.dc.html` and its component-local support bundle, three V2 design-system stylesheets, and V2 runtimes: bidi, scroll-coordinator, layout-mode, ambient, reveal, ui-strings, motif, cursor, section-tracker. **No V1 presentation CSS/runtime/page is imported by V2 Homepage.** Identical generated support bundle bytes do not constitute a runtime import of V1. Root assets and shared data/helper imports are valid.

All reachable V2→V1 Home dependencies are listed below. These are **NEEDS DECISION** compatibility routes and indirect exits from the V2 journey; they are not dependencies required to render Homepage itself.

| File under `v2/pages/` | Current root Home source references |
| --- | --- |
| `Projects.dc.html` | Drawer line 688; `hrefHome` line 814 |
| `Expertise.dc.html` | Drawer line 498; `hrefHome` line 610 |
| `Awards.dc.html` | `hrefHome` line 315; drawer reuses nav and has no separate Home item |
| `About.dc.html` | `hrefHome` line 331; no separate literal Home drawer reference |
| `Journal.dc.html` | `hrefHome` line 556; drawer line 561 |
| `Contact.dc.html` | Drawer line 475; `hrefHome` line 481 |

Thus there are **six files / six header references, plus four drawer references**, not merely six total string replacements. Each constructs `V1 + "Homepage.dc.html"` with `V1="../../"`, preserving FA through `hsh`. Browser destination probes confirmed root Home links. These are the exact eventual route-change files, but **none is cleared for change by this audit**.

## 5. Browser verification and interaction health

Fresh Chrome 154.0.8037.58, temporary HTTP server at repository root, 900px viewport height. Both versions tested at 1440, 768 and 390 CSS pixels in fresh EN and fresh FA (12 loads), with scroll samples through content. Additional isolated tabs tested reload/language controls, drawer, detail routes and reduced motion. Probe scripts/results live only in OS temporary storage; no screenshots or generated repository artifacts were needed.

| Check | Result |
| --- | --- |
| V2 default / fresh FA / reload FA | **PASS at all three widths**: default EN/LTR; fresh and reloaded `#lang=fa` FA/RTL. The recent fix is intact. |
| Manual EN→FA and FA→EN | **PASS at all three widths**; brand, page copy, navigation and menu/close labels change. Existing hash stays unchanged; this audit neither treats URL synchronization as required nor implements it. |
| V1 language comparison | Fresh EN/FA content rendered at all three widths. V1 detail-link assembly preserves `&lang=fa`, exposing B1 as a V2 regression. |
| Responsive structure | Both versions: no document-level horizontal overflow; section text-range probes found no text outside the viewport. V2 tablet/mobile sticky wrappers become static and all four mobile project chapters render. These measurements do not prove full usability. |
| Narrow layout observations | At 390 V2 award-name/category columns are only about 24px wide, causing extreme wrapping; no measured content loss. **NEEDS DECISION** for readability, not automatically a parity failure. Mobile project section retains a 4230px height with roughly 2500px of content: excess whitespace, not blocked access. |
| HeaderNav menu | Open/Escape, translated labels, scroll lock/unlock pass. Home-click close fails (B4). Full keyboard focus-trap and assistive-technology behavior are not certified. |
| Scroll/reveal | `TA_SCROLL` exists; scrolling changes scene/project progress. Revealed media count increased from 1 to 11 in desktop sample. V1's custom scheduler/reveal replacement is intentional. Fast/reverse-scroll stress and frame-level choreography are not certified. |
| Tracker/motif | Shared runtimes load and motif cells render; automatic expertise/research ownership fails (B2). Different decorative motif path is intentional; invalid active state is not. |
| Ambient | V2 runtime loads and section zone annotations exist; Home has no opted-in ambient field element. V1 did not import ambient runtime either. No required content/action depends on an ambient effect. |
| Cursor | Shared V2 runtime and action targets present; source gates by fine pointer/reduced motion and sets `pointer-events:none`. Replacement of V1 cursor is intentional. Precise pointer animation and physical touch behavior were not verified. |
| Media | V2 uses CSS-background media and its own page transitions; no V1 expansion runtime dependency. Missing project photographs remain baseline asset issues. No required media playback control exists on either Home. |
| Reduced motion | System reduction and manual override tested at 1440/390; both expose B3. Manual label changes correctly. No claim that reduced-motion parity passes. |
| Runtime / requests | No `Runtime.exceptionThrown` in the sampled Home loads/interactions. No observed missing script/style dependency or new network failure. Same eight project-image 404 paths as baseline; `/favicon.ico` also 404, separately a browser-requested site-icon issue. No architecture regression inferred from those assets. |

DOM/style/routing measurements establish the blockers above; this is not pixel parity certification, a physical touch test, or a complete accessibility audit. Intentional design and animation differences were not used to reject canonical readiness.

## 6. Outcome and preservation

V2 is structurally independent and substantially content-complete, but **not functionally ready for canonical Home routing**. Resolve B1–B4, settle B5–B6, then repeat the affected navigation, language, tracker and reduced-motion checks while preserving fresh `#lang=fa` loading. Asset/content publication decisions remain separate.

Only this documentation file was added. No application source, route, data, asset, upload, or support bundle was changed. A before/after SHA-256 inventory of every file outside `docs/` verifies preservation; temporary server/browser/probe files were outside the repository. URL synchronization, hash routing ownership and Back/Forward language behavior remain untouched and outside this phase.
