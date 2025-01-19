git checkout main
MAIN_REF=$(git rev-parse HEAD)

git branch -D build || true
git checkout --orphan build

git rm -rf .

git checkout $MAIN_REF -- android ios app.plugin.js build expo-module.config.json package.json README.md

node -e "
  const pkg = require('./package.json');
  delete pkg.scripts.prepare;
  delete pkg.scripts.prepublishOnly;
  require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

git add android ios app.plugin.js build expo-module.config.json package.json README.md
git commit -m "Build files for distribution"

git push origin build --force

git checkout main
