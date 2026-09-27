# Repository hygiene manifest

Scope: repository hygiene only. No architecture, design, runtime, routes, content, data, asset references, HTML, CSS, or JavaScript were changed.

## Verification

- Original inventory: 440 files; 58080749 bytes (sum of file lengths, not allocated disk usage).
- Deleted: 110 files; 9507 bytes of generated metadata.
- Moved unchanged: 37 files (27 historical Markdown documents and 10 screenshots).
- SHA-256 verified: all 330 retained original files, including every moved file and all protected folders, match the initial inventory.
- Protected Zone.Identifier sidecars retained: 111. Nothing inside any assets/ or uploads/ directory was modified.
- No .git directory or AGENTS.md was present. Verification used a complete before/after file inventory and hashes, rather than git diff.
- No application tests were needed for byte-identical application files. No browser behavior validation is claimed.
- Added only .gitignore, docs/README.md, docs/archive/README.md, and this manifest.
- No other temporary files, cache files, abandoned experiments, or generated application files were established as safely removable. Duplicate runtime copies, manifests, baseline data, and protected upload packages remain.

## Deleted files

Every Zone.Identifier file below contained [ZoneTransfer] and matched its original hash before removal. The separator displayed as  is U+F03A, the Windows/WSL encoding of a colon. .thumbnail is the root export thumbnail; no source/content references to it were found.

