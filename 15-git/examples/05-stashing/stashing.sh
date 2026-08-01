git stash
git stash -m "WIP: feature X"
git stash list
git stash pop
git stash apply
git stash drop stash@{0}
git stash clear
git stash show -p stash@{0}
git stash branch newbranch stash@{0}
