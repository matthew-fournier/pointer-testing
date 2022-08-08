import minimist from 'minimist'
import * as fs from 'fs'
import { terminal } from 'terminal-kit'

(async () => {
  const args = minimist(process.argv.slice(2))
  const selectedScript = Object.keys(args)[1]

  const validScripts = fs.readdirSync('./scripts')
    .map(scriptname => scriptname.split('.')[0])

  if (!validScripts.includes(selectedScript)) {
    return terminal
      .red('No script found that matches: ')
      .blue(`<${selectedScript}> \n\n`)
  }

  const { default: scriptToRun } = await import(`./scripts/${selectedScript}.js`)

  scriptToRun()
})()
