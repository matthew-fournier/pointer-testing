const randUsername = 'I am P0!NT3R'

const randomList = [
  'Can anyone here help me get back to slack?',
  'I\'m so confused...',
  'Okay seriously, what\'s going on?!',
  'Figured it out, bye!'
]

export const randEnteredChat = (io) => {
  io.emit('updateMessages', {
    message: `${randUsername} has entered the chat 👋`,
    username: randUsername,
    userID: '--',
    type: 'welcome'
  })
}

export const startRandSend = (io) => {
  let currentIndex = 0

  const sendFact = (loopInterval) => {
    io.emit('updateMessages', {
      message: randomList[currentIndex],
      username: randUsername,
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
