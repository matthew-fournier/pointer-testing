const minimist = require('minimist')
const test1 = require('./scripts/test1')

(() => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]
  eval(selectedScript)()
})
