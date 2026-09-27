# Regression baseline — 27 September 2026

This records the repository before architectural refactoring. Application, data, asset, and upload files were not changed. The checks below used Chrome 154 in headless mode against a temporary local HTTP server serving the repository root. Probe scripts and JSON results were kept outside the repository; this document is the durable record.

## Coverage and interpretation

All seven V2 pages and the seven V1 visitor pages (Homepage, Projects, Expertise, Awards, About, Journal, Contact) loaded in Chrome at 1440 × 900. The V2 pages were also probed at 768 × 900 and 390 × 900 in EN and FA, and at 390 × 844 with `prefers-reduced-motion: reduce`. V1 Design System and Canvas were not browser-tested. A `V1_BASELINE.json` fingerprint already exists; the SHA-256 list below captures the current files independently of that older fingerprint.

“Observed” below means measured in the browser. “Source contract” means confirmed from current files but not fully exercised. No pixel screenshots, assistive-technology session, touch device, or production host was used; visual parity and complete keyboard behavior are therefore not certified by this baseline.

## V2 route and rendering matrix

All seven default routes rendered a V2 shell and page content. Direct `#lang=fa` navigation rendered Persian text with `dir=rtl` on Projects, Expertise, Awards, About, Journal, and Contact. Direct `#lang=fa` on Homepage **remained English/LTR**; clicking its visible FA button changed it to RTL. This is an existing issue. In-page hash-only navigation during the first probe also left Awards, About, and Contact in EN; a fresh direct load of those same URLs rendered FA/RTL. Preserve this distinction in future tests.

| Page | Default route / observed state | Important direct states observed | Home destination |
| --- | --- | --- | --- |
| Homepage | `v2/pages/Homepage.dc.html`; V2 shell, EN/LTR, scroll-led home | `#lang=fa` stayed EN/LTR on fresh load; FA button switched to RTL | `#` in HeaderNav |
| Projects | `v2/pages/Projects.dc.html`; archive, EN/LTR | `#p=0` rendered the airport-hotel detail; `#p=0&lang=fa` rendered its Persian detail; `#expertise=architecture` rendered the archive filter route | `../../Homepage.dc.html` (+ `#lang=fa` in FA) |
| Expertise | `v2/pages/Expertise.dc.html`; overview, EN/LTR | `#expertise=architecture` rendered detail; `&lang=fa` rendered Persian detail | Same V1 destination |
| Awards | `v2/pages/Awards.dc.html`; archive, EN/LTR | Fresh `#lang=fa` rendered Persian/RTL | Same V1 destination |
| About | `v2/pages/About.dc.html`; studio page, EN/LTR | Fresh `#lang=fa` rendered Persian/RTL | Same V1 destination |
| Journal | `v2/pages/Journal.dc.html`; archive, EN/LTR | `#article=courtyard-as-climate-infrastructure` rendered detail in EN; `&lang=fa` rendered Persian detail; an unknown article slug cleared the hash and returned to archive | Same V1 destination |
| Contact | `v2/pages/Contact.dc.html`; inquiry page, EN/LTR | `#intent=project` loaded; `#intent=project&lang=fa` rendered Persian/RTL | Same V1 destination |

The six V1 Home destinations were current behavior *at the time of this baseline* — **superseded by the cleanup-pass-3 addendum near the end of this document**, which switched all seven pages' Home destination to `v2/pages/Homepage.dc.html`. This table is left as the historical pre-change record. Header and page links otherwise point to sibling V2 pages in the inspected V2 page files. Hash state for Projects, Expertise, Journal, and Contact is page-owned; route parsing and mutation are not centralized. Other interactive states (filter combinations, detail next/previous, every Contact intent, and form submission) remain untested in a browser.

## Interaction and layout observations

| Contract | Evidence and current expected behavior | Limit |
| --- | --- | --- |
| HeaderNav | The same `v2/components/HeaderNav.dc.html` is imported by all seven pages. On Journal, menu trigger changed `aria-expanded` false → true; the dialog changed `aria-hidden` true → false, body overflow became `hidden`; Escape restored the closed state and overflow. The six pages’ Home destinations above come from their page props. | Full focus trap, focus restoration, touch menu, and all seven menu instances were not exercised. |
| Responsive layout | All seven V2 pages rendered at 1440, 768, and 390 CSS-pixel widths. `documentElement.scrollWidth` equalled `clientWidth` in every sampled EN viewport, including mobile; no document-level horizontal overflow was observed. | This is a structural viewport check, not a pixel or text-clipping comparison. |
| Scroll coordination | `window.TA_SCROLL` was present on every V2 page. Programmatic scrolling changed `scrollY` on Projects, Expertise, Homepage, Journal, About, and Awards. `v2/runtime/scroll-coordinator.js` is loaded before reveal and tracker scripts. | Subscription count, one-listener guarantee, timing, and every sticky scene were not instrumented. |
| Section Tracker | `window.TA_SECTION_TRACKER` was present on Homepage, Expertise, About, and Journal, matching their page imports; absent on Projects and Awards. Their source calls `.track()` for page-specific sections. | Active-section transitions were not conclusively measured; no claim of complete progression parity. |
| Cursor | V2 cursor runtime is imported by Homepage, Projects, Expertise, Awards, and Contact; targets with `data-v2-cursor` rendered. About has one cursor-marked target but does not import the cursor runtime; Journal likewise has a marked target without that import. This is the current contract to investigate before any cursor work. | Mouse movement, cursor labels, fine/coarse pointer switching, and touch behavior were not browser-verified. |
| Motif | All seven V2 pages rendered `data-grid-motif` elements and loaded `motif.js`; sampled cells were populated. | Interactive cell changes were not conclusively observed after scroll or hover. |
| Reveal and page entry | All seven pages loaded `reveal.js` and V2 base styles. Rendered elements carried `data-reveal`; several gained `data-reveal-state="revealed"` on initial load. The shared page-entry CSS defines `data-v2-rise` / `data-v2-in`. | Exact animation frames, timing, and off-screen reveal transitions were not captured. |
| Media handoff | Projects, Awards, and About import and call `TA_MEDIA_HANDOFF.mount()`. The shared root `media-utils.js` resolves V1/V2 content paths using `TA_ASSET_BASE`; all seven V2 pages set it before import. | Transition quality was not captured. Missing project files cause real network errors, so project-media continuity cannot be certified. |
| Reduced motion | All seven V2 pages loaded with the emulated reduced-motion preference. On six pages with a sampled `data-v2-rise` element, computed `animation-name` was `none`. Homepage had no sampled `data-v2-rise` element. | Remaining animations, media handoff, cursor, and continuous scroll response were not exhaustively measured. |
| Runtime/console | No `Runtime.exceptionThrown` event was observed in the sampled V1/V2 loads or direct detail-route loads. | This does not cover every interaction or every deferred callback. Network 404s are recorded below. |

## Existing missing references and errors

Static inspection found 91 unique explicit image references in the canonical data files and V2 page markup; 53 do not exist locally. All 53 are under `assets/projects/`: project-001 (13), project-002 (15), project-003 (13), project-004 (12). Chrome reported matching 404 resource errors on Homepage, Projects, and Expertise. No explicit references outside `assets/projects/` were missing in that scan. A local `/favicon.ico` request also returned 404; it is browser-generated and not an application asset reference. These are baseline conditions, not cleanup targets. Asset content and references were left untouched. Dynamic asset paths not present as literal strings were outside the static count.

## V1 preservation and support.js

All seven root visitor pages loaded and rendered content without observed JavaScript exceptions in the sampled desktop loads. The root pages import local `./support.js`; V2 pages import their own `./support.js`, `v2/Design System.dc.html` imports `v2/support.js`, and `v2/components/HeaderNav.dc.html` imports `v2/components/support.js`. The four bundles have the same SHA-256 digest. Their header says they were generated from `dc-runtime/src/*.ts`; no `dc-runtime/` source directory, generator configuration, or package manifest was found in this repository. Consolidation without updating relative imports or runtime delivery would break those documents. No copy was modified.

## Evidence for the next phase

Reproduce this baseline through a local HTTP server rooted at the repository directory. Compare the same seven V2 URLs at 1440 × 900, 768 × 900, and 390 × 900, in EN and a fresh FA load; include reduced motion and the exact hash states above. Keep the six V1 Home destinations as the pre-change expectation until a route change is specifically approved. Recheck HeaderNav open/Escape, page scroll, media 404s, and console exceptions. For any change affecting navigation, motion, media, CSS, or shared runtime, add visual and interaction parity evidence that this smoke baseline could not supply.

