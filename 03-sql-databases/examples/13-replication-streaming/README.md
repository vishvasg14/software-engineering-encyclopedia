# 13 — Streaming Replication

## Run (with two PG instances)

```bash
# docker-compose with primary + replica
docker compose up -d

# On primary
docker compose exec postgres psql -U postgres -d selfstudy -f 13-replication-streaming/primary.sql

# On replica
docker compose exec postgres-replica psql -U postgres -d selfstudy -f 13-replication-streaming/replica.sql
```

For a single-instance demo, the SQL files show the configuration queries.