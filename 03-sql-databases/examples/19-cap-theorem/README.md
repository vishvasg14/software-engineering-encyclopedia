# 19 — CAP Theorem Decision Matrix

CAP says: in the presence of a network partition (P), a distributed system must choose between Consistency (C) and Availability (A).

| System | P | C | A | When partition happens |
|--------|---|---|---|------------------------|
| **PostgreSQL (single primary)** | Single region | Strong | Becomes unavailable for writes if primary dies | Replica promoted; brief unavailability |
| **PostgreSQL (multi-primary)** | Cross-region | Eventual (depends on config) | Available | Conflict resolution required |
| **MySQL Group Replication** | Cross-region | Strong (synchronous) | Limited (must reach quorum) | Loses writes if no quorum |
| **CockroachDB** | Cross-region | Strong (serializable) | Available (latency) | Reads/writes continue at the cost of latency |
| **TiDB** | Cross-region | Strong (when configured) | Available | Region-aware failover |
| **MongoDB** | Cross-region | Tunable (w:majority vs w:1) | Configurable | Lower consistency = higher availability |
| **Cassandra** | Cross-region | Eventual | Available | Writes continue; reads may be stale |
| **DynamoDB** | Cross-region | Eventual (or strong with global tables) | Available | Same as Cassandra |
| **Redis Cluster** | Single or multi | Eventual | Available | Replica failover |

**PACELC extension:** Even when there is no partition, the system must still choose between Latency (L) and Consistency (C).

- **PA/EL** (DynamoDB, Cassandra) — favor availability and latency.
- **PC/EC** (Spanner) — favor consistency, even at latency cost.
- **PA/EC** (Cosmos DB) — availability during partition, consistency otherwise.

## Choosing a database

For OLTP with strong consistency: PostgreSQL, MySQL with sync replicas, CockroachDB.
For OLTP with availability: Cassandra, DynamoDB.
For analytics: Snowflake, BigQuery, ClickHouse.
For caching: Redis, Memcached.

## PostgreSQL example: synchronous vs asynchronous

In `postgresql.conf`:

```ini
# Async (default for streaming replication)
# No setting required

# Synchronous replication (waits for replica ack)
synchronous_standby_names = 'replica1'
synchronous_commit = on  # or 'remote_apply' for stricter
```

With sync replication, durability is higher but latency increases (network round-trip to replica).