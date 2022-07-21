import minimist from 'minimist'
import { terminal } from 'terminal-kit'
import fizzbuzz from './scripts/fizzbuzz'
import reduceVsMap from './scripts/reduceVsMap'
import arrayPushVsFilter from './scripts/arrayPushVsFilter'
import optionalChaining from './scripts/optionalChaining'
import simpleFetch from './scripts/simpleFetch'
import zipCodes from './scripts/zipCodes'
import callbacks from './scripts/callbacks'
import callbacksToPromise from './scripts/callbacksToPromise'

(() => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]

  const validScripts = [
    reduceVsMap,
    arrayPushVsFilter,
    optionalChaining,
    fizzbuzz,
    simpleFetch,
    zipCodes,
    callbacks,
    callbacksToPromise
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
