# 15 — Git & Versioning

This chapter treats Git at production depth: Git's data model (objects, refs, pack files, reflog), common commands, branching strategies (Git Flow, GitHub Flow, trunk-based, GitLab Flow), SemVer for releases, hooks and automation, and GitOps.

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Git & Versioning](./git.md) | The flagship document: Git deep, branching, SemVer, hooks, GitOps | 🚧 In progress |

## Related chapters

- [09 — System Design & Distributed Systems](../09-system-design/README.md) — Reproducibility; infrastructure as code.
- [10 — DevOps (Docker, Kubernetes, Helm, Istio)](../10-devops/README.md) — GitOps with ArgoCD/Flux.
- [13 — Security (OWASP, OAuth2, JWT, Encryption)](../13-security/README.md) — Secrets in git; signed commits; branch protection.
- [14 — Testing (Unit, Integration, Contract, Chaos)](../14-testing/README.md) — CI test pipeline; trunk-based development.

## Learning Path

1. Overview → Definition → Five Ws
2. History → Problem Statement → Real-World Motivation
3. Internal Working → Deep Dive (Internals → Commands → Branching → Merging → Rebasing → Hooks → SemVer → Release workflows → GitOps)
4. Architecture → Performance → Security
5. Production Engineering → Production Case Studies
6. Code Examples → Common Mistakes → Debugging
7. Monitoring & Observability → Best Practices → Anti-Patterns
8. Edge Cases → Comparisons
9. Interview Preparation
10. References

## Prerequisites

Assumed knowledge:

- Basic Git usage (add, commit, push, pull).
- Basic shell.

## Version Baselines

- **Git:** 2.40+.
- **GitHub:** 2024+ features.
- **GitLab:** 17+.
- **SemVer:** 2.0.0.

## Folder Layout

```
15-git/
├── README.md
├── git.md
├── diagrams/
├── examples/                       # 14 Git examples
│   ├── 01-git-basics/
│   ├── 02-branching/
│   ├── 03-merging/
│   ├── 04-rebasing/
│   ├── 05-stashing/
│   ├── 06-cherry-picking/
│   ├── 07-submodules/
│   ├── 08-hooks/
│   ├── 09-git-flow/
│   ├── 10-github-flow/
│   ├── 11-trunk-based/
│   ├── 12-semver/
│   ├── 13-release-workflow/
│   └── 14-gitops/
└── references/
    ├── git-docs.md
    ├── pro-git-book.md
    └── semver.md
```