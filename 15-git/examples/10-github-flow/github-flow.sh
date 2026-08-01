git checkout -b feature/NEW-FEATURE main
git push -u origin feature/NEW-FEATURE
gh pr create --title "..." --body "..."
gh pr merge
git checkout main
git pull
git branch -d feature/NEW-FEATURE
