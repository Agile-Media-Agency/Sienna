# Data Cleanup & Dedupe Plan (Age Comparison)

Scope: consolidate CSV/Numbers data you collected into a single canonical dataset for people and events.

Steps
- Inventory sources: list all CSV/Numbers now under `apps/age-comparison/siennas-age-comparison-mvp-html-single-page-test/`.
- Normalize columns: person name, birthdate (ISO), source, notes.
- Standardize names: map nicknames/variants to canonical names (e.g., "Mommy" → "Mom").
- Parse dates: convert to ISO `YYYY-MM-DD`; record original if ambiguous.
- Dedupe: group by canonical name + birthdate; flag conflicts for review.
- Export: `people.csv` and `events.csv` at `data/clean/` and JSON mirrors into `packages/content/src/schema/`.

Artifacts
- data/raw/: untouched exports (CSV)
- data/work/: intermediate merges (CSV)
- data/clean/: final `people.csv`, `events.csv`

CLI
- Create folders and drop raw CSVs into `data/raw/` (copy from your old folders).
- Run merge/dedupe for people: `python3 scripts/data/people_merge.py`
- Run merge/dedupe for events: `python3 scripts/data/events_merge.py`
- Export JSON mirrors: `python3 scripts/data/export_json.py`

Outputs
- data/work/people_raw.csv – combined rows with canonicalized names
- data/work/people_review.csv – potential conflicts to review
- data/clean/people.csv – exact-deduped canonical list
- data/clean/events.csv – deduped events

Notes
- Prefer human-verified corrections when conflicts arise.
- Keep minimal fields now; add optional metadata later (`source_url`, `aka`, `tags`).

