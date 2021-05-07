# `jest-setup-glob`

Apply different Jest setup files based on the test's filename.

## Motivation

Let's say you've got two groups of tests: unit tests running in Node.js and integration tests that run in an automated browser (i.e. Chromium). Each of those test groups has its own environment, which you declare in the respective setup files with Jest.

Usually, to provision such setup, you create two separate Jest setup files, but because Jest executes _all_ setup files you provide in the `setupFilesAfterEnv` configuration option, you introduce _two separate commands_ to run your tests just for the sake of using a different configuration in order to use a different setup file:

```json
{
  "scripts": {
    "test:unit": "jest",
    "test:e2e": "jest --config jest.e2e.config.js"
  }
}
```

This package allows you to run a single `jest` command with a single configuration file and get different environments bootstrapped based on the test's filename.

## Usage

```bash
$ npm install jest-setup-glob
```

Create/edit the `jest.setup.js` file:

```js
// jest.setup.js
const setup = require('jest-setup-glob')

setup({
  '**.browser.test.js': './jest.setup.browser.js',
  '**.test.js': './jest.setup.node.js',
})
```

> This library uses [macromatch](https://www.npmjs.com/package/micromatch) string matcher. Refer to its documentation to write a valid glob pattern.

Reference the `jest.setup.js` file in your `jest.config.js`:

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
}
```

```bash
$ jest myTest.test.js
# using "jest.setup.js"...

$ jest browserCache.browser.test.js
# using "jest.setup.browser.js"...
```
