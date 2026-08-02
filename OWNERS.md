# Khelo Tech ownership

> Created by Satyam Kumar

This workspace is **Khelo Tech only**. There is no khelo-tech upstream remote and no shared JIST product chrome.

## Repositories

| Product surface               | Local folder      | GitHub                                                |
| ----------------------------- | ----------------- | ----------------------------------------------------- |
| Web frontend                  | `plane-frontend/` | https://github.com/ft-kumarsatyam/Jist-Web_frontend   |
| Admin frontend                | `plane-frontend/` | https://github.com/ft-kumarsatyam/JIST-Admin-Frontend |
| Backend (NestJS API)          | `plane-backend/`  | https://github.com/ft-kumarsatyam/JIST-Backend        |
| Marketing site (brand source) | —                 | https://www.khelo.tech/                               |

Same monorepo is mirrored to the web and admin GitHub remotes. On Vercel: Root Directory `apps/web` vs `apps/admin`.

**Cursor:** open `/Users/kumarsatyam/Projects/plane/JIST.code-workspace` so Source Control shows **two** repos (not the parent folder). The parent `plane/` directory is only a container — it is not a Git repository.

## Rules

1. **API:** Only Nest in `plane-backend`. Do not reintroduce Django `apps/api`, Celery workers, or RabbitMQ for day-to-day work.
2. **Deploy compose:** `deployments/cli/community/docker-compose.yml` is Nest-only. Legacy Django file is `docker-compose.django.legacy.yml` (do not run).
3. **Remotes:** Prefer JIST remotes — web → `Jist-Web_frontend`, admin → `JIST-Admin-Frontend`, API → `JIST-Backend`. Legacy `khelo-tech-PMM` / `khelo-tech-PMM-Backend` may still exist as `origin`.
4. **Brand:** Product name is **JIST**. Colors/logo follow [khelo.tech](https://www.khelo.tech/) (primary `#753FC9`, soft lilac `#F4EEFD`). Never surface the word “JIST” in UI copy.
5. **Auth URLs:** User app and Admin app have separate sign-in/sign-up URLs (see below).
6. **License:** Source still carries AGPL-3.0 SPDX headers where inherited. Keep them; do not strip license notices.

## Brand tokens (app)

- Primary: `#753FC9`
- Soft background: `#F4EEFD`
- Deep purple: `#3F2271`
- Product name: **JIST**
- Site URL: `https://www.khelo.tech/`

## Auth URLs

| Audience        | App           | Sign in           | Sign up                                               |
| --------------- | ------------- | ----------------- | ----------------------------------------------------- |
| Workspace users | web `:3000`   | `/sign-in/`       | Invite link only (`/sign-up/?invitation_id=…&slug=…`) |
| Instance admins | admin `:3001` | `/admin/sign-in/` | `/admin/sign-up/` (instance bootstrap)                |

**Invite-only:** Public signup is disabled (`enable_signup: false`). Workspace admins invite emails from **Settings → Members**. Invitees open the invite link, create an account (or sign in), and join. First-ever user may still bootstrap without an invite.

## Product UX checklist (Zoho + Linear blend)

Ship / keep these until they feel first-class:

**Zoho-like**

- [x] Separate user vs admin auth surfaces
- [x] Job role + org-oriented onboarding questions
- [ ] Portal/company size templates after workspace create
- [ ] Activity feed + calendar polish for non-dev roles
- [ ] Time tracking (worklogs) backed by Nest

**Linear-like**

- [x] Short onboarding screens (profile → role → Bitbucket → workspace → invite)
- [x] Git provider connect during onboarding (Bitbucket Cloud)
- [ ] Invite links / domain auto-join
- [ ] Sample project + first-issue checklist
- [ ] Command-palette first-run tip

**Engineering analytics**

- [x] Mandatory Bitbucket Cloud link before onboarding completes
- [x] Commit ingest + issue/project commit APIs
- [x] Workspace Admin engineering analytics
- [x] Instance Admin cross-team engineering analytics
- [x] Heuristic AI-likelihood / quality / structure insights (labeled as estimates)