- `.thumbnail` (6782 bytes)
- `.thumbnailZone.Identifier` (25 bytes)
- `About.dc.htmlZone.Identifier` (25 bytes)
- `ABOUT_V1_AUDIT.mdZone.Identifier` (25 bytes)
- `ABOUT_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `about-data.jsZone.Identifier` (25 bytes)
- `ambient.jsZone.Identifier` (25 bytes)
- `ASSET_MANIFEST.jsonZone.Identifier` (25 bytes)
- `Awards.dc.htmlZone.Identifier` (25 bytes)
- `AWARDS_DEMO_CONTENT_SUMMARY.mdZone.Identifier` (25 bytes)
- `AWARDS_V1_AUDIT.mdZone.Identifier` (25 bytes)
- `AWARDS_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `awards-data.jsZone.Identifier` (25 bytes)
- `bidi.jsZone.Identifier` (25 bytes)
- `Canvas.dc.htmlZone.Identifier` (25 bytes)
- `Contact.dc.htmlZone.Identifier` (25 bytes)
- `CONTACT_DEMO_CONTENT_SUMMARY.mdZone.Identifier` (25 bytes)
- `CONTACT_V1_AUDIT.mdZone.Identifier` (25 bytes)
- `CONTACT_V2_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `CONTACT_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `contact-data.jsZone.Identifier` (25 bytes)
- `Design System.dc.htmlZone.Identifier` (25 bytes)
- `DESIGN_SYSTEM_V2_FINAL_AUDIT.mdZone.Identifier` (25 bytes)
- `DESIGN_SYSTEM_V2_READY.mdZone.Identifier` (25 bytes)
- `Expertise.dc.htmlZone.Identifier` (25 bytes)
- `EXPERTISE_V2_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `EXPERTISE_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `expertise-data.jsZone.Identifier` (25 bytes)
- `HANDOFF.mdZone.Identifier` (25 bytes)
- `Homepage.dc.htmlZone.Identifier` (25 bytes)
- `HOMEPAGE_V1_TO_V2_MIGRATION_MAP.mdZone.Identifier` (25 bytes)
- `HOMEPAGE_V1_TO_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `Journal.dc.htmlZone.Identifier` (25 bytes)
- `JOURNAL_DETAIL_V2_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `JOURNAL_V1_AUDIT.mdZone.Identifier` (25 bytes)
- `JOURNAL_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `journal-data.jsZone.Identifier` (25 bytes)
- `layout-mode.jsZone.Identifier` (25 bytes)
- `media-utils.jsZone.Identifier` (25 bytes)
- `MOTION_SYSTEM_V2_QA.mdZone.Identifier` (25 bytes)
- `PAGE_MIGRATION_CHECKLIST.mdZone.Identifier` (25 bytes)
- `PROJECT_DETAIL_V2_CASE_STUDY_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `PROJECT_DETAIL_V2_CASE_STUDY_REVIEW.mdZone.Identifier` (25 bytes)
- `PROJECT_MEDIA_BLOCKERS.mdZone.Identifier` (25 bytes)
- `Projects.dc.htmlZone.Identifier` (25 bytes)
- `PROJECTS_V1_AUDIT.mdZone.Identifier` (25 bytes)
- `PROJECTS_V1_SCROLL_CHOREOGRAPHY_AUDIT.mdZone.Identifier` (25 bytes)
- `PROJECTS_V2_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `PROJECTS_V2_REVIEW.mdZone.Identifier` (25 bytes)
- `projects-data.jsZone.Identifier` (25 bytes)
- `responsive.cssZone.Identifier` (25 bytes)
- `reveal.jsZone.Identifier` (25 bytes)
- `RTL_LTR_GUIDE_V2.mdZone.Identifier` (25 bytes)
- `screenshots/about-closing-fix.pngZone.Identifier` (25 bytes)
- `screenshots/about-full.pngZone.Identifier` (25 bytes)
- `screenshots/about-studio-block.pngZone.Identifier` (25 bytes)
- `screenshots/about-studio-photo-check.pngZone.Identifier` (25 bytes)
- `screenshots/about-studio-photo-final.pngZone.Identifier` (25 bytes)
- `screenshots/about-studio-photo-fixed.pngZone.Identifier` (25 bytes)
- `screenshots/ambient-left.pngZone.Identifier` (25 bytes)
- `screenshots/ambient-right.pngZone.Identifier` (25 bytes)
- `screenshots/awards-recog.pngZone.Identifier` (25 bytes)
- `screenshots/awards-recog2.pngZone.Identifier` (25 bytes)
- `site-data.jsZone.Identifier` (25 bytes)
- `support.jsZone.Identifier` (25 bytes)
- `tokens-v2.cssZone.Identifier` (25 bytes)
- `V1_BASELINE.jsonZone.Identifier` (25 bytes)
- `v2/components/HeaderNav.dc.htmlZone.Identifier` (25 bytes)
- `v2/components/README.mdZone.Identifier` (25 bytes)
- `v2/components/support.jsZone.Identifier` (25 bytes)
- `v2/Design System.dc.htmlZone.Identifier` (25 bytes)
- `v2/design-system/base-v2.cssZone.Identifier` (25 bytes)
- `v2/design-system/README.mdZone.Identifier` (25 bytes)
- `v2/design-system/responsive-v2.cssZone.Identifier` (25 bytes)
- `v2/design-system/tokens-v2.cssZone.Identifier` (25 bytes)
- `v2/JOURNAL_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `v2/pages/About.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Awards.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Contact.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Expertise.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Homepage.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Journal.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/Projects.dc.htmlZone.Identifier` (25 bytes)
- `v2/pages/README.mdZone.Identifier` (25 bytes)
- `v2/pages/support.jsZone.Identifier` (25 bytes)
- `v2/README.mdZone.Identifier` (25 bytes)
- `v2/runtime/ambient.jsZone.Identifier` (25 bytes)
- `v2/runtime/bidi.jsZone.Identifier` (25 bytes)
- `v2/runtime/cursor.jsZone.Identifier` (25 bytes)
- `v2/runtime/layout-mode.jsZone.Identifier` (25 bytes)
- `v2/runtime/media-handoff.jsZone.Identifier` (25 bytes)
- `v2/runtime/motif.jsZone.Identifier` (25 bytes)
- `v2/runtime/README.mdZone.Identifier` (25 bytes)
- `v2/runtime/reveal.jsZone.Identifier` (25 bytes)
- `v2/runtime/scroll-coordinator.jsZone.Identifier` (25 bytes)
- `v2/runtime/section-tracker.jsZone.Identifier` (25 bytes)
- `v2/runtime/ui-strings.jsZone.Identifier` (25 bytes)
- `v2/support.jsZone.Identifier` (25 bytes)
- `v2/V2_ARCHITECTURE.mdZone.Identifier` (25 bytes)
- `V2_3_EXPERIENCE_HARDENING_AUDIT.mdZone.Identifier` (25 bytes)
- `V2_DEPRECATION_GUIDE.mdZone.Identifier` (25 bytes)
- `V2_DESIGN_CONTRACT.mdZone.Identifier` (25 bytes)
- `V2_DESIGN_SYSTEM_AUDIT.mdZone.Identifier` (25 bytes)
- `V2_INTERACTION_ALIGNMENT_AUDIT.mdZone.Identifier` (25 bytes)
- `V2_INTERACTIVE_EXPERIENCE_ROLLOUT.mdZone.Identifier` (25 bytes)
- `V2_MIGRATION_PRINCIPLES.mdZone.Identifier` (25 bytes)
- `V2_PAGE_BLUEPRINT.mdZone.Identifier` (25 bytes)
- `V2_SPATIAL_ARCHETYPES.mdZone.Identifier` (25 bytes)
- `V2_VISUAL_RHYTHM_AUDIT.mdZone.Identifier` (25 bytes)
- `VERSION_STRATEGY.mdZone.Identifier` (25 bytes)

