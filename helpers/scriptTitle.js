const term = require( 'terminal-kit' ).terminal

const scriptTitle = (text) => {
  const trimText = text
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean)
    .join("\n");

  term.yellow(`\n${trimText}\n\n`)
  return true
}

module.exports = scriptTitle
