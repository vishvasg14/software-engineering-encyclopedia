# 12 — WAL and Crash Recovery (Point-in-Time Recovery)

## Run

```bash
docker compose exec postgres psql -U postgres -d selfstudy -f 12-wal-and-crash-recovery/basic.sql
```

This example assumes `wal_level=replica` and `archive_mode=on` (PostgreSQL config).

For a complete PITR demo, use `pg_basebackup` + WAL archive. See references for details.