# 02 — Dockerfile best practices (Node.js example)

# Use specific version, not latest
FROM node:20.11-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency manifests first (cacheable layer)
COPY package.json package-lock.json ./

# Install dependencies (using cache mount for speed)
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# === Runtime stage ===
FROM node:20.11-alpine

# Add non-root user
RUN adduser -D -g '' appuser

WORKDIR /app

# Copy only what's needed
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Switch to non-root
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/healthz || exit 1

# Use exec form (not shell form)
CMD ["node", "dist/server.js"]