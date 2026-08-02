# Khelo Tech Frontend

> Created by Satyam Kumar

Web / admin / space apps for **Khelo Tech**. Brand source: [khelo.tech](https://www.khelo.tech/).

Backend lives in a **separate repo**: https://github.com/ft-kumarsatyam/JIST-Backend

Frontend GitHub remotes (same monorepo, different Vercel root dirs):

- Web: https://github.com/ft-kumarsatyam/Jist-Web_frontend → Vercel Root `apps/web` (see `vercel.web.json`)
- Admin: https://github.com/ft-kumarsatyam/JIST-Admin-Frontend → Vercel Root `apps/admin` (see `vercel.admin.json`)

## Quick start

```bash
pnpm install
# API (Nest) must be running on :8000 from plane-backend
echo 'VITE_API_BASE_URL=http://localhost:8000' >> apps/web/.env
pnpm --filter=web dev
```

## What was removed

- Django `apps/api` (Nest is the only API)
- khelo-tech upstream remote (use only `khelo-tech-PMM` / `khelo-tech-PMM-Backend`)

Optional Redis / MinIO for helpers: `docker compose -f docker-compose-local.yml up -d`  
Deploy stack (Nest, no Celery): `deployments/cli/community/docker-compose.yml`

## Brand

Primary `#753FC9`, soft lilac `#F4EEFD`. Product name **Khelo Tech**.
