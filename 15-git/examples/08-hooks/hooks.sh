git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
cat > .githooks/pre-commit << 'PC'
#!/bin/bash
npm test
npm run lint
PC
git config --local commit.gpgsign true
