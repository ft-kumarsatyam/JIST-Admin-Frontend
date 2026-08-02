# NestJS backend

> Created by Satyam Kumar

**Live API:** [`../../plane-backend/`](../../plane-backend/) — NestJS 11 + Prisma + Postgres on `:8000`.

## Deploy (Nest-only)

Compose: [`../deployments/cli/community/docker-compose.yml`](../../deployments/cli/community/docker-compose.yml)

- Builds/runs `khelo-tech/plane-backend` from the Nest Dockerfile
- `migrator` runs `prisma db push`
- **No** Django `worker` / `beat-worker` / RabbitMQ
- Legacy Django compose archived as `docker-compose.django.legacy.yml`

Env template: `deployments/cli/community/variables.env` (`SESSION_SECRET`, `DATABASE_URL`, …).

Local API: see `plane-backend/README.md`. Point `VITE_API_BASE_URL` at Nest only.
