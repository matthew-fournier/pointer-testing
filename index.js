import minimist from 'minimist'
import * as fs from 'fs'
import { terminal } from 'terminal-kit'

(async () => {
  const args = minimist(process.argv.slice(2))

  const selectedScriptName = Object.keys(args)[1]
  const selectedFileType = Object.keys(args[selectedScriptName])[0]

  const validScripts = fs.readdirSync('./scripts')
    .map(scriptname => scriptname)

  if (!validScripts.includes(`${selectedScriptName}.${selectedFileType}`)) {
    return terminal
      .red('No script found that matches: ')
      .blue(`<${selectedScriptName}> \n\n`)
  }

  const { default: scriptToRun } = await import(`./scripts/${selectedScriptName}.${selectedFileType}`)

  scriptToRun()
})()
