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

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23the-three-states%0A%0ASection%20title%3A%20The%20three%20states' target='_blank' rel='noopener' data-askgpt='The three states' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#the-three-states' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23the-three-states%0A%0ASection%20title%3A%20The%20three%20states' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23the-three-states%0A%0ASection%20title%3A%20The%20three%20states' title='Ask ChatGPT about this section'>💬</a>
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

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23object-model%0A%0ASection%20title%3A%20Object%20model' target='_blank' rel='noopener' data-askgpt='Object model' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#object-model' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23object-model%0A%0ASection%20title%3A%20Object%20model' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23object-model%0A%0ASection%20title%3A%20Object%20model' title='Ask ChatGPT about this section'>💬</a>
Git's data model: snapshot-based, not delta-based. Four object types:

- **Blob:** file content.
- **Tree:** directory listing (blobs + subtrees).
- **Commit:** snapshot with parent(s).
- **Tag:** annotated ref pointing to a commit.

### Refs

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23refs%0A%0ASection%20title%3A%20Refs' target='_blank' rel='noopener' data-askgpt='Refs' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#refs' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23refs%0A%0ASection%20title%3A%20Refs' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23refs%0A%0ASection%20title%3A%20Refs' title='Ask ChatGPT about this section'>💬</a>
- **Branch:** ref to a commit (e.g., `refs/heads/main`).
- **Tag:** ref to a tag object (lightweight or annotated).
- **HEAD:** ref to current branch (or detached commit).

### Branches

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23branches%0A%0ASection%20title%3A%20Branches' target='_blank' rel='noopener' data-askgpt='Branches' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#branches' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23branches%0A%0ASection%20title%3A%20Branches' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23branches%0A%0ASection%20title%3A%20Branches' title='Ask ChatGPT about this section'>💬</a>
- **master / main:** default branch.
- **Topic branches:** short-lived for a feature.
- **Remote branches:** refs/remotes/origin/<branch>.
- **Tags:** releases.

### Merging

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23merging%0A%0ASection%20title%3A%20Merging' target='_blank' rel='noopener' data-askgpt='Merging' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#merging' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23merging%0A%0ASection%20title%3A%20Merging' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23merging%0A%0ASection%20title%3A%20Merging' title='Ask ChatGPT about this section'>💬</a>
Three-way merge: common ancestor + two branches. Produces a merge commit (or fast-forwards).

### Rebasing

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23rebasing%0A%0ASection%20title%3A%20Rebasing' target='_blank' rel='noopener' data-askgpt='Rebasing' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#rebasing' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23rebasing%0A%0ASection%20title%3A%20Rebasing' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23rebasing%0A%0ASection%20title%3A%20Rebasing' title='Ask ChatGPT about this section'>💬</a>
Replay your commits on top of another branch. Linear history. **Never rebase public branches** (rewrites history).

## Workflows from Pro Git

### Centralized workflow

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23centralized-workflow%0A%0ASection%20title%3A%20Centralized%20workflow' target='_blank' rel='noopener' data-askgpt='Centralized workflow' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#centralized-workflow' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23centralized-workflow%0A%0ASection%20title%3A%20Centralized%20workflow' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23centralized-workflow%0A%0ASection%20title%3A%20Centralized%20workflow' title='Ask ChatGPT about this section'>💬</a>
Single central repo, main branch. One dev at a time on main.

### Integration-manager workflow

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23integration-manager-workflow%0A%0ASection%20title%3A%20Integration-manager%20workflow' target='_blank' rel='noopener' data-askgpt='Integration-manager workflow' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#integration-manager-workflow' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23integration-manager-workflow%0A%0ASection%20title%3A%20Integration-manager%20workflow' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23integration-manager-workflow%0A%0ASection%20title%3A%20Integration-manager%20workflow' title='Ask ChatGPT about this section'>💬</a>
Maintainer integrates changes from contributors.

### Dictator-and-lieutenants workflow

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23dictator-and-lieutenants-workflow%0A%0ASection%20title%3A%20Dictator-and-lieutenants%20workflow' target='_blank' rel='noopener' data-askgpt='Dictator-and-lieutenants workflow' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/15-git/references/pro-git-book.md#dictator-and-lieutenants-workflow' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23dictator-and-lieutenants-workflow%0A%0ASection%20title%3A%20Dictator-and-lieutenants%20workflow' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F15-git%2Freferences%2Fpro-git-book.md%23dictator-and-lieutenants-workflow%0A%0ASection%20title%3A%20Dictator-and-lieutenants%20workflow' title='Ask ChatGPT about this section'>💬</a>
Linux kernel model. Lieutenants maintain subsystems, dictator merges.

## Other references

- **Git internals docs:** <https://git-scm.com/docs/git-add#_description>
- **GitHub training:** <https://services.github.com/training/>
- **GitLab Learn:** <https://about.gitlab.com/learn/>
- **Version Control with Git** — Jon Loeliger, Matthew McCullough (O'Reilly).
- **Git for Teams** — Emma Jane Hogbin Westby (O'Reilly).