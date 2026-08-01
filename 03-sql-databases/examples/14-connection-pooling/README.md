# 14 — Connection Pooling with PgBouncer

## Run

```bash
docker compose up -d postgres pgbouncer
docker compose exec pgbouncer psql -h pgbouncer -p 6432 -U postgres -d selfstudy -f 14-connection-pooling/basic.sql
```

PgBouncer configuration reference: `/etc/pgbouncer/pgbouncer.ini` in the container.