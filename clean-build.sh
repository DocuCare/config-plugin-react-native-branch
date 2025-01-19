git checkout --orphan build

git rm -rf .

mkdir -p build
cp -r ../main/android .
cp -r ../main/ios .
cp ../main/app.plugin.js .
cp -r ../main/build .
cp ../main/expo-module.config.json .
cp ../main/package.json .

git add android ios app.plugin.js build expo-module.config.json package.json
git commit -m "Build files for distribution"

git push origin build --force