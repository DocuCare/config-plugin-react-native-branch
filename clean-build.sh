git checkout main
MAIN_REF=$(git rev-parse HEAD)

git checkout --orphan build

git rm -rf .

git checkout $MAIN_REF -- android ios app.plugin.js build expo-module.config.json package.json README.md

git add android ios app.plugin.js build expo-module.config.json package.json README.md
git commit -m "Build files for distribution"

git push origin build --force