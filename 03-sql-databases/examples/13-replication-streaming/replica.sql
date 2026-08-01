-- 13b — On the replica: standby setup

-- Create base backup from primary
-- $ pg_basebackup -h primary -D /var/lib/pgsql/data -U replicator -P -X stream

-- In standby: touch standby.signal (PG 12+)
-- $ touch /var/lib/pgsql/data/standby.signal

-- Set primary connection info in postgresql.auto.conf:
--   primary_conninfo = 'host=primary port=5432 user=replicator password=secret'
--   primary_slot_name = 'replica_slot'

-- Start the standby
-- $ pg_ctl start -D /var/lib/pgsql/data

-- Check status
SELECT pg_is_in_recovery();        -- should be true

-- Check lag (only on primary; on replica, check the read-only state)
SELECT
    pg_last_wal_receive_lsn(),
    pg_last_wal_replay_lsn(),
    pg_last_xact_replay_timestamp();

-- Promote to primary (if needed)
-- $ pg_ctl promote -D /var/lib/pgsql/data
-- or SELECT pg_promote();