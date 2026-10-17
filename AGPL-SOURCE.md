# AGPL source offer — Gestiio ClassroomIO fork

This repository is a fork of [classroomio/classroomio](https://github.com/classroomio/classroomio)
licensed under the **GNU Affero General Public License v3.0** (see `LICENSE`).

## Network use (AGPL §13)

The training instance at **https://training-gestiio.agenziaplinio.it** runs software
from this fork. Corresponding source for the exact deployed revision is this
public repository:

- **Repository:** https://github.com/agservizi/classroomio
- **Branch:** `gestiio-training`
- **Deployed tag / image:** `gestiio-training` (see `CHANGELOG-gestiio.md` and
  `CIO_VERSION` / image tags on the host)

A copy of this notice is also served at `/source` on the training domain.

## Gestiio-specific modifications (summary)

1. **UI locale fixed to Italian (`it`)** — no language selector; existing
   `it.json` translations are used as-is (no additional translation work).
2. **Self-host Token Auth / SSO without commercial `LICENSE_KEY`** — when
   `PUBLIC_IS_SELFHOSTED=true` and `LICENSE_KEY` is unset, enterprise features
   (including token-auth) are unlocked without calling
   `enterprise-api.classroomio.dev`. If `LICENSE_KEY` is set, upstream
   verification behaviour is preserved.

Upstream ClassroomIO remains copyright of its authors. Modifications for
Gestiio / Agenzia Plinio are provided under the same AGPL-3.0 terms.
