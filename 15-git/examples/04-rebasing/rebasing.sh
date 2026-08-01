# 04 — Rebasing (shell)

# Basic rebase
git rebase main

# Interactive rebase
git rebase -i HEAD~5
# editor opens; commands:
# p, pick = keep
# r, reword = change message
# e, edit = change content
# s, squash = combine with previous
# f, fixup = squash, discard message
# d, drop = discard
# x, exec = run command

# Rebase onto different base
git rebase --onto newbase upstream branch

# Autosquash
git rebase --interactive --autosquash
# use git commit --fixup=<commit-hash> first
# then rebase --autosquash to apply

# Abort rebase
git rebase --abort

# Continue after resolving conflicts
git rebase --continue

# Skip current commit
git rebase --skip

# Pull with rebase
git pull --rebase

# Force-push after rebase (your own branch only)
git push --force-with-lease origin feature-x
# NEVER use --force on shared branches

# Rebase onto remote main
git fetch origin
git rebase origin/main

# Rebase interactive with autosquash
# 1. Make fixup commits
git commit --fixup=<original-commit>
# 2. Interactive rebase with autosquash
git rebase -i --autosquash HEAD~5
# Auto-squashes fixup into original

# When to rebase
# - Updating your feature branch
# - Cleaning up local history
# - Before merging to share branch (trunk-based dev)

# When NOT to rebase
# - Shared branches (main, develop, etc.)
# - Already published commits
# - Someone else has your commits

# Recover from bad rebase
git reflog
git reset --hard <sha-before-rebase>

# Pull --rebase
git config --global pull.rebase true

# Force-with-lease (safer than --force)
git push --force-with-lease

# Rebase only commits (not all history)
git rebase --onto main HEAD~5
