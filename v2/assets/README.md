# V2 assets

For imagery or graphics that exist **only** in V2.

- **Shared assets** — project photography, drawings, portraits — stay in `../../assets/` and are
  referenced by the canonical data modules. Both versions resolve them through `media-utils.js`.
  Never copy a shared asset here.
- **V2 assets** — go here only if V2 introduces something V1 never had.
- Name V2-only files `v2-<purpose>.<ext>` so they can't be mistaken for a shared asset.
