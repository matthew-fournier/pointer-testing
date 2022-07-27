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

const promiseToAwait = async () => {
  try {
    scriptTitle('Async / Await Example')
    const res1 = await getStringAtPosition(0, 800)
    console.log(`Response 1: "${res1[0]}" at position [${res1[1]}]`)

    const res2 = await getStringAtPosition(res1[1] + 1, 20)
    console.log(`Response 2: "${res2[0]}" at position [${res2[1]}]`)

    const res3 = await getStringAtPosition(res2[1] + 1, 2000)
    console.log(`Response 3: "${res3[0]}" at position [${res3[1]}]`)

    // const res4 = await getStringAtPosition(1000, 2000)
    // console.log(`Response 4: "${res4[0]}" at position [${res4[1]}]`)

    console.log('Waiting for Promise All Settled...')
    const response = await Promise.allSettled([
      getStringAtPosition(0, 800),
      getStringAtPosition(1, 20),
      getStringAtPosition(1000, 2000),
      getStringAtPosition(2, 300)
    ])

    const resRejected = response.filter(res => res.status === 'rejected')
    const resFulfilled = response.filter(res => res.status === 'fulfilled')

    console.log('Rejected:\n', resRejected)
    console.log('Fulfilled:\n', resFulfilled)
  } catch (err) {
    console.log(`ERROR: ${err.message}`)
  }
}

export default promiseToAwait

/*
  NOTE:
*/
