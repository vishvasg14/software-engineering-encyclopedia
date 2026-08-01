git checkout main
git pull
git checkout -b quick-fix
git commit -m "fix: small thing"
git push
gh pr create --base main --head quick-fix
gh pr merge --squash --auto
git checkout main
git pull
git branch -d quick-fix
