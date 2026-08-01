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

### Setup <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23setup%0A%0ASection%20title%3A%20Setup" target="_blank" rel="noopener" data-askgpt="Setup" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#setup" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23setup%0A%0ASection%20title%3A%20Setup" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23setup%0A%0ASection%20title%3A%20Setup" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git config --global user.name "Your Name"` | Set user name |
| `git config --global user.email "you@example.com"` | Set user email |
| `git init` | Initialize a repo |
| `git clone <url>` | Clone a repo |

### Local changes <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23local-changes%0A%0ASection%20title%3A%20Local%20changes" target="_blank" rel="noopener" data-askgpt="Local changes" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#local-changes" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23local-changes%0A%0ASection%20title%3A%20Local%20changes" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23local-changes%0A%0ASection%20title%3A%20Local%20changes" title="Ask ChatGPT about this section">💬</a>

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

### Branches <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23branches%0A%0ASection%20title%3A%20Branches" target="_blank" rel="noopener" data-askgpt="Branches" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#branches" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23branches%0A%0ASection%20title%3A%20Branches" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23branches%0A%0ASection%20title%3A%20Branches" title="Ask ChatGPT about this section">💬</a>

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

### Merging and rebasing <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23merging-and-rebasing%0A%0ASection%20title%3A%20Merging%20and%20rebasing" target="_blank" rel="noopener" data-askgpt="Merging and rebasing" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#merging-and-rebasing" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23merging-and-rebasing%0A%0ASection%20title%3A%20Merging%20and%20rebasing" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23merging-and-rebasing%0A%0ASection%20title%3A%20Merging%20and%20rebasing" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git merge <name>` | Merge branch into current |
| `git merge --no-ff <name>` | Force merge commit |
| `git rebase <name>` | Replay commits on top |
| `git rebase -i <name>` | Interactive rebase |
| `git rebase --autosquash` | Auto-squash fixup commits |
| `git pull --rebase` | Pull and rebase |

### Remote <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23remote%0A%0ASection%20title%3A%20Remote" target="_blank" rel="noopener" data-askgpt="Remote" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#remote" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23remote%0A%0ASection%20title%3A%20Remote" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23remote%0A%0ASection%20title%3A%20Remote" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git remote -v` | List remotes |
| `git remote add <name> <url>` | Add remote |
| `git fetch <remote>` | Fetch from remote |
| `git pull` | Fetch + merge |
| `git push` | Push to remote |
| `git push --force-with-lease` | Safer force push |

### Stashing and cleanup <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23stashing-and-cleanup%0A%0ASection%20title%3A%20Stashing%20and%20cleanup" target="_blank" rel="noopener" data-askgpt="Stashing and cleanup" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#stashing-and-cleanup" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23stashing-and-cleanup%0A%0ASection%20title%3A%20Stashing%20and%20cleanup" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23stashing-and-cleanup%0A%0ASection%20title%3A%20Stashing%20and%20cleanup" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git stash` | Stash changes |
| `git stash list` | List stashes |
| `git stash apply` | Apply (don't pop) |
| `git stash pop` | Apply and drop |
| `git stash drop` | Delete a stash |
| `git gc` | Garbage collect |

### Tags and releases <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23tags-and-releases%0A%0ASection%20title%3A%20Tags%20and%20releases" target="_blank" rel="noopener" data-askgpt="Tags and releases" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#tags-and-releases" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23tags-and-releases%0A%0ASection%20title%3A%20Tags%20and%20releases" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23tags-and-releases%0A%0ASection%20title%3A%20Tags%20and%20releases" title="Ask ChatGPT about this section">💬</a>

| Command | Description |
|---------|-------------|
| `git tag` | List tags |
| `git tag v1.0.0` | Lightweight tag |
| `git tag -a v1.0.0 -m "Release 1.0.0"` | Annotated tag |
| `git push --tags` | Push tags |
| `git tag -d v1.0.0` | Delete local tag |
| `git push origin :v1.0.0` | Delete remote tag |

### Inspect and debug <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23inspect-and-debug%0A%0ASection%20title%3A%20Inspect%20and%20debug" target="_blank" rel="noopener" data-askgpt="Inspect and debug" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/git-docs.md#inspect-and-debug" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23inspect-and-debug%0A%0ASection%20title%3A%20Inspect%20and%20debug" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fgit-docs.md%23inspect-and-debug%0A%0ASection%20title%3A%20Inspect%20and%20debug" title="Ask ChatGPT about this section">💬</a>

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