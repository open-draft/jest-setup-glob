const path = require('path')
const micromatch = require('micromatch')

/**
 * Applies different Jest setup files based on the test's filename.
 * @param {Record<string, string>} config
 */
module.exports = function jestEnv(config) {
  const state = expect.getState()
  const envPattern = Object.keys(config).find((pattern) => {
    return micromatch.isMatch(state.testPath, pattern)
  })

  if (!envPattern) {
    return
  }

  const setupFilePath = config[envPattern]
  require(path.resolve(process.cwd(), setupFilePath))
}
