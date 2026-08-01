# Memcached Documentation Reference

The authoritative source for Memcached is the official documentation. This file catalogs the Memcached documentation pages referenced in the Caching document.

## Primary documentation

- **Memcached Wiki:** <https://github.com/memcached/memcached/wiki>
- **Memcached Source:** <https://github.com/memcached/memcached>
- **Memcached protocol:** <https://github.com/memcached/memcached/blob/master/doc/protocol.txt>
- **Memcached text protocol:** <https://github.com/memcached/memcached/blob/master/doc/protocol-binary.xml>

## Topics referenced

| Topic | URL |
|-------|-----|
| FAQ | <https://github.com/memcached/memcached/wiki/FAQ> |
| Commands | <https://github.com/memcached/memcached/wiki/Commands> |
| Binary protocol | <https://github.com/memcached/memcached/blob/master/doc/protocol-binary.xml> |
| ASCII protocol | <https://github.com/memcached/memcached/wiki/Protocol> |

## Architecture summary

Memcached is an in-memory key-value cache for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

Key design principles:
- Simple: just `get`, `set`, `delete`, `incr/decr`.
- Fast: pure in-memory; no persistence; no replication.
- Distributed: clients hash keys to determine which server to use.
- LRU eviction: per-slab class with internal LRU.

## Commands

| Command | Description |
|---------|-------------|
| `get <key>` | Retrieve value |
| `set <key> <flags> <exptime> <bytes>` | Store value |
| `add <key> ...` | Store only if not exists |
| `replace <key> ...` | Store only if exists |
| `delete <key>` | Delete value |
| `incr/decr <key> <value>` | Atomic counter |
| `cas <key> ...` | Compare-and-set |
| `flush_all` | Clear all entries |

## Versions

| Version | Year | Notable |
|---------|------|---------|
| 1.0 | 2003 | Initial release |
| 1.4 | 2009 | Binary protocol, `noreply` |
| 1.5 | 2015 | TLS support |
| 1.6 | 2018 | Continued improvements |
| 1.6.x | 2024 | Maintenance |

## When to choose Memcached over Redis

- Pure caching (no persistence needed).
- Very large cache (>1 TB).
- Multi-threaded server (Redis is single-threaded for command execution).
- Simpler protocol (slightly faster).
- Already in your stack (legacy compatibility).

## When NOT to choose Memcached

- Need persistence (use Redis with AOF).
- Need complex data structures (lists, sets, sorted sets — use Redis).
- Need replication / HA (use Redis Sentinel/Cluster or Memcached + Mnesia).
- Need pub/sub or streams (use Redis).
- Need transactions (use Redis).

## Clients

| Language | Client |
|----------|--------|
| Java | spymemcached, XMemcached |
| Python | pymemcache |
| Node.js | memcached (npm) |
| Go | gomemcache |
| C# | EnyimMemcached |

## Books

- *Writing Memcached Clients* — various.
- Memcached is mostly doc-driven; no major books.

## Tools

- **memcached-tool:** CLI for inspecting Memcached.
- **memcached-tool:** statistical analysis.