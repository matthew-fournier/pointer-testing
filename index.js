import minimist from 'minimist'
import { terminal } from 'terminal-kit'
import test1 from './scripts/test1'

(() => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]

  const validScripts = [test1]

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
