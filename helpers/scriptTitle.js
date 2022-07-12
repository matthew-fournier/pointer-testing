import { terminal } from 'terminal-kit'

const scriptTitle = (text) => {
  const trimText = text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n')

  const dashStringLength = trimText.split('').length >= 50
    ? trimText.split('').length + 5
    : 50

  const dashString = [...Array(dashStringLength).keys()]
    .map(letter => '-')
    .join('')

  terminal.magenta(`\n${dashString}\n${trimText}\n${dashString}\n\n`)
  return true
}

export default scriptTitle
