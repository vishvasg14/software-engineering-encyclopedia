# 01 — Git basics (shell)

# Initialize a new repository
git init
git init my-project

# Clone a repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder

# Status and diff
git status
git diff                # unstaged
git diff --staged        # staged
git diff main            # against main

# Stage and commit
git add file.txt
git add .                # all
git add src/             # directory
git commit -m "Add feature"
git commit --amend       # fix last commit
git commit -m "Add" --no-verify   # skip hooks

# Log and show
git log
git log --oneline
git log --graph --oneline
git log -p                # with diffs
git log --author="Alice"
git show <sha>

# Branches
git branch               # list local
git branch -a             # all
git branch feature-x       # create
git checkout feature-x    # switch
git switch feature-x      # newer
git switch -c feature-y   # create + switch

# Merge
git merge feature-x
git merge --no-ff feature-x  # force merge commit
git rebase main            # rebase onto main
git rebase -i HEAD~3        # interactive rebase

# Stash
git stash                 # save uncommitted
git stash list
git stash pop             # apply + drop
git stash apply stash@{0}  # apply without dropping
git stash drop stash@{0}

# Remotes
git remote -v
git remote add origin https://github.com/user/repo.git
git fetch origin
git pull                  # fetch + merge
git pull --rebase         # fetch + rebase
git push                  # push
git push --set-upstream origin main
git push --force-with-lease  # safer force push

# Tags
git tag                   # list
git tag v1.0.0            # lightweight
git tag -a v1.0.0 -m "Release"  # annotated
git push --tags

# Undo
git restore <file>        # undo working dir changes
git restore --staged <file>  # unstage
git reset HEAD~1           # undo last commit (local)
git reset --hard HEAD~1    # discard changes
git revert <sha>          # create revert commit

# Stashing
git stash
git stash pop

# Tags
git tag v1.0.0
git tag -d v1.0.0         # delete local
git push origin :v1.0.0   # delete remote

# Bisect (find bad commit)
git bisect start
git bisect bad
git bisect good v1.0.0
# git checks out commits; mark good or bad
git bisect reset

# Worktrees
git worktree add ../hotfix main
git worktree list

# Config
git config user.name "Alice"
git config user.email "alice@example.com"
git config --global core.autocrlf input
git config --global core.fsmonitor true

# Aliases
git config alias.co "checkout"
git config alias.br "branch"
git config alias.st "status"
git config alias.lg "log --oneline --graph"

# Stash
git stash
git stash pop

# Show
git show <sha>
git show HEAD~3

# Diff
git diff
git diff --cached
git diff main

# Log
git log
git log --oneline
git log -p

# Status
git status
git status -s  # short

# Branch
git branch
git branch <name>
git branch -d <name>

# Switch
git checkout <name>
git switch <name>
git switch -c <name>

# Merge
git merge <name>
git rebase <name>

# Remote
git remote -v
git remote add <name> <url>
git remote remove <name>

# Fetch
git fetch
git pull
git push

# Tag
git tag
git tag <name>
git tag -d <name>

# Stash
git stash
git stash pop

# Log
git log
git log --oneline
git log --graph

# Reset
git reset
git reset --hard

# Revert
git revert

# Clean
git clean -fd
git clean -fdx

# Bisect
git bisect
git bisect start
git bisect bad
git bisect good

# Worktree
git worktree
git worktree add

# Submodule
git submodule
git submodule add
git submodule update

# Archive
git archive
git archive --format=tar.gz HEAD > release.tar.gz

# Show
git show
git show <sha>

# Reflog
git reflog

# Clean
git gc
git prune

# Help
git help
git help <command>