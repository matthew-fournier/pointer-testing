import scriptTitle from '../helpers/scriptTitle'

let variableToWaitFor

const originalSuccess = () => {
  console.log(`Original: variableToWaitFor has a value of <${variableToWaitFor}>`)
}

const originalFunction = () => {
  let intervalCount = 0
  const waitInterval = setInterval(() => {
    if (typeof variableToWaitFor !== 'undefined') {
      clearInterval(waitInterval)
      originalSuccess()
    } else if (intervalCount >= 2000) {
      clearInterval(waitInterval)
      console.log('Original: Time ran out waiting for variableToWaitFor')
    }

    intervalCount += 100
  }, 100)
}

const waitForPassedVariable = async (passedVariable) => {
  try {
    await new Promise((resolve, reject) => {
      let intervalCount = 0
      const waitInterval = setInterval(() => {
        if (typeof variableToWaitFor !== 'undefined') {
          clearInterval(waitInterval)
          resolve()
        } else if (intervalCount >= 2000) {
          clearInterval(waitInterval)
          reject(new Error('Updated: Got tired of waiting for <variableToWaitFor>'))
        }
        intervalCount += 100
      }, 100)
    })
    return `Updated: We waited for the variable <variableToWaitFor>: ${variableToWaitFor}`
  } catch (err) {
    return err.message
  }
}

const waitForVariable = async () => {
  scriptTitle('Exercise to minimize the code needed to complete the waitForVariable challenge')

  let setVariableIntervalCount = 0
  const setVariableInterval = setInterval(() => {
    console.log(`${setVariableIntervalCount}ms`)
    if (setVariableIntervalCount >= 1800) {
      variableToWaitFor = 'I have a value!!'
      console.log(`variableToWaitFor is set to: ${variableToWaitFor}`)
      clearInterval(setVariableInterval)
    }
    setVariableIntervalCount += 100
  }, 100)

  originalFunction()

  const d = { variableToWaitFor }

  const waitVariableResponse = await waitForPassedVariable(() => { return variableToWaitFor })
  console.log(waitVariableResponse, d)
}

export default waitForVariable

/*
  NOTE:
  Wait for global variable to become 'undefined'
  Use case is waiting for apps to load
*/
