import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'
import connectDB from '../models'
import startServer from '../server/server'

/**
 * Find, create, and destory
 */
const dbBasics = async () => {
  try {
    scriptTitle('Simple Endpoint')
    await connectDB()
    const server = await startServer()

    terminal.yellow(`
      Test in postman
      - GET: ${server.url}
      - GET: ${server.url}users/:userID
      - PUT: ${server.url}users/:userID { firstName, lastName}
      - POST: ${server.url}users/ { id, firstName, lastName }
    `.replace(/ {6}/g, ''))
  } catch (err) {
    console.error(err.message)
  }
}

export default dbBasics
