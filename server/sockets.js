import { Server } from 'socket.io'

let io = null

const startSockets = async (httpServer) => {
  if (io !== null) { return io }

  io = new Server(httpServer, {
    cors: {
      origin: process.env.NGROK_URL,
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log(`-- New user connected with ID: ${socket.id}`)
    socket.emit('connectionReturn', socket.id)

    socket.on('messageSent', (messageData) => {
      io.emit('updateMessages', messageData)
    })
  })

  console.log(`Websocket Running on port:${process.env.SERVER_PORT}`)

  return io
}

export default startSockets
