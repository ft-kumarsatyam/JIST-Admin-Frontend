# JIST Community All-In-One (AIO) Docker Image

> **Khelo / JIST note:** Preferred deploy is the Nest compose at `deployments/cli/community/docker-compose.yml` (no Django worker/beat/RabbitMQ). The AIO image below is upstream-shaped and may still assume a Python API — do not use it for Khelo production until it is rebuilt around Nest.

The JIST Community All-In-One Docker image packages frontend surfaces into a single container for easy testing.

## What's Included (upstream shape)

- **Web / Admin / Proxy** (`apps/live` and `apps/space` removed — not in this fork for now)
- **API:** for Khelo, run Nest from `plane-backend` instead of the bundled Django API
- **Worker & Beat / RabbitMQ:** retired for Nest — omit them

## Prerequisites

### Required External Services

- **PostgreSQL Database**
- **Redis** (optional for Nest)
- **S3-Compatible Storage** (MinIO or AWS S3)

RabbitMQ is **not** required for Nest.

### Required Environment Variables

You must provide these environment variables:

#### Core Configuration

- `DOMAIN_NAME`: Your domain name or IP address
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `AMQP_URL`: RabbitMQ connection string

#### Storage Configuration

- `AWS_REGION`: AWS region (e.g., us-east-1)
- `AWS_ACCESS_KEY_ID`: S3 access key
- `AWS_SECRET_ACCESS_KEY`: S3 secret key
- `AWS_S3_BUCKET_NAME`: S3 bucket name
- `AWS_S3_ENDPOINT_URL`: S3 endpoint (optional, defaults to AWS)

## Quick Start

### Basic Usage

```bash
docker run --name plane-aio --rm -it \
    -p 80:80 \
    -e DOMAIN_NAME=your-domain.com \
    -e DATABASE_URL=postgresql://user:pass@host:port/database \
    -e REDIS_URL=redis://host:port \
    -e AMQP_URL=amqp://user:pass@host:port/vhost \
    -e AWS_REGION=us-east-1 \
    -e AWS_ACCESS_KEY_ID=your-access-key \
    -e AWS_SECRET_ACCESS_KEY=your-secret-key \
    -e AWS_S3_BUCKET_NAME=your-bucket \
    makeplane/plane-aio-community:latest
```

### Example with IP Address

```bash
MYIP=192.168.68.169
docker run --name myaio --rm -it \
    -p 80:80 \
    -e DOMAIN_NAME=${MYIP} \
    -e DATABASE_URL=postgresql://plane:plane@${MYIP}:15432/plane \
    -e REDIS_URL=redis://${MYIP}:16379 \
    -e AMQP_URL=amqp://plane:plane@${MYIP}:15673/plane \
    -e AWS_REGION=us-east-1 \
    -e AWS_ACCESS_KEY_ID=5MV45J9NF5TEFZWYCRAX \
    -e AWS_SECRET_ACCESS_KEY=7xMqAiAHsf2UUjMH+EwICXlyJL9TO30m8leEaDsL \
    -e AWS_S3_BUCKET_NAME=plane-app \
    -e AWS_S3_ENDPOINT_URL=http://${MYIP}:19000 \
    -e FILE_SIZE_LIMIT=10485760 \
    makeplane/plane-aio-community:latest
```

## Configuration Options

### Optional Environment Variables

#### Network & Protocol

- `SITE_ADDRESS`: Server bind address (default: `:80`)

#### Security & Secrets

- `SECRET_KEY`: Django secret key (default provided; unused when Nest is the API)

#### File Handling

- `FILE_SIZE_LIMIT`: Maximum file upload size in bytes (default: `5242880` = 5MB)

#### API Configuration

- `API_KEY_RATE_LIMIT`: API key rate limit (default: `60/minute`)

## Port Mapping

The following ports are exposed:

- `80`: Main web interface (HTTP)
- `443`: HTTPS (if SSL configured)

## Volume Mounts

### Recommended Persistent Volumes

```bash
-v /path/to/logs:/app/logs \
-v /path/to/data:/app/data
```

## Building the Image

To build the AIO image yourself:

```bash
cd deployments/aio/community
IMAGE_NAME=myplane-aio ./build.sh --release=v0.27.1 [--platform=linux/amd64]
```

Available build options:

- `--release`: JIST version to build (required)
- `--image-name`: Custom image name (default: `plane-aio-community`)

## Troubleshooting

### Logs

All service logs are available in `/app/logs/`:

- Access logs: `/app/logs/access/`
- Error logs: `/app/logs/error/`

### Health Checks

The container runs multiple services managed by Supervisor. Check service status:

```bash
docker exec -it <container-name> supervisorctl status
```

### Common Issues

1. **Database Connection Failed**: Ensure PostgreSQL is accessible and credentials are correct
2. **Redis Connection Failed**: Verify Redis server is running and URL is correct
3. **File Upload Issues**: Check S3 credentials and bucket permissions

### Environment Validation

The container will validate required environment variables on startup and display helpful error messages if any are missing.

## Production Considerations

- Use proper SSL certificates for HTTPS
- Configure proper backup strategies for data
- Monitor resource usage and scale accordingly
- Use external load balancer for high availability
- Regularly update to latest versions
- Secure your environment variables and secrets

## Support

For issues and support, please refer to the official JIST documentation.
