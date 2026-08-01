-- 15 — Declarative partitioning

-- Range partitioning by created_at
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL,
    created_at TIMESTAMPTZ NOT NULL,
    payload JSONB
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE IF NOT EXISTS events_2026_q1 PARTITION OF events
    FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');
CREATE TABLE IF NOT EXISTS events_2026_q2 PARTITION OF events
    FOR VALUES FROM ('2026-04-01') TO ('2026-07-01');
CREATE TABLE IF NOT EXISTS events_2026_q3 PARTITION OF events
    FOR VALUES FROM ('2026-07-01') TO ('2026-10-01');
CREATE TABLE IF NOT EXISTS events_2026_q4 PARTITION OF events
    FOR VALUES FROM ('2026-10-01') TO ('2027-01-01');

-- Indexes on parent propagate to partitions
CREATE INDEX events_payload_gin ON events USING gin (payload jsonb_path_ops);
CREATE INDEX events_created_idx ON events (created_at);

-- Insert sample data
INSERT INTO events (created_at, payload) VALUES
    ('2026-02-15', '{"event": "click"}'::jsonb),
    ('2026-05-20', '{"event": "view"}'::jsonb),
    ('2026-08-10', '{"event": "submit"}'::jsonb);

-- Query: partition pruning should eliminate non-matching partitions
EXPLAIN SELECT * FROM events WHERE created_at >= '2026-04-01' AND created_at < '2026-07-01';

-- Detach an old partition (e.g., for archival)
ALTER TABLE events DETACH PARTITION events_2026_q1;

-- Attach a partition
ALTER TABLE events ATTACH PARTITION events_2026_q1
    FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');

-- Cleanup
DROP TABLE events;