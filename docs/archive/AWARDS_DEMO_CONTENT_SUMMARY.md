# Awards content update — summary

## Data entries updated
`awards-data.js` fully replaced: removed all 20 placeholder records (Venice Biennale/MENA/
National Trophy/2A/A' Design/SBID/UK Role Model with "Organisation NN" fillers) and replaced
with the 8 real, client-confirmed records from `awards-data-suggestion.json`. No extra/fake
awards were added.

## Image → award mapping
| Award (year) | Asset |
|---|---|
| UK Role Model — Class of 2019 | `assets/awards/06-uk-construction-week-role-model-2019.jpg` |
| SBID Awards — Winner, Best Hotel Design (2015) | `assets/awards/01-sbid-international-design-awards-2015.jpg` |
| MENA Awards — Recognition (2015) | `assets/awards/02-mena-interior-design-architecture-awards-2015.jpg` |
| A' Design Award — Selected (2015) | `assets/awards/04-a-design-award.jpg` |
| MENA Awards — Best Hospitality Project (2014) | `assets/awards/03-mena-best-hospitality-project-2014.jpg` |
| 2A Awards — Selected (2014) | `assets/awards/05-2a-continental-architectural-awards.jpg` |
| Venice Biennale — Participation (2014) | `assets/awards/07-venice-biennale-recognition.jpg` |
| National Trophy — Awarded (1387) | `assets/awards/08-national-tourism-recognition-1387.jpg` |

All 8 supplied award-object photographs were used; none are people/ceremony photography.

## Featured (Selected recognition, top of page)
Explicit `featured:true` flag set on 3 records: UK Role Model (2019), SBID Awards — Winner
(2015), MENA Awards (2015) — the most recent record plus the one clear "Winner" plus the
strongest 2015 pairing. The prior heuristic (Winner-level + linked real project) no longer
applies since none of these 8 records link to a project.

## Archive
All 8 records render in the full Archive list, sorted newest → oldest by default (`Number(year)`
comparison; the Jalali year "1387" sorts correctly last since it converts to the smallest
number, which also happens to be the chronologically oldest entry here).

## Preview wiring
The shared sticky preview panel (right-hand side, desktop/tablet) now shows the hovered/active
row's own award photograph via `background-size:contain` (not `cover`) so each trophy/plaque is
shown in full, not cropped — per the brief's fit-preference guidance. Caption shows the award's
full name (e.g. "SBID International Design Awards") instead of a project title, since these
aren't project-linked.

## Fields kept intentionally generic
- `cat`/`level` reuse the "Meta / category" and "Result / subtitle" wording exactly as supplied
  (e.g. category "Recognition", result "2015") — not expanded into more specific claims not in
  the source package.
- The "Recognised work" section (which used to rank projects by recognition count) now renders
  nothing and is hidden automatically, since none of these 8 real awards are linked to a specific
  project record. This wasn't disabled by force — it's a direct, honest consequence of the data;
  restoring it would require a confirmed award↔project mapping.

## To confirm later
- Whether any of these 8 awards should be linked to a specific project (none currently are,
  per the supplied package).
- Exact organisation/jury names beyond what's already in the `award` field, if the studio wants
  a more detailed attribution later.
- Bilingual (Persian) award names were newly translated for this pass and should be reviewed by
  a Persian-speaking studio contact before final production use.
