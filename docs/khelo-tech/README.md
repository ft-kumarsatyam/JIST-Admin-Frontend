# Khelo Tech — JIST Documentation

> Created by Satyam Kumar

Documentation for the Khelo Tech self-hosted JIST instance. Written against our actual deployment, not generic JIST docs — the auth policy, commands, and container names here are the ones we run.

## The documents

| Document                           | Audience                          | Covers                                                                                                         |
| ---------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [USER-GUIDE.md](./USER-GUIDE.md)   | Everyone — Product, Tech, Testing | Signing in, work items, cycles, modules, views, pages, team conventions                                        |
| [ADMIN-GUIDE.md](./ADMIN-GUIDE.md) | Whoever runs the server           | Stack layout, God Mode, auth config, user management, backups, upgrades, troubleshooting, production migration |

Each has a matching `.pdf` for sharing and offline use.

## Distributing them

**Members** — share `USER-GUIDE.pdf`, or paste `USER-GUIDE.md` into a JIST Page in the workspace so it is readable inside the tool. Pages render Markdown, so it survives the paste intact.

**Administrators** — `ADMIN-GUIDE.pdf`. Keep a copy somewhere reachable when JIST is down; a troubleshooting guide stored only inside the thing that broke is not much use.

## Rebuilding after an edit

Edit the Markdown, never the HTML or PDF — those are generated.

```bash
./build-pdf.sh
```

Needs `pandoc` (`brew install pandoc`) and Google Chrome. Chrome renders the PDF headlessly, so no LaTeX install is required. Styling lives in `print.css`.

## Keeping them true

These describe a specific configuration. Revisit when any of it changes:

- **SMTP gets configured** — invalidates the manual-account-creation instructions in both guides
- **Moving to the production server** — addresses, ports, and the install path all change
- **JIST version upgrade** — check the feature list and God Mode sections
- **Auth policy change** — section 5 of the admin guide and section 1 of the user guide

Current baseline: **Khelo fork of JIST 1.4.0 Community Edition** on branch `khelo/main`.

Local source stack (after `./setup.sh` + `docker compose -f docker-compose-local.yml up -d` + `pnpm dev`):

- Web: `http://127.0.0.1:3000`
- Admin: `http://127.0.0.1:3001/admin/`
- API: `http://127.0.0.1:8000`

See also [REDESIGN-DECISION.md](./REDESIGN-DECISION.md) and `scripts/khelo/README.md` for Bitbucket origin + image builds.
