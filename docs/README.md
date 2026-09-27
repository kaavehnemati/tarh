# Documentation index

Start with [VERSION_STRATEGY.md](../VERSION_STRATEGY.md), [V2_ARCHITECTURE.md](../v2/V2_ARCHITECTURE.md), and [V2_DESIGN_CONTRACT.md](../V2_DESIGN_CONTRACT.md). These describe version ownership and architecture/design contracts.

## Retained rules and specifications

These existing documents remain in their original locations; retention does not certify every historical statement as current. The per-page migration blueprints and `PAGE_MIGRATION_CHECKLIST.md` were deleted in cleanup pass 4 (27 September 2026, see `VERSION_STRATEGY.md` §8) now that the migration they tracked is complete for all seven pages.
- [RTL_LTR_GUIDE_V2.md](../RTL_LTR_GUIDE_V2.md)
- [V2_DESIGN_CONTRACT.md](../V2_DESIGN_CONTRACT.md)
- [V2_MIGRATION_PRINCIPLES.md](../V2_MIGRATION_PRINCIPLES.md)
- [V2_PAGE_BLUEPRINT.md](../V2_PAGE_BLUEPRINT.md)
- [V2_SPATIAL_ARCHETYPES.md](../V2_SPATIAL_ARCHETYPES.md)
- [VERSION_STRATEGY.md](../VERSION_STRATEGY.md)

## V2 directory documentation

Directory guidance is current as of cleanup pass 3 (v2/README.md's migration-status prose and v2/components/README.md's HeaderNav usage list, both previously dated, were corrected against actual source in pass 2; pass 3 further updated v2/README.md and v2/V2_ARCHITECTURE.md to record that V2 now has zero dependency, presentation or navigational, on V1). `v2/JOURNAL_BLUEPRINT.md` was relocated to root `JOURNAL_V2_BLUEPRINT.md` in pass 3, then deleted in pass 4 along with the other per-page migration blueprints (see above).
- [v2/assets/README.md](../v2/assets/README.md)
- [v2/components/README.md](../v2/components/README.md)
- [v2/design-system/README.md](../v2/design-system/README.md)
- [v2/pages/README.md](../v2/pages/README.md)
- [v2/README.md](../v2/README.md)
- [v2/runtime/README.md](../v2/runtime/README.md)
- [v2/V2_ARCHITECTURE.md](../v2/V2_ARCHITECTURE.md)

The root and V2 Design System HTML files, V1_BASELINE.json, ASSET_MANIFEST.json, all runtime files, and all project data remain unchanged **as of that cleanup pass**. Cleanup pass 3 (27 September 2026) relocated V1's presentation entirely from the project root into `v1/`, and made V2 fully independent of V1 for navigation as well as presentation — see `VERSION_STRATEGY.md` §7 and `docs/REGRESSION_BASELINE.md`'s corresponding addendum for what changed and why; `V1_BASELINE.json` gained a location note but no hash changed. Documentation and source packages inside assets/ and uploads/ were excluded from cleanup.

## Historical material

[Archive](archive/README.md) contains phase reports and preserved screenshots. Archived findings may include unresolved blockers; archiving does not mark them resolved. [Cleanup manifest](HYGIENE_MANIFEST.md) records every deletion and move.
