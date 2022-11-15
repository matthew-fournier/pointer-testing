import { Server } from 'socket.io'
import { randEnteredChat, startRandSend } from '../helpers/randList'

let io = null

const startSockets = async (httpServer) => {
  if (io !== null) { return io }

  io = new Server(httpServer, {
    cors: {
      origin: process.env.NGROK_URL,
      methods: ['GET', 'POST']
    }
  })

  let isMessageSent = false

  io.on('connection', (socket) => {
    socket.emit('connectionReturn', socket.id)

    socket.on('messageSent', (messageData) => {
      io.emit('updateMessages', messageData)

      if (!isMessageSent && messageData.type === 'basic') {
        isMessageSent = true
        setTimeout(() => randEnteredChat(io), 1000 * 5)
        setTimeout(() => startRandSend(io), 1000 * 15)
      }
    })
  })

  console.log(`Websocket Running on port:${process.env.SERVER_PORT}`)

  return io
}

export default startSockets
