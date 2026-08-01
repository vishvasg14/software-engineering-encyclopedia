# 01 — Docker basics (shell)

# Pull an image
docker pull node:20-alpine

# List images
docker images

# Run a container
docker run -d --name my-app -p 3000:3000 myorg/my-app:1.0.0

# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs my-app

# Execute a command in a running container
docker exec -it my-app sh

# Stop and remove a container
docker stop my-app
docker rm my-app

# Remove an image
docker rmi myorg/my-app:1.0.0

# Build an image from Dockerfile
docker build -t myorg/my-app:1.0.0 .

# Tag an image
docker tag myorg/my-app:1.0.0 myorg/my-app:latest

# Push to a registry
docker login
docker push myorg/my-app:1.0.0

# Inspect a container
docker inspect my-app

# View container resource usage
docker stats

# Network commands
docker network ls
docker network create my-network
docker network connect my-network my-app

# Volume commands
docker volume ls
docker volume create my-volume
docker run -v my-volume:/data myorg/my-app:1.0.0

# Clean up
docker system prune -a
docker system df