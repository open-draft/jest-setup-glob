const setupPattern = require('./index')

setupPattern({
  '**.browser.test.js': './jest.setup.browser.js',
  '**.test.js': './jest.setup.node.js',
})
