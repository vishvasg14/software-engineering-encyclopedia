# 12 — Helm basics (shell)

# Add a chart repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Search charts
helm search repo bitnami/postgresql

# Install a chart
helm install my-db bitnami/postgresql \
    --set auth.postgresPassword=mysecret

# List installed releases
helm list
helm list -A  # all namespaces

# Show release values
helm get values my-db
helm get manifest my-db
helm get notes my-db

# Upgrade
helm upgrade my-db bitnami/postgresql \
    --version 16.1.0 \
    --set auth.postgresPassword=newsecret

# Rollback
helm history my-db
helm rollback my-db 1

# Uninstall
helm uninstall my-db

# Dry-run (validate without applying)
helm install my-app ./mychart --dry-run --debug

# Template rendering
helm template my-app ./mychart

# Lint
helm lint ./mychart

# Show diff
helm diff upgrade my-app ./mychart

# Show release status
helm status my-app

# Search artifact hub
helm search hub redis