# Git Documentation Reference

The authoritative source for Git is the official documentation. This file catalogs the Git documentation pages and references used in the Git document.

## Primary documentation

- **Git Documentation:** <https://git-scm.com/doc>
- **Git Reference:** <https://git-scm.com/docs/git
- **Pro Git book (free):** <https://git-scm.com/book/en/v2
- **GitHub Docs:** <https://docs.github.com/
- **GitLab Docs:** <https://docs.gitlab.com/
- **Bitbucket Docs:** <https://support.atlassian.com/bitbucket-cloud/docs/

## Git command reference (selected)

### Setup <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Setup'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Setup" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git config --global user.name "Your Name"` | Set user name |
| `git config --global user.email "you@example.com"` | Set user email |
| `git init` | Initialize a repo |
| `git clone <url>` | Clone a repo |

### Local changes <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Local%20changes'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Local changes" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git status` | Show working tree status |
| `git add <file>` | Stage file |
| `git add .` | Stage all changes |
| `git restore --staged <file>` | Unstage |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |
| `git commit -m "msg"` | Commit staged |
| `git commit --amend` | Amend last commit |
| `git stash` | Stash changes |
| `git stash pop` | Restore stashed changes |

### Branches <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Branches'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Branches" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git branch` | List branches |
| `git branch <name>` | Create branch |
| `git branch -d <name>` | Delete branch (merged) |
| `git branch -D <name>` | Force delete |
| `git checkout <name>` | Switch branch |
| `git checkout -b <name>` | Create + switch |
| `git switch <name>` | Switch (newer) |
| `git switch -c <name>` | Create + switch (newer) |

### Merging and rebasing <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Merging%20and%20rebasing'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Merging and rebasing" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git merge <name>` | Merge branch into current |
| `git merge --no-ff <name>` | Force merge commit |
| `git rebase <name>` | Replay commits on top |
| `git rebase -i <name>` | Interactive rebase |
| `git rebase --autosquash` | Auto-squash fixup commits |
| `git pull --rebase` | Pull and rebase |

### Remote <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Remote'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Remote" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git remote -v` | List remotes |
| `git remote add <name> <url>` | Add remote |
| `git fetch <remote>` | Fetch from remote |
| `git pull` | Fetch + merge |
| `git push` | Push to remote |
| `git push --force-with-lease` | Safer force push |

### Stashing and cleanup <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Stashing%20and%20cleanup'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Stashing and cleanup" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git stash` | Stash changes |
| `git stash list` | List stashes |
| `git stash apply` | Apply (don't pop) |
| `git stash pop` | Apply and drop |
| `git stash drop` | Delete a stash |
| `git gc` | Garbage collect |

### Tags and releases <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Tags%20and%20releases'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Tags and releases" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git tag` | List tags |
| `git tag v1.0.0` | Lightweight tag |
| `git tag -a v1.0.0 -m "Release 1.0.0"` | Annotated tag |
| `git push --tags` | Push tags |
| `git tag -d v1.0.0` | Delete local tag |
| `git push origin :v1.0.0` | Delete remote tag |

### Inspect and debug <a class="askgpt-btn" href="https://chatgpt.com/?q=Explain%20'Inspect%20and%20debug'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Inspect and debug" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git log` | Show commit history |
| `git log --oneline` | Compact log |
| `git log --graph` | Graph view |
| `git show <sha>` | Show commit |
| `git diff` | Show changes |
| `git blame <file>` | Show line history |
| `git reflog` | Show reflog |
| `git bisect` | Binary search for bug |
| `git log -S <string>` | Find commit that introduced string |

## Subcommands

| Subcommand | Description |
|-----------|-------------|
| `git remote` | Manage remotes |
| `git stash` | Stash changes |
| `git tag` | Manage tags |
| `git worktree` | Multiple working trees |
| `git submodule` | Manage submodules |
| `git filter-branch` | Rewrite history (dangerous) |
| `git bundle` | Pack repo into single file |
| `git worktree add <path> <branch>` | Add working tree |

## Configuration

| File | Location | Scope |
|------|----------|-------|
| `/etc/gitconfig` | System | All users |
| `~/.gitconfig` or `~/.config/git/config` | User | All repos for current user |
| `<repo>/.git/config` | Repo | Specific repo |
| `GIT_CONFIG_NOSYSTEM` | Env | Skip system config |

## Tools

- **Git LFS:** Git Large File Storage.
- **Git hooks:** pre-commit, post-commit, pre-push, etc.
- **Husky:** <https://github.com/typicode/husky>
- **pre-commit:** <https://pre-commit.com/>
- **lefthook:** <https://github.com/evilmartians/lefthook>
- **conventional-commits:** <https://www.conventionalcommits.org/>
- **semantic-release:** <https://github.com/semantic-release/semantic-release>
- **release-please:** <https://github.com/googleapis/release-please>
- **git-filter-repo:** <https://github.com/newren/git-filter-repo>
- **BFG Repo-Cleaner:** <https://rtyley.github.io/bfg-repo-cleaner/>

## Best practices (from official docs)

- **Commit early, commit often.**
- **Use branches for features.**
- **Write good commit messages.**
- **Don't commit secrets.**
- **Sign your commits** (GPG or SSH).
- **Pull before push.**
- **Use `.gitignore` for generated files.**
- **Don't commit large files** (use Git LFS).

## Online resources

- **Pro Git book:** <https://git-scm.com/book/en/v2> (free)
- **Learn Git Branching:** <https://learngitbranching.js.org/>
- **Atlassian Git tutorials:** <https://www.atlassian.com/git/tutorials>
- **GitHub Skills:** <https://skills.github.com/>
- **Visualizing Git Concepts:** <https://onlywei.github.io/explain-git-with-d3/>
- **Oh Shit, Git!?!:** <https://ohshitgit.com/> (humorous but useful)
- **Git Katas:** <https://github.com/praqma-training/git-katas>

## Books

- *Pro Git* — Scott Chacon, Ben Straub (Apress). Free online.
- *Git Pocket Guide* — Richard E. Silverman (O'Reilly).
- *Version Control with Git* — Jon Loeliger, Matthew McCullough (O'Reilly).
- *Git for Teams* — Emma Jane Hogbin Westby (O'Reilly).
- *Learn Git in a Month of Lunches* — Rick Umali (Manning).
- *Effective DevOps with AWS* — Yogesh Raheja, Giuseppe Borgese (Packt).