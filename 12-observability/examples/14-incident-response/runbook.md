# 14 — Incident response runbook (Markdown)

# Runbook: HighErrorRate (HTTP 5xx spike)

## Alert
- **Name:** HighErrorRate
- **Severity:** Critical
- **Expression:** `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05`

## Impact
- Users see 5xx errors.
- Revenue impact (if e-commerce).
- Trust impact.

## Initial triage (5 minutes)

1. **Acknowledge the alert in PagerDuty** (or equivalent).
2. **Open dashboards**:
   - Service overview (RED metrics).
   - Recent deploys (if integration set up).
3. **Check for recent deployments**:
   - `kubectl rollout history deployment/myapp`
   - `argocd app history myapp`
4. **Check upstream / downstream**:
   - Database: `pg_stat_activity`, `pg_stat_statements` (top queries).
   - Cache: hit rate.
   - Downstream services: their dashboards.
5. **Check error logs** (Loki):
   - `{service="myapp"} |= "error" | json`
6. **Check recent incidents** (status page, similar alerts).

## Mitigation (15 minutes)

If recent deploy: **rollback**.
```bash
kubectl rollout undo deployment/myapp
# or
argocd app rollback myapp
```

If DB issue: kill long-running queries, scale up.
If downstream issue: engage their team.

If unclear: scale up.
```bash
kubectl scale deployment/myapp --replicas=10
```

## Investigation (30 minutes)

1. **Look at traces** for the failing endpoint:
   - Tempo / Jaeger.
   - Filter by status_code = 5xx.
2. **Look at slow queries** in DB.
3. **Check resource saturation**: CPU, memory, GC, threads.
4. **Recent changes**: code, config, infra.

## Communication

- Internal: Slack #incidents.
- External: status page (statuspage.io).
- Customers: support, CSMs.

## After resolution

1. **Verify** metrics back to normal.
2. **Close the alert** in PagerDuty.
3. **Update status page** (resolved).
4. **Schedule postmortem** (within 5 business days).
5. **Write the postmortem** (blameless!):
   - Timeline.
   - Contributing factors.
   - Action items.
   - Lessons learned.

## Related runbooks

- HighLatency — see [runbook-highlatency.md]
- DatabaseFailure — see [runbook-database-failure.md]
- MemoryLeak — see [runbook-memory-leak.md]

## Contacts

- **Team lead:** @team-lead
- **Database team:** @db-team
- **Incident commander:** @ic
- **Communications:** @comms
- **Security:** @security (if data breach)

## Escalation

If not resolved in 1 hour: escalate to engineering manager.
If customer-facing: involve customer success.
If data breach: involve security immediately.