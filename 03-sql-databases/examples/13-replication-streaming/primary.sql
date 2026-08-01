-- 13a — On the primary: check replication setup

-- Replication config (postgresql.conf):
--   wal_level = replica
--   max_wal_senders = 5
--   archive_mode = on
--   archive_command = 'cp %p /var/lib/pgsql/wal-archive/%f'

-- Create replication user
CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'secret';

-- Allow replication from replica
-- pg_hba.conf:
--   host replication replicator 0.0.0.0/0 md5

-- Check replication status
SELECT * FROM pg_stat_replication;

-- Check current WAL location
SELECT pg_current_wal_lsn();

-- Check replication slots
SELECT * FROM pg_replication_slots;