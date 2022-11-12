import scriptTitle from '../helpers/scriptTitle'
import startServer from '../server/server'
import { terminal } from 'terminal-kit'

const NGROK_URL = process.env.NGROK_URL

const webhook = async () => {
  scriptTitle('Websocket')

  const server = await startServer()

  terminal.magenta('\nSee pages on: ')
  terminal.yellow(`${server.url}pages/\n`)
}

export default webhook
