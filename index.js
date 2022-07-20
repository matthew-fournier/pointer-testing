import minimist from 'minimist'
import { terminal } from 'terminal-kit'
import fizzbuzz from './scripts/fizzbuzz'
import reduceVsMap from './scripts/reduceVsMap'
import arrayPushVsFilter from './scripts/arrayPushVsFilter'
import optionalChaining from './scripts/optionalChaining'
import waitForVariable from './scripts/waitForVariable'
import simpleFetch from './scripts/simpleFetch'
import zipCodes from './scripts/zipCodes'

(() => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]

  const validScripts = [
    reduceVsMap,
    arrayPushVsFilter,
    optionalChaining,
    fizzbuzz,
    waitForVariable,
    simpleFetch,
    zipCodes
  ]

  const scriptToRun = validScripts.find(
    (script) => script.name === selectedScript
  )

  if (typeof scriptToRun === 'undefined') {
    terminal
      .red('No script found that matches: ')
      .blue(`<${selectedScript}> \n\n`)
    return
  }

  scriptToRun()
})()
