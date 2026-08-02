# Khelo Tech staging / production

This directory ships the Community CLI installer plus a **Khelo-specific** compose file that pulls images built from this fork instead of `makeplane/*`.

## Build images (local)

```bash
./scripts/khelo/build-images.sh
# or push to a registry:
REGISTRY=registry.khelotech.internal/khelo-plane TAG=staging ./scripts/khelo/build-images.sh --push
```

## Deploy staging

1. Copy `variables.env` and set at least:
   - `DOCKER_REGISTRY` — e.g. `registry.khelotech.internal/khelo-plane`
   - `APP_RELEASE` — image tag (`latest`, commit sha, etc.)
   - `SESSION_SECRET`
   - `WEB_URL`, `APP_DOMAIN`, `CORS_ALLOWED_ORIGINS`
   - DB / Redis / MinIO passwords (do not reuse trial defaults)

2. Start:

```bash
docker compose -f docker-compose.staging.yml --env-file variables.env -p khelo-staging up -d
```

3. Never run migrations against production from a laptop. Promote only after staging is green.

## CI

`bitbucket-pipelines.yml` at the repo root builds and pushes all six app images on merges to `khelo/main`.