## Moved files

| Original path | Archive path |
| --- | --- |
| `ABOUT_V1_AUDIT.md` | `docs/archive/ABOUT_V1_AUDIT.md` |
| `ABOUT_V2_REVIEW.md` | `docs/archive/ABOUT_V2_REVIEW.md` |
| `AWARDS_DEMO_CONTENT_SUMMARY.md` | `docs/archive/AWARDS_DEMO_CONTENT_SUMMARY.md` |
| `AWARDS_V1_AUDIT.md` | `docs/archive/AWARDS_V1_AUDIT.md` |
| `AWARDS_V2_REVIEW.md` | `docs/archive/AWARDS_V2_REVIEW.md` |
| `CONTACT_DEMO_CONTENT_SUMMARY.md` | `docs/archive/CONTACT_DEMO_CONTENT_SUMMARY.md` |
| `CONTACT_V1_AUDIT.md` | `docs/archive/CONTACT_V1_AUDIT.md` |
| `CONTACT_V2_REVIEW.md` | `docs/archive/CONTACT_V2_REVIEW.md` |
| `DESIGN_SYSTEM_V2_FINAL_AUDIT.md` | `docs/archive/DESIGN_SYSTEM_V2_FINAL_AUDIT.md` |
| `DESIGN_SYSTEM_V2_READY.md` | `docs/archive/DESIGN_SYSTEM_V2_READY.md` |
| `EXPERTISE_V2_REVIEW.md` | `docs/archive/EXPERTISE_V2_REVIEW.md` |
| `HANDOFF.md` | `docs/archive/HANDOFF.md` |
| `HOMEPAGE_V1_TO_V2_REVIEW.md` | `docs/archive/HOMEPAGE_V1_TO_V2_REVIEW.md` |
| `JOURNAL_V1_AUDIT.md` | `docs/archive/JOURNAL_V1_AUDIT.md` |
| `JOURNAL_V2_REVIEW.md` | `docs/archive/JOURNAL_V2_REVIEW.md` |
| `MOTION_SYSTEM_V2_QA.md` | `docs/archive/MOTION_SYSTEM_V2_QA.md` |
| `PROJECT_DETAIL_V2_CASE_STUDY_REVIEW.md` | `docs/archive/PROJECT_DETAIL_V2_CASE_STUDY_REVIEW.md` |
| `PROJECT_MEDIA_BLOCKERS.md` | `docs/archive/PROJECT_MEDIA_BLOCKERS.md` |
| `PROJECTS_V1_AUDIT.md` | `docs/archive/PROJECTS_V1_AUDIT.md` |
| `PROJECTS_V1_SCROLL_CHOREOGRAPHY_AUDIT.md` | `docs/archive/PROJECTS_V1_SCROLL_CHOREOGRAPHY_AUDIT.md` |
| `PROJECTS_V2_REVIEW.md` | `docs/archive/PROJECTS_V2_REVIEW.md` |
| `screenshots/about-closing-fix.png` | `docs/archive/screenshots/about-closing-fix.png` |
| `screenshots/about-full.png` | `docs/archive/screenshots/about-full.png` |
| `screenshots/about-studio-block.png` | `docs/archive/screenshots/about-studio-block.png` |
| `screenshots/about-studio-photo-check.png` | `docs/archive/screenshots/about-studio-photo-check.png` |
| `screenshots/about-studio-photo-final.png` | `docs/archive/screenshots/about-studio-photo-final.png` |
| `screenshots/about-studio-photo-fixed.png` | `docs/archive/screenshots/about-studio-photo-fixed.png` |
| `screenshots/ambient-left.png` | `docs/archive/screenshots/ambient-left.png` |
| `screenshots/ambient-right.png` | `docs/archive/screenshots/ambient-right.png` |
| `screenshots/awards-recog.png` | `docs/archive/screenshots/awards-recog.png` |
| `screenshots/awards-recog2.png` | `docs/archive/screenshots/awards-recog2.png` |
| `V2_3_EXPERIENCE_HARDENING_AUDIT.md` | `docs/archive/V2_3_EXPERIENCE_HARDENING_AUDIT.md` |
| `V2_DEPRECATION_GUIDE.md` | `docs/archive/V2_DEPRECATION_GUIDE.md` |
| `V2_DESIGN_SYSTEM_AUDIT.md` | `docs/archive/V2_DESIGN_SYSTEM_AUDIT.md` |
| `V2_INTERACTION_ALIGNMENT_AUDIT.md` | `docs/archive/V2_INTERACTION_ALIGNMENT_AUDIT.md` |
| `V2_INTERACTIVE_EXPERIENCE_ROLLOUT.md` | `docs/archive/V2_INTERACTIVE_EXPERIENCE_ROLLOUT.md` |
| `V2_VISUAL_RHYTHM_AUDIT.md` | `docs/archive/V2_VISUAL_RHYTHM_AUDIT.md` |

