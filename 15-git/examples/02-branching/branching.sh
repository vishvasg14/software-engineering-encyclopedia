# 02 — Git branching (shell)

# List branches
git branch             # local
git branch -r          # remote
git branch -a          # all
git branch -vv         # verbose

# Create branch
git branch feature-x
git branch -b feature-x main  # create and switch

# Switch branches
git checkout feature-x
git switch feature-x              # newer
git switch -c new-feature         # create + switch
git switch -       # previous branch

# Rename branch
git branch -m old-name new-name
git branch -m new-name             # current branch

# Delete branch
git branch -d feature-x            # safe (merged)
git branch -D feature-x            # force
git push origin :feature-x          # delete remote

# Track remote
git branch -u origin/main main

# Compare branches
git diff main..feature-x
git diff main...feature-x    # common ancestor

# List branches merged into main
git branch --merged main
git branch --no-merged main

# Show branch tracking
git branch -vv
git config branch.<name>.remote origin
git config branch.<name>.merge refs/heads/main

# Worktree
git worktree add ../hotfix main
git worktree add ../experiment new-feature
git worktree list
git worktree remove ../hotfix

# Cherry-pick
git cherry-pick <commit>
git cherry-pick <commit1> <commit2>
git cherry-pick -x <commit>  # add source to message
git cherry-pick --abort      # cancel

# Reset to a commit
git reset <sha>            # soft (keep changes)
git reset --mixed <sha>     # default (unstage)
git reset --hard <sha>      # discard changes

# Revert (safe)
git revert <sha>
git revert <sha> --no-edit  # don't auto-commit

# Tag
git tag
git tag v1.0.0
git tag -a v1.0.0 -m "Release"
git push --tags
git tag --list
git tag -d v1.0.0

# Submodule
git submodule add <url> path
git submodule init
git submodule update --init --recursive

# Archive
git archive --format=tar.gz main > release.tar.gz
git archive --format=zip main > release.zip

# Blame
git blame <file>
git blame -L 10,20 <file>

# Bisect
git bisect start
git bisect bad
git bisect good v1.0
# mark each commit good or bad
git bisect reset

# Reflog
git reflog
git reflog show main
git reflog expire --expire=30.days

# Worktree
git worktree add -b hotfix main
git worktree list
git worktree remove <path>

# Show file at a specific commit
git show <sha>:<file>

# Compare branches
git log main..feature-x
git log --oneline main..feature-x

# Squash commits (interactive rebase)
git rebase -i HEAD~3
# editor opens; pick, squash, fixup, drop

# Revert multiple commits
git revert <sha1>
git revert <sha2>
# Creates two revert commits; or --no-commit to combine

# Reset soft vs hard
git reset HEAD~3              # soft: keeps changes
git reset --soft HEAD~3        # soft
git reset --mixed HEAD~3       # mixed (default): keeps working, unstage
git reset --hard HEAD~3       # hard: discards changes (DANGER)

# Reset vs Revert
git reset <sha>      # rewrite history (local only)
git revert <sha>     # create reverse commit (safe for shared)

# Reflog
git reflog
git reflog show feature-x

# Show only file names
git show --name-only <sha>
git diff --name-only main

# Bisect with tests
git bisect start
git bisect bad HEAD
git bisect good v1.0
git bisect run npm test

# Cherry-pick multiple
git cherry-pick <sha1> <sha2> <sha3>
git cherry-pick --abort

# Revert with no commit
git revert <sha> --no-commit
# Then make additional changes
git commit

# Revert a range
git revert <sha1>..<sha2>

# Submodule
git submodule add https://github.com/user/repo.git path
git submodule update --init --recursive
git submodule foreach git pull origin main

# Revert vs Reset in PR
# Use reset on your local branch (rewrites your history)
# Use revert on shared branches (creates reverse commit)

# Cherry-pick to a different branch
git checkout main
git cherry-pick <sha>

# Use --strategy for merge
git merge --strategy=ours feature-x
git merge --strategy=recursive main

# Force-push safely
git push --force-with-lease

# Tag for releases
git tag -a v1.0.0 -m "Release 1.0.0"
git push --tags

# Show diff for a commit
git show <sha>
git show <sha> --stat
git show <sha> --name-only

# Bisect for bug
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# test and mark each commit

# Cleanup
git gc
git gc --aggressive
git prune

# Revert vs Reset (which to use when)
# Reset: local branch, you own it
# Revert: shared branch, safe for everyone

# Stash
git stash
git stash list
git stash apply stash@{0}
git stash pop
git stash drop stash@{0}
git stash clear

# Worktree
git worktree add -b fix main /path/to/branch
git worktree list

# Submodule
git submodule add <url> path
git submodule update --init --recursive

# Clean
git clean -fd
git clean -fdx
git clean -n          # dry run

# Show
git show <sha>
git show <sha>:<file>

# Diff with context
git diff -U5 <file>
git diff --stat
git diff --name-only

# Log
git log
git log --oneline
git log --graph
git log --author="Alice"
git log --since="1 week ago"

# Reset vs Revert in detail
# Reset: changes commit history (rewrites)
# Revert: creates new commit that undoes
# Use reset on local branches you own
# Use revert on shared branches (safe)

# Cherry-pick with conflicts
git cherry-pick <sha>
# If conflicts:
# 1. Resolve conflicts
# 2. git add
# 3. git cherry-pick --continue
# Or:
# git cherry-pick --abort

# Rebase onto branch
git rebase main
git rebase --interactive main

# Force-push after rebase
git push --force-with-lease
# NEVER use --force on shared branches

# Tag with annotation
git tag -a v1.0.0 -m "Release 1.0.0"
git tag -s v1.0.0 -m "Signed release"

# Push tags
git push --tags
git push origin v1.0.0

# Bisect for regression
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# test and mark

# Find when bug introduced
git log --all --grep "bug description"
git log -S "function_name"

# Revert merge commit
git revert -m "Revert merge" <merge-sha>

# Worktree for parallel work
git worktree add ../experiment new-feature
cd ../experiment
# work independently
cd ..
git worktree remove ../experiment