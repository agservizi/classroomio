# Changelog — Gestiio Training fork

## gestiio-training (unreleased)

### Changed

- Default and only UI locale: **Italian (`it`)**. Language pickers removed from
  profile and Customize LMS. Layout always loads `it` translations.
- Self-hosted license gate: with empty `LICENSE_KEY`, Token Auth / SSO /
  no-tracking features are available without phone-home to ClassroomIO
  enterprise API (`apps/api/src/services/license.ts`).

### Docs

- Added `AGPL-SOURCE.md` and public `/source` page for AGPL §13 compliance.
