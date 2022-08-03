import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'

let waitForMe

const defineVariableOnTimeOut = (timeoutTime) => {
  setTimeout(() => {
    waitForMe = 'I have a value!'
  }, timeoutTime)
}

const waitForVariablePromise = (maxWaitTime) => {
  return new Promise((resolve, reject) => {
    let timeWaited = 0

    const waitInterval = setInterval(() => {
      timeWaited += 100
      console.log(`${timeWaited}ms`)

      if (timeWaited < maxWaitTime && typeof waitForMe === 'undefined') { return }
      clearInterval(waitInterval)

      typeof waitForMe === 'undefined'
        ? reject(new Error(`waitForMe variable tool longer than maxWaitTime of ${maxWaitTime}ms`))
        : resolve(waitForMe)
    }, 100)
  })
}

const exerciseWaitForVariable = async () => {
  try {
    scriptTitle('Wait for variable < waitForMe > to be defined')

    defineVariableOnTimeOut(1000)
    await waitForVariablePromise(5000)

    terminal.magenta('The Value of waitForMe is: ').yellow(`${waitForMe}\n\n`)
  } catch (err) {
    terminal.red(`\n${err}\n`)
  }
}

export default exerciseWaitForVariable

/*
  NOTE:
  Wait for variable to be difined before proceeding
  Should have a max timeout
*/
