import { terminal } from 'terminal-kit'

const scriptTitle = (text) => {
  const trimText = text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n')

  terminal.yellow(`\n${trimText}\n\n`)
  return true
}

export default scriptTitle
