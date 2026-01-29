# Data Model (Minimal, Extensible)

## People (data/clean/people.csv)
- id: slug (unique), suggest `name-slug-YYYY`
- name: canonical display name
- birth_date: ISO `YYYY-MM-DD` (optional if unknown)

## Events (data/clean/events.csv)
- id: slug
- name: label
- date: ISO `YYYY-MM-DD`

## Orgs (data/config/orgs.csv)
- id: slug
- name: label
- type: channel | team | band | show | other

## Roles (data/config/roles.csv)
- role: allowed role names

## Memberships (future)
- person_id, org_id, role, start_date?, end_date?

Notes
- Raw exports live in `data/raw/` and are not committed.
- Intermediate results in `data/work/`.
- Canonical outputs in `data/clean/` and JSON mirrors in `packages/content/src/schema/`.

