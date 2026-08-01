# Docker Documentation Reference

The authoritative source for Docker is the official documentation. This file catalogs the Docker documentation pages referenced in the DevOps document.

## Primary documentation

- **Docker Documentation:** <https://docs.docker.com/>
- **Docker Hub:** <https://hub.docker.com/>
- **Docker GitHub:** <https://github.com/docker>
- **Docker Engine source:** <https://github.com/moby/moby>

## Topics referenced in the document

| Topic | URL |
|-------|-----|
| Get started | <https://docs.docker.com/get-started/> |
| Engine | <https://docs.docker.com/engine/> |
| Dockerfile reference | <https://docs.docker.com/reference/dockerfile/> |
| Docker build | <https://docs.docker.com/build/> |
| Multi-stage builds | <https://docs.docker.com/build/building/multi-stage/> |
| Best practices | <https://docs.docker.com/build/building/best-practices/> |
| Compose | <https://docs.docker.com/compose/> |
| Networking | <https://docs.docker.com/network/> |
| Storage / volumes | <https://docs.docker.com/storage/volumes/> |
| Security | <https://docs.docker.com/security/> |
| Docker Hub | <https://docs.docker.com/docker-hub/> |
| BuildKit | <https://docs.docker.com/build/buildkit/> |

## Dockerfile reference

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image |
| `RUN` | Execute a command in a new layer |
| `COPY` | Copy files from build context |
| `ADD` | Like COPY but supports URLs and tar extraction |
| `CMD` | Default command (overridable) |
| `ENTRYPOINT` | Default executable (less overridable) |
| `WORKDIR` | Set working directory |
| `ENV` | Set environment variable |
| `ARG` | Build-time variable |
| `EXPOSE` | Document a port |
| `LABEL` | Metadata |
| `USER` | Set user |
| `VOLUME` | Declare a volume |
| `HEALTHCHECK` | Health check command |

## BuildKit features

- **BuildKit:** modern build engine (Docker 23+).
- **Mounts:** `RUN --mount=type=cache,target=/root/.cache`.
- **Secrets:** `RUN --mount=type=secret,id=...`.
- **Multi-platform:** `--platform=linux/amd64,linux/arm64`.

## Docker security

- **Distroless images:** <https://github.com/GoogleContainerTools/distroless>
- **Image scanning:** Trivy, Snyk, Clair.
- **User namespaces:** Docker 20.10+.
- **Rootless mode:** Docker daemon without root.
- **Content trust:** deprecated; replaced by Sigstore/cosign.

## Docker Compose

```yaml
services:
    app:
        build: .
        ports:
            - "3000:3000"
        environment:
            DATABASE_URL: postgres://db:5432
        depends_on:
            - db
    db:
        image: postgres:16-alpine
        volumes:
            - db-data:/var/lib/postgresql/data

volumes:
    db-data:
```

## Tools

- **BuildKit:** modern build engine.
- **docker-compose:** multi-container orchestration.
- **Buildx:** extended build capabilities.
- **Dive:** image layer analyzer.
- **Trivy:** vulnerability scanner.
- **Snyk:** vulnerability scanner.
- **cosign:** image signing (Sigstore).
- **Docker Scout:** Docker's built-in scanner.

## Editions

| Edition | Year | Notes |
|---------|------|-------|
| Docker 1.0 | 2014 | First stable |
| Docker CE / EE | 2017 | Community / Enterprise split |
| Docker Desktop | 2018 | macOS / Windows |
| Docker 20.10 | 2020 | Rootless mode, cgroups v2 |
| Docker 23+ | 2023 | BuildKit default |
| Docker 25+ | 2024 | Latest |
| Docker 26+ | 2025 | Continued improvements |

## Alternatives

- **Podman:** drop-in replacement by Red Hat.
- **containerd:** CNCF graduated; underlying container runtime.
- **CRI-O:** Kubernetes-native runtime.
- **Buildah:** image builder focused on OCI compliance.