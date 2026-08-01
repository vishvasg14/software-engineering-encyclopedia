# 03 — Git merging (shell)

# Basic merge
git merge feature-x

# Fast-forward only (no merge commit)
git merge --ff-only feature-x

# Force merge commit (no fast-forward)
git merge --no-ff feature-x

# Squash (one commit on main)
git merge --squash feature-x
git commit -m "Add feature X"

# Octopus (merge multiple branches)
git merge branch-a branch-b

# Ours or theirs (resolve conflict)
git merge --strategy-option=ours feature-x
git merge --strategy-option=theirs feature-x

# Recursive (default)
git merge --strategy=recursive feature-x

# Resolve conflicts
# 1. Edit files to resolve
# 2. git add <file>
# 3. git commit (if no fast-forward)
# Or: git merge --continue (after resolving)

# Abort merge
git merge --abort

# Resolve using mergetool
git mergetool

# Abort mergetool
git mergetool --abort

# Find common ancestor
git merge-base main feature-x
git merge-base --is-ancestor main feature-x  # is main ancestor of feature-x?

# Octopus
git merge branch-a branch-b branch-c

# Ours/theirs for specific file
git checkout --ours <file>
git checkout --theirs <file>

# Resolved conflict
git add <file>
git status  # check

# Show conflict markers
cat <file>
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> branch-x

# Mark as resolved
git add <file>

# Abort merge
git merge --abort

# Continue after resolving
git merge --continue

# Diff after merge
git diff HEAD~1 HEAD

# Log after merge
git log --oneline -5

# Show merge commit
git show HEAD

# 3-way merge
git merge --strategy=recursive feature-x

# Show common ancestor
git show $(git merge-base main feature-x)

# Force-push after rebase (your own branch)
git push --force-with-lease origin feature-x

# NEVER force-push to shared branches (main, develop, etc.)

# Reset merge (cancel)
git merge --abort

# Continue merge after resolving
git merge --continue

# Show conflicts
git diff --name-only --diff-filter=U
# U = unmerged

# Use rerere to remember resolutions
git config rerere.enabled true

# Use recursive strategy (default)
git merge --strategy=recursive

# Use ort strategy (3-way merge with conflict markers)
git merge --strategy=ort

# Resolve using rerere
# 1. Resolve conflict
# 2. git add <file>
# 3. Rerere records the resolution
# 4. Next similar conflict: rerere auto-resolves

# Check if conflict
git diff --name-only --diff-filter=U

# Manual conflict resolution example
cat <<'EOF' > file.txt
common line
<<<<<<< HEAD
our changes
=======
their changes
>>>>>>> branch-x
more common
EOF
git add file.txt

# Use git rerere to remember
git config rerere.enabled true
# Resolve once; rerere auto-applies next time

# Use git rerere status
git rerere status

# Resolve merge conflicts with vimdiff or VSCode
git mergetool
# Configure: git config merge.tool vimdiff

# Abort and restart merge
git merge --abort
git pull
git merge --no-ff feature-x

# Show conflict resolution
git log --oneline --graph -10

# Show merge parents
git show HEAD
# First parent is the branch you were on
# Second parent is the merged branch

# Squash merge (linear history)
git merge --squash feature-x
git commit -m "Add feature X (squashed)"

# No-ff merge (always create merge commit)
git merge --no-ff feature-x

# Fast-forward only (fail if not FF)
git merge --ff-only feature-x

# No fast-forward (create merge commit even if FF possible)
git merge --no-ff feature-x

# Show merge base
git merge-base main feature-x

# Check if branches have diverged
git merge-base --is-ancestor feature-x main

# Three-way merge
git merge --strategy=recursive main

# Conflict resolution
# Edit files, remove conflict markers
# git add <file>
# git commit

# Show file at a specific commit
git show <commit-sha>:<file>

# Reset to before merge
git reset --hard HEAD@{1}

# Cherry-pick instead of merge
git cherry-pick <commit>

# Rebase instead of merge
git rebase main
git rebase --interactive main