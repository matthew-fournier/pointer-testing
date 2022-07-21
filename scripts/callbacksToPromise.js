import scriptTitle from '../helpers/scriptTitle'

const stringArray = 'this is a sentence with spacing and stuff'.split(' ')

const getStringAtPosition = (position, time) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (typeof stringArray[position] === 'undefined') {
        reject(new Error(`No valid string at position ${position}`))
      }

      resolve([stringArray[position], position])
    }, time)
  })
}

const callbacksToPromise = () => {
  scriptTitle('Callback Example')

  getStringAtPosition(0, 800)
    .then((res) => {
      console.log(`Response 1: "${res[0]}" at position [${res[1]}]`)
      return getStringAtPosition(res[1] + 1, 20)
    })
    .then((res) => {
      console.log(`Response 2: "${res[0]}" at position [${res[1]}]`)
      return getStringAtPosition(res[1] + 1, 2000)
    })
    .then((res) => {
      console.log(`Response 3: "${res[0]}" at position [${res[1]}]`)
      return getStringAtPosition(1000, 2000)
    })
    .catch((err) => {
      console.log(`ERROR: ${err.message}`)
    })
}

export default callbacksToPromise

/*
  NOTE:
*/
