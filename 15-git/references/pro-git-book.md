# Pro Git Book Reference

The canonical book on Git is *Pro Git* by Scott Chacon and Ben Straub. It is freely available online and is the most authoritative source for understanding Git's internals and best practices.

## Book info

- **Title:** Pro Git (2nd Edition)
- **Authors:** Scott Chacon, Ben Straub
- **Publisher:** Apress
- **Year:** 2014 (2nd edition)
- **Free online:** <https://git-scm.com/book/en/v2
- **Repository:** <https://github.com/progit/progit2>

## Key chapters for our document

| Chapter | URL | Topic |
|---------|-----|-------|
| 1. Getting Started | <https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control> | VCS overview |
| 2. Git Basics | <https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository> | Add, commit, status |
| 3. Git Branching | <https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell> | Branches and merging |
| 5. Distributed Git | <https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows> | Centralized, integration manager, dictator-and-lieutenants |
| 7. Git Internals | <https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain> | Plumbing commands, object database |
| 8. Git Internals — Objects | <https://git-scm.com/book/en/v2/Git-Internals-Git-Objects> | Blob, tree, commit, tag |
| 9. Git Internals — Refs | <https://git-scm.com/book/en/v2/Git-Internals-Git-References> | Branches, tags, HEAD |
| 10. Git Internals — Packfiles | <https://git-scm.com/book/en/v2/Git-Internals-Packfiles> | Pack files, deltas |
| 13. Git Branching — Branching Workflows | <https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows> | Long-running, topic, Git Flow, fork |
| 14. Git Branching — Remote Branches | <https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches> | Tracking, pushing, fetching |
| 15. Git Branching — Rebasing | <https://git-scm.com/book/en/v2/Git-Branching-Rebasing> | Rebase, rebase risks, rebase vs merge |

## Key concepts from Pro Git

### The three states

```
modified → staged → committed
   ↑         ↑         ↑
 edit     git add   git commit
         git reset
```

Files in your working directory:
- **Modified:** changed but not staged.
- **Staged:** added to index.
- **Committed:** data safely stored in local database.

### Object model

Git's data model: snapshot-based, not delta-based. Four object types:

- **Blob:** file content.
- **Tree:** directory listing (blobs + subtrees).
- **Commit:** snapshot with parent(s).
- **Tag:** annotated ref pointing to a commit.

### Refs

- **Branch:** ref to a commit (e.g., `refs/heads/main`).
- **Tag:** ref to a tag object (lightweight or annotated).
- **HEAD:** ref to current branch (or detached commit).

### Branches

- **master / main:** default branch.
- **Topic branches:** short-lived for a feature.
- **Remote branches:** refs/remotes/origin/<branch>.
- **Tags:** releases.

### Merging

Three-way merge: common ancestor + two branches. Produces a merge commit (or fast-forwards).

### Rebasing

Replay your commits on top of another branch. Linear history. **Never rebase public branches** (rewrites history).

## Workflows from Pro Git

### Centralized workflow

Single central repo, main branch. One dev at a time on main.

### Integration-manager workflow

Maintainer integrates changes from contributors.

### Dictator-and-lieutenants workflow

Linux kernel model. Lieutenants maintain subsystems, dictator merges.

## Other references

- **Git internals docs:** <https://git-scm.com/docs/git-add#_description>
- **GitHub training:** <https://services.github.com/training/>
- **GitLab Learn:** <https://about.gitlab.com/learn/>
- **Version Control with Git** — Jon Loeliger, Matthew McCullough (O'Reilly).
- **Git for Teams** — Emma Jane Hogbin Westby (O'Reilly).