The repository is ready for a **small, isolated structural change only with a matching targeted before/after browser check**. This baseline alone was not sufficient to approve changing the six Home destinations — that required first fixing `v2/pages/Homepage.dc.html`'s B1–B4 blockers, which the cleanup-pass-3 addendum below records; consolidating `support.js` or changing shared data/media behavior still has no such approval.

## Pre-fix SHA-256 anchors

SHA-256 is over the current file bytes. These anchors detect later changes; they do not imply that the older `V1_BASELINE.json` uses SHA-256 (it records a different algorithm).

| File | SHA-256 |
| --- | --- |
| `Canvas.dc.html` | **removed in cleanup pass 2** (27 Sep 2026) — 206-byte empty scaffold, referenced nowhere, not one of the eight Design Components; formerly `d3a65cc8ce0e759849eaa1ca985d0fbc49bafb3212f9029731ca08d1bda42293` |
| `bidi.js` (root) | **removed in cleanup pass 2** (27 Sep 2026) — unloaded by any root page; `v2/runtime/bidi.js` is unaffected; formerly `365ca7f2974e15e085fe72185f43fdc2b02a4ac61736526ac681a163e7959d11` |
| `reveal.js` (root) | **removed in cleanup pass 2** (27 Sep 2026) — unloaded by any root page and superseded by the V2.4-rebuilt `v2/runtime/reveal.js`; formerly `a885c0b454d04a58ef8f7f5395ed43acd2f483fc95e9d0ea03fcbdc456c5bba4` |
| `Homepage.dc.html` | **relocated to `v1/` in cleanup pass 3** (27 Sep 2026) — pre-move `b45a411154246998737d4e8c38e3e1c70e296a08cb6f9b0fa193c688e3fffb70`; new `v1/Homepage.dc.html` is `71b24640b4ae06971c51ceccddee68375b3df502e47d8a6541931540190c77fb` (content differs only in the `<head>`'s import paths to the shared root data files, required by the move — see `VERSION_STRATEGY.md` §7) |
| `Projects.dc.html` | relocated to `v1/`; pre-move `14b92dba514f0e402d1ae83160f7cb4d9617c624267e02e9891a2a809386c881`; new `v1/Projects.dc.html` is `64653b1b6f0dc70fe89a6b67332cdf10b6514a62b3490aed1b822562e22ccdcb` |
| `Expertise.dc.html` | relocated to `v1/`; pre-move `5bcd566c22b1a00cfe29e6dc62309ef23f9ed71cb98d0196a6c218cea53a9437`; new `v1/Expertise.dc.html` is `509b1a3ef4456b6fd2221d5547a2ee2ed8a6efa460c56cac060bd423cab13623` |
| `Awards.dc.html` | relocated to `v1/`; pre-move `0c5575be2bd227634f690c5c9eae73605b801b9dfee81ff9d34f4acd4113482f`; new `v1/Awards.dc.html` is `fee2295cd59b7f8caf217dbbbdd8a3c62c27a6c57e3ca409e0aacdb450f43f29` |
| `About.dc.html` | relocated to `v1/`; pre-move `e55577785d5b0874d77a3561b4012e7bab8ac9b81642ff2a8e258237f6f3a667`; new `v1/About.dc.html` is `d05c2422206f7f84aeebf5e0660e2a7a4766b26610b028fd85df6f5b2cc6ff1f` |
| `Journal.dc.html` | relocated to `v1/`; pre-move `15ff978bdc7a8c9c275ad84b36440f9a1f41917db3b4ad7dafd4ce44170e0821`; new `v1/Journal.dc.html` is `3a2750b5b1a91d4de980c7a556b687bc6fbf37c0771e62a514063968fb4b2e2a` |
| `Contact.dc.html` | relocated to `v1/`; pre-move `4eef3bf7f3dc03dfe8d2f9b2ac11b7b3aa952970b3b56478e64a94f4cd5302f3`; new `v1/Contact.dc.html` is `e606c0e60bd142c5a93477444a31989560bb028b96b7368dc6df55ac31249270` |
| `Design System.dc.html` | relocated to `v1/`; pre-move `013096465eec57072dc1c6d33bfc3ec4cac2254b002b23a0191a24b02fd6a1d0`; new `v1/Design System.dc.html` is `2b2437f004e4957626ac65c0c652eb1bfc998b627440ada559db173c5709ed3d` |
| `tokens-v2.css` | relocated to `v1/tokens-v2.css` — **byte-identical**, `c6dc306761f10dce6456c21fa871e0a31fbf1030ff2f89cb515011dfe6c9f3a2` (no edit needed; sibling file, moved as a group) |
| `responsive.css` | relocated to `v1/responsive.css` — **byte-identical**, `b78763294b1cfd9a72f3f052b0ca6d132be840ca739d7d4bbdad7676c57977d2` |
| `ambient.js` | relocated to `v1/ambient.js` — **byte-identical**, `38a7919c53cb3e2972be64dbe37f17f3efeec8a8115333f5db9caba96aad2304` |
| `layout-mode.js` | relocated to `v1/layout-mode.js` — **byte-identical**, `35d6af8b41e62b24ea2a7ee6b6a929ccb76b50e1cbf7cd7ec4004d53de87eb0d` |
| `support.js` | relocated to `v1/support.js` — **byte-identical**, `8fe7df74405f3c55f49b7249c74ea1397e65d07dea2b1bd3b4a489bec2e28cbe` |
| `v2/pages/Homepage.dc.html` | **B1–B4 fixed, cleanup pass 3** (27 Sep 2026) — post-initial-language-fix `b89a36f9fbab9c9e1cb828e2ba3a303e55cecdbc2ddc2fdd19bbc80c173a5824`; new hash after this pass's fixes is `f4326091ec47336ead6f81cc1b0764ad9fb72a0fbab3410f5a1a5dd21d21a656` — see the addendum below |
| `v2/pages/Projects.dc.html` | Home-routing updated, cleanup pass 3 — pre-change `c2be4f21ad59fcdad4e16cdd4fc5078d3bb970b0cb4b78da9020e4b31cc9ada3`; new `c6c68ec907a9970ef468dc054a8b43104c3ba87cdda789db5c93672b99b4439d` |
| `v2/pages/Expertise.dc.html` | Home-routing updated, cleanup pass 3 — pre-change `743dc8b0a31b3abdec434005ac4efa262d068296ca24d60cd02b1527fb71fdfa`; new `38b9dd8ec2a0bc0e7fecb044e48cd98f51a08bf674d7572e56de1c327a9a72c7` |
| `v2/pages/Awards.dc.html` | Home-routing + nav anomaly fixed, cleanup pass 3 — pre-change `9c1deff32ef95b4e05ca22dbd3accbe5b95d5c10298026dfb66aaf0dd47c5f96`; new `ff30f83e3a13dc72cf84f208d02a9ad3e73ac09ef5d61eb4f3f79132094982ac` |
| `v2/pages/About.dc.html` | Home-routing updated, cleanup pass 3 — pre-change `9ff30424e61beffae0c4b32a444b122953fab724294b0a5fd00f381d6083086a`; new `6a8d3c67dd56e516e5da2b3afa8eb0be3b6c74c62388864172f23e83d4d7eda5` |
| `v2/pages/Journal.dc.html` | Home-routing updated, cleanup pass 3 — pre-change `e3c37e8b06273a46e42a6c61c702157abda77d9df7b6a3e787559aa2370d564e`; new `37b86c81c5ea970ba03dc65bdda3799cb7ccee6a9669228f989657fbdbb9a81f` |
| `v2/pages/Contact.dc.html` | Home-routing updated, cleanup pass 3 — pre-change `f6e39f638ffa2e3c0e8a98de8688154d5a85c03845b16792292b641f62625678`; new `f020f4631360d6c06d444de233027a84c464a732d7384755e1026a2a04be77d4` |
| `v2/Design System.dc.html` | `9da98743d5d165f2d8df2bdd85f51af67ffd97ceb69b1ef8618f51453c3584c5` |
| `v2/components/HeaderNav.dc.html` | `55db84bcc42fec7d1b81ed969c28399d2024db3abd2b5ce3857545620654e6f7` |
| `v2/support.js` | `8fe7df74405f3c55f49b7249c74ea1397e65d07dea2b1bd3b4a489bec2e28cbe` |
| `v2/pages/support.js` | `8fe7df74405f3c55f49b7249c74ea1397e65d07dea2b1bd3b4a489bec2e28cbe` |
| `v2/components/support.js` | `8fe7df74405f3c55f49b7249c74ea1397e65d07dea2b1bd3b4a489bec2e28cbe` |
| `v2/design-system/tokens-v2.css` | `2e1620efb33e58c92d3204d752ef91dcdc0b6036812f86175b32ad88e0489927` |
| `v2/design-system/base-v2.css` | `e206d2994fee366dacdf4a43d64c6267dac6765470e14a988b3d486b02f80d8d` |
| `v2/design-system/responsive-v2.css` | `72def198ba1218201116db14d79a2014500f8cec4320829423fa7d814b3bfed0` |
| `v2/runtime/reveal.js` | `bc605933843ae4194211e2dde2b6acbda20de9286987e2d29618dc98f73b09cb` |
| `media-utils.js` | `e5a0d3f9c23aad4f4440efb3c9f96bd478d5639cd387d1e8cca67439b1b9ade7` |
| `site-data.js` | `b6a5855e271df31e22b47f37e787631823c5b011cd39b75f650bd4aa064e3818` |
| `projects-data.js` | `c145eab3dc9d8f9a44c02e9b23f475c0fb572a39466b54ae4e63411525645e65` |
| `expertise-data.js` | `7f3c35633255c5c1dda44acceeb7b57266bd6f9968cf69f0e4658f8126c4506a` |
| `about-data.js` | `1924f06b9a375efbc5c40b3850dd40c84f3cfffad9d691d66f76e2d256e59fe8` |
| `awards-data.js` | `25a87f6d32a3c31740cf25fff03be17d4e82b85a87cab88d0d1cf806695f0fd0` |
| `journal-data.js` | `793625c0bed6d54be38ce97d7919d5e79265b5c6862919eb2a23829657c197bd` |
| `contact-data.js` | `dc18ee40d1a13bc7f94679e8ce20f051b001ef070eded17658efd3aa20b67be1` |

## Follow-up verification — unresolved baseline findings

This section records read-only verification performed after the initial baseline. No application, data, or asset file changed; the SHA-256 anchors above still apply.

### Home routing — NEEDS DECISION

Six V2 page files set `hrefHome` to `../../Homepage.dc.html` (with `#lang=fa` when applicable). Journal and Contact also put that root destination in their mobile drawer. This was consistent with an earlier migration state: `v2/README.md` still says Homepage had not migrated. A V2 Homepage now exists and renders at desktop, tablet, and mobile widths; its own navigation targets sibling V2 pages. The archived `HOMEPAGE_V1_TO_V2_REVIEW.md` calls its port **partial parity** and names unverified scroll/responsive cases and a departure-motion difference. The V2 Homepage also has the FA deep-link bug below. Therefore the root destination is a real, existing compatibility path, but its continued use as the V2 canonical Home is not established as an intentional final rule.

Observed in Chrome: `v2/pages/Projects.dc.html#lang=fa` renders RTL and offers `../../Homepage.dc.html#lang=fa`; the root Homepage loads Persian/RTL. Direct `v2/pages/Homepage.dc.html#lang=fa` loads English/LTR. Switching the six links to the sibling V2 page would keep the pages' own relative `../../` data imports, `TA_ASSET_BASE="../../"`, and V2 runtime/design-system import paths; those paths are resolved within the destination document. It **would** switch the entire homepage implementation and currently lose the incoming FA state. Do not change these links until the FA bug is fixed and the remaining homepage parity is accepted.

### Fresh Homepage FA state — CONFIRMED BUG

Fresh direct navigation to `v2/pages/Homepage.dc.html#lang=fa` and a full reload of that URL both rendered EN/LTR after load. Clicking the FA control rendered Persian/RTL, but left the URL unchanged. Changing the hash with `replaceState` or `pushState`, then using Back/Forward, did not update the rendered language. In a separate flow, clicking FA on the V2 Homepage, following its Persian Projects link, and using Back restored the Persian Homepage through browser history; that restoration is memory-dependent, because a reload of the same no-hash Homepage returns to EN. Fresh `#lang=fa` loads on the other six V2 pages rendered FA/RTL in the direct-route probe.

Root cause: `v2/pages/Homepage.dc.html` initializes `state.lang` to `"en"` and `componentDidMount` checks only the `startLang` prop. It never reads `window.location.hash`, never listens for `hashchange`/`popstate`, and its EN/FA callbacks only call `setState`. `v2/runtime/bidi.js` loads before the page logic and does not own page language state. `HeaderNav` receives `lang` and callbacks from the page; it is not overwriting them. The smallest fix for the fresh-load bug is page-local: include the `lang=fa` hash in the existing initial-language check before the first page update. Synchronizing the URL when the control is used, and handling Back/Forward hash changes, are related route-consistency decisions to review separately. Preserve all existing copy, layout, and motion. No fix was applied.

### Image 404s — CONTENT/ASSET ISSUE; favicon — FALSE POSITIVE

Across the retained Chrome probe results, 89 error events reduced to these **nine distinct requested URLs**. Eight are explicit `src` values on real, published records in `projects-data.js`; `TA_PROJECTS.visual()` and the V2 Homepage/Projects/Expertise views request them. All eight are absent at the referenced paths. A recursive exact-filename search under `assets/` and `uploads/` found no match for any of the eight; a search of the records' `sourceFile` names also found no match. No `assets/projects/` directory exists in this repository. An unlabeled image elsewhere cannot be identified as the same photograph from filenames alone.

| Requested path | Canonical record / media ID | Observed from |
| --- | --- | --- |
| `/assets/projects/project-001/01_aerial_context.jpg` | `project-001` / `p001-aerial-context` | Homepage, Projects |
| `/assets/projects/project-001/04_wide_front.jpg` | `project-001` / `p001-wide-front` | Homepage, Projects, Expertise |
| `/assets/projects/project-002/01_aerial_context.jpg` | `project-002` / `p002-aerial-context` | Homepage |
| `/assets/projects/project-002/02_public_edge.jpg` | `project-002` / `p002-public-edge` | Homepage, Projects, Expertise |
| `/assets/projects/project-003/01_aerial_context.jpg` | `project-003` / `p003-aerial-context` | Homepage |
| `/assets/projects/project-003/03_urban_approach.jpg` | `project-003` / `p003-urban-approach` | Homepage, Projects, Expertise |
| `/assets/projects/project-004/03_aerial_resort_context.jpg` | `project-004` / `p004-aerial-resort-context` | Homepage, Projects |
| `/assets/projects/project-004/04_main_axis_night.jpg` | `project-004` / `p004-main-axis-night` | Homepage |
| `/favicon.ico` | Browser-requested site icon; no project-data record | First Homepage load |

The 404s are missing referenced content, not intentional prototype placeholders: each of the eight media records has a non-null `src` and an active `hero`, `homepage`, or `archive` role. Static inspection found 53 distinct missing `assets/projects/` paths across the four real project records, but only the eight listed above were observed as browser 404s in the baseline probes. One of the 53 paths is `03_axis_hold_DO_NOT_PUBLISH.jpg`, explicitly retained with `roles: []` and never rendered; it is **intentionally withheld**, not one of the observed 404s. Prototype `src:null` plate fallbacks are a separate intentional state. `/favicon.ico` is a browser request with no application image reference and is not evidence of broken project content.

## Homepage initial-language fix — 27 September 2026

The historical observations above remain the **pre-fix** baseline. The confirmed fresh-load bug was fixed in `v2/pages/Homepage.dc.html` by adding an exact `lang=fa` hash check to its existing initial `startLang` condition in `componentDidMount`. No other application file changed. The new Homepage SHA-256 is `b89a36f9fbab9c9e1cb828e2ba3a303e55cecdbc2ddc2fdd19bbc80c173a5824`; the earlier digest in the table is retained as the pre-fix anchor.

Chrome 154 verification against a local HTTP server used 1440 × 900 (desktop), 768 × 900 (tablet), and 390 × 900 (mobile). At each width, a fresh no-hash load rendered EN/LTR; a fresh `#lang=fa` load and reload rendered Persian/RTL without using the language control; clicking FA and EN still switched the rendered language in both directions. The page had no document-level horizontal overflow at those widths and no observed JavaScript runtime exceptions. The only observed network errors were the same eight missing project-image paths and browser-requested favicon listed above.

Existing URL-state limitations remain: manual EN/FA controls do not update the hash, and hash-only Back/Forward changes do not change the rendered language. In particular, choosing EN while `#lang=fa` remains in the URL shows EN until reload, when the now-correct initial hash check restores FA. No route or history behavior was changed in this fix. (The last sentence of this section, in the original fix note, said the six V2 Home links still point to V1 — see the addendum below: this is no longer current.)

## V1 relocation and Home-routing switch — cleanup pass 3, 27 September 2026

This resolves the "Home routing — NEEDS DECISION" section above and the B1–B4 blockers `docs/HOMEPAGE_FUNCTIONAL_PARITY_AUDIT.md` raised against making V2's own Homepage the canonical Home destination. Two changes, applied together:

**V1 relocated.** V1's 8 pages and its 5 own runtime/CSS files (`support.js`, `responsive.css`, `tokens-v2.css`, `ambient.js`, `layout-mode.js`) moved from the project root into `v1/`, unchanged in behavior. The 8 pages' `<head>` blocks were updated to reach the shared root data files (which did not move) one directory level further up — see the SHA-256 table above for exactly which files changed bytes (the 8 pages, due to the added `TA_ASSET_BASE`/import-path lines) versus which moved unchanged (the 5 runtime/CSS files, confirmed byte-identical).

**B1–B4 fixed in `v2/pages/Homepage.dc.html`:**
- **B1** (outgoing FA links lose language): the Expertise-register link and the mobile project-chapter link both concatenated `hsh` (`#lang=fa`) directly after an existing `#...` hash, producing an invalid double-hash that opened in EN. Both now append `&lang=fa` instead, matching the pattern already used correctly elsewhere in the same file (desktop project stage, Recognition rows).
- **B2** (Expertise/Research section-tracker never activates): `TA_SECTION_TRACKER.track()`'s `onChange` callbacks were storing the whole `{key,index,total,el,els}` argument as the active index. Both callbacks now read `.index` from it.
- **B3** (reduced-motion clips content out of view): resolved by removing reduced-motion support from this page entirely (a product decision, not a fix to the clipping) — the manual toggle, the `prefers-reduced-motion` system check, and every `red ? ... : ...` branch it fed are gone; the page always renders its normal scroll-driven/interactive state. This also means the OS reduced-motion preference no longer freezes the scroll-progress tick or the Contact pointer-follow interaction, which the old gate did.
- **B4** (drawer Home link dead, never closes): the drawer's "Home" entry was a self-referential `"#"` (`"##lang=fa"` in FA) that never navigated or closed the drawer. It's now a real link to `Homepage.dc.html`, matching how the other six pages' drawer Home entries already work.

**Home routing switched.** All seven V2 pages' Home destination (both `hrefHome` and each drawer's "Home" entry) now points at `v2/pages/Homepage.dc.html` — a bare sibling reference — instead of the (now-relocated) `v1/Homepage.dc.html`. `Expertise.dc.html`/`Awards.dc.html` retain their `const V1 = "../../"` declarations, since both still use them to resolve `assets/` image paths (unaffected by this change); only their Home-link usages were repointed. `Projects.dc.html`/`Journal.dc.html`/`Contact.dc.html`/`About.dc.html` had that constant removed entirely, since the Home link was its only use. A related anomaly in `Awards.dc.html` — its "Expertise" nav item alone routed through `V1` instead of the sibling page, unlike its other nav items — was fixed to match.

**Verification performed:** every file this pass did not intend to touch (all root shared data/media, `v2/design-system/*`, `v2/runtime/*`, `v2/components/*`, and the untouched portions of the six edited `v2/pages/*.dc.html` files) was re-hashed and confirmed unchanged. Repo-wide greps confirmed zero remaining `V1 + "Homepage` (or equivalent) references anywhere, and zero remaining `reducedQ`/`toggleReduced`/`reducedLabel`/`state.reduced` references in Homepage.dc.html. No browser was available this session to visually confirm B1–B4's runtime behavior or the relocation's rendering — that remains a recommended follow-up (fresh FA load, reduced-motion-removed visual pass, drawer open/close, Expertise/Research scroll-tracking, and a full page-load smoke test of both `v1/` and `v2/` from their new/updated paths).
