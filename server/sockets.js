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

      if (!isMessageSent && messageData.type === 'basic') {
        isMessageSent = true
        setTimeout(() => randEnteredChat(), 1000 * 5)
        setTimeout(() => startRandSend(), 1000 * 15)
      }
    })
  })

  console.log(`Websocket Running on port:${process.env.SERVER_PORT}`)

  return io
}

const randUserName = 'I am P0!NT3R'

const randEnteredChat = () => {
  io.emit('updateMessages', {
    message: `${randUserName} has entered the chat 👋`,
    username: randUserName,
    userID: '--',
    type: 'welcome'
  })
}

const startRandSend = () => {
  let currentIndex = 0

  const sendFact = (loopInterval) => {
    io.emit('updateMessages', {
      message: randomList[currentIndex],
      username: randUserName,
      userID: '--',
      type: 'basic'
    })

    currentIndex++
    if (currentIndex >= randomList.length) {
      clearInterval(loopInterval)
    }
  }

  sendFact()
  const loopInterval = setInterval(() => sendFact(loopInterval), 1000 * 5)
}

export default startSockets
