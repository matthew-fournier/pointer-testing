import minimist from 'minimist'
import * as fs from 'fs'
import { terminal } from 'terminal-kit'

(async () => {
  const args = minimist(process.argv.slice(2))

  const selectedScriptName = Object.keys(args)[1]
  if (typeof selectedScriptName === 'undefined') {
    return terminal.red('Please enter a script to run!\n\n')
  }

  const selectedFileType = Object.keys(args[selectedScriptName])[0]
  const selectedFilePath = selectedFileType === 'ts' ? './compiledTypescript' : './scripts'

  const validScripts = fs.readdirSync(selectedFilePath)
    .map(scriptname => scriptname.split('.')[0])

  if (!validScripts.includes(selectedScriptName)) {
    return terminal
      .red('No script found that matches: ')
      .blue(`<${selectedScriptName}> \n\n`)
  }

  const { default: scriptToRun } = await import(`${selectedFilePath}/${selectedScriptName}.js`)

  scriptToRun()
})()