## Retained canonical guidance and specifications

See [documentation index](README.md) for links and status caveats. Existing directory README files were preserved; this cleanup does not recertify their status claims.

- `CONTACT_V2_BLUEPRINT.md`
- `EXPERTISE_V2_BLUEPRINT.md`
- `HOMEPAGE_V1_TO_V2_MIGRATION_MAP.md`
- `JOURNAL_DETAIL_V2_BLUEPRINT.md`
- `PAGE_MIGRATION_CHECKLIST.md`
- `PROJECT_DETAIL_V2_CASE_STUDY_BLUEPRINT.md`
- `PROJECTS_V2_BLUEPRINT.md`
- `RTL_LTR_GUIDE_V2.md`
- `V2_DESIGN_CONTRACT.md`
- `V2_MIGRATION_PRINCIPLES.md`
- `V2_PAGE_BLUEPRINT.md`
- `V2_SPATIAL_ARCHETYPES.md`
- `VERSION_STRATEGY.md`
- `v2/assets/README.md`
- `v2/components/README.md`
- `v2/design-system/README.md`
- `v2/JOURNAL_BLUEPRINT.md`
- `v2/pages/README.md`
- `v2/README.md`
- `v2/runtime/README.md`
- `v2/V2_ARCHITECTURE.md`

## Size after cleanup

Total file bytes including the new ignore rules and documentation: 58087242 bytes.
Archiving saves no bytes. The audit trail may outweigh the small metadata deletion; no media was deleted.
