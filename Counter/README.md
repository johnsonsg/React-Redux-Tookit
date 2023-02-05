# Creating Hooks

Creating Hooks

## What we are using

- Yarn
- Babel
- Webpack

## Ref

- webpack.js.org/configuration

## Notes

- AWS Codebuild only supports 8, 10, 12, 14, 16, currently. So when setting up pipeline make sure you support one of these versions.
- Ref: https://docs.aws.amazon.com/codebuild/latest/userguide/runtime-versions.html
- So make sure you are using a Node Version Manager to set your node to either of the list above when using your project, or install in buildspec and make sure your app works with this version.
- CI/CD successfully complete.

## buildspec.yml config Specs using Unbuntu Linux

- https://github.com/nodesource/distributions/blob/master/README.md#deb
- https://classic.yarnpkg.com/en/docs/install#debian-stable

## Steps

- Create Package.json file: yarn initi -y
- Add Dev Dependencies: yarn add -D webpack webpack-cli webpack-dev-server
- Create /src folder and then index.html file in it and index.js
- Create new File: webpack.config.js in root. See Ref.
- Add React and React-Dom: yarn add react react-dom
- Then add Scripts to package.json and include "watch"
  \*\* "watch": "webpack-dev-server --progress"
- Add Babel: yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
- Configure Babel
- Test Watch: yarn watch
