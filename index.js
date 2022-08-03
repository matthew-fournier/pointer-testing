import minimist from 'minimist'
import { terminal } from 'terminal-kit'
import exerciseFizzbuzz from './scripts/exerciseFizzbuzz'
import reduceVsMap from './scripts/reduceVsMap'
import arrayPushVsFilter from './scripts/arrayPushVsFilter'
import optionalChaining from './scripts/optionalChaining'
import simpleFetch from './scripts/simpleFetch'
import zipCodes from './scripts/zipCodes'
import callbacks from './scripts/callbacks'
import callbacksToPromise from './scripts/callbacksToPromise'
import promiseToAwait from './scripts/promiseToAwait'
import classes from './scripts/classes'
import exerciseWaitForVariable from './scripts/exerciseWaitForVariable'

(() => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]

  const validScripts = [
    reduceVsMap,
    arrayPushVsFilter,
    optionalChaining,
    exerciseFizzbuzz,
    simpleFetch,
    zipCodes,
    callbacks,
    callbacksToPromise,
    promiseToAwait,
    classes, exerciseWaitForVariable
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
