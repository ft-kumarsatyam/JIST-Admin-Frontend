# Nest vs Plane (Python) API coverage

> Created by Satyam Kumar · August 2026

Inventory of what the **web + admin** frontends call vs what **Nest (`plane-backend`)** implements. Goal: Nest replaces Django for Khelo/JIST — not every Plane CE/Pro path overnight.

## Summary

| | Count (approx) |
|--|--|
| FE soft path templates | ~270 |
| Nest implemented | ~130+ core + Board + stubs |
| Still missing / stubbed | ~150 advanced paths |

**Strategy**

1. **Real Nest modules** for board core: auth, users, workspaces, projects, issues, cycles, modules, pages, views, stickies, instance admin, Bitbucket, mail.
2. **`PlaneStubsController`** returns safe empties (`[]` / `EMPTY_PAGINATED` / `{}`) so the UI does not hard-404 on Plane CE routes we have not built yet.
3. **Out of scope for now:** Space / live apps (removed from repo), full assets/S3 v2, importers, AI assistant, cycle analytics charts, issue reactions persistence.

## Covered for real (Postgres)

- Auth email sign-in/up/out, CSRF, email-check
- Users me/profile/onboard/workspaces/invitations/project-roles
- Instance + God Mode ops (overview, users, work-items, activity, notifications, configs, workspaces)
- Workspaces CRUD, members, invites + SMTP, favorites, labels, notifications unread
- Projects CRUD, states, members
- Issues CRUD (project + **workspace** list), labels, display props, bulk ops, history/sub-issues (thin)
- Board: cycles/modules CRUD + issue membership, pages/views/stickies/estimates/inbox lists, drafts
- Prefs/states in Postgres
- Bitbucket OAuth + engineering analytics
- Unsplash proxy (empty without key)

## Stubbed (no 404; empty / noop)

See `src/modules/compat/plane-stubs.controller.ts` + `plane-auth-stubs.controller.ts`:

- `timezones`, `configs`, `release-notes`, `integrations`
- Workspace `search`, `entity-search`, `active-cycles`, `my-issues`, `quick-links`, `recent-visits`, export/reporting shells
- Issue meta / reactions / comments POST / relations / subscribe
- Cycle analytics/progress empties; view-by-id shell
- Asset v2 upload shells (no storage)
- Forgot-password / magic-generate public stubs

## Still thin / next real work

| Priority | Area | Notes |
|----------|------|--------|
| P0 | Issue comments + activity persistence | POST comment currently stub; need Comment model |
| P0 | File assets / attachments | MinIO + assets v2 |
| P1 | Search (issues / entities) | Postgres full-text or simple `contains` |
| P1 | Notifications list depth | Archive, per-id read already partial |
| P1 | Cycle progress / analytics | Compute from issue states |
| P2 | Pages editor (versions, lock) | Description versions |
| P2 | Space / live surfaces | Re-add only if product needs them |
| P3 | Importers / Slack / GitHub sync | Optional |

## Admin vs web

| Surface | Nest status |
|---------|-------------|
| Admin God Mode | Largely real (instance module) |
| Web board boot | Real projects/issues + Board + stubs for noise |
| Web advanced | Stubbed until listed P0/P1 |

## How to re-check gaps

From `Projects/plane`:

```bash
# Extract FE paths vs Nest controllers (see agent scripts / regenerate this doc)
rg -n "@Controller|@(Get|Post|Patch|Delete)" plane-backend/src --glob '*.controller.ts' | wc -l
```

When a browser network tab shows a **404**, add either a real handler or a stub in `PlaneStubsController` — do not leave hard 404s for Plane CE paths the shell always hits.
