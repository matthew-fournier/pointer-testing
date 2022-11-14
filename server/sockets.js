import { Server } from 'socket.io'
import { randomList } from '../helpers/randList'

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

      if (!isMessageSent) {
        startRandSend()
        isMessageSent = true
      }
    })
  })

  console.log(`Websocket Running on port:${process.env.SERVER_PORT}`)

  return io
}

const startRandSend = () => {
  let currentIndex = 0

  const sendFact = () => {
    io.emit('updateMessages', {
      message: randomList[currentIndex],
      username: 'I am C^l3b?',
      userID: '--',
      type: 'basic'
    })

    currentIndex = currentIndex + 1 < randomList.length
      ? currentIndex + 1
      : 0
  }

  sendFact()
  setInterval(() => sendFact(), 1000 * 30)
}

export default startSockets
