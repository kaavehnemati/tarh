# V2 components

Shared child Design Components used by **two or more** V2 pages, with an
identical DOM shape. A component used by one page, or two pages with
different compositions, stays page-local — see `../V2_ARCHITECTURE.md` §4
for what was evaluated and rejected.

| Component | Used by | Props |
|---|---|---|
| `HeaderNav.dc.html` | About, Awards, Contact, Expertise, Homepage, Journal, Projects (all 7 pages) | `brand`, `upper`, `hrefHome`, `nav` (array), `drawerLinks` (array), `lang`, `onSetEn`, `onSetFa`, `menuId` (short suffix, e.g. `"aw"` → dialog id `v2-menu-aw`) |

`HeaderNav` owns its own open/close state, focus trap, Escape handling, body
scroll lock and focus restoration — a page never re-implements that logic.

Every component consumes Grid → Spacing → Typography → Surface → Motion from
`../design-system/tokens-v2.css` and owns only its structure. No literal
sizes, spaces, durations or colours.

Not yet built (revisit only if a future page needs the identical pattern):
`IndexPreview` — Awards, Projects, and Expertise each implement their own
Index+Preview register independently (different state shape: filters, motif
cell mapping, cursor actions), so extraction was evaluated and deliberately
deferred, not blocked on migration (see `../V2_ARCHITECTURE.md` §4). Also not
extracted: a "recognition" component (Awards' and About's current
recognition sections are different compositions, not one component wearing
two skins).
