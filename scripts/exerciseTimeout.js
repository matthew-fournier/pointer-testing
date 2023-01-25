import scriptTitle from '../helpers/scriptTitle'

const delayCountStart = (delay) => {
  return setTimeout(() => {
    console.log(`We delayed for ${delay}ms before starting`)
  }, delay)
}

const countToLimit = (limit, step) => {
  let count = 0

  const intervalCount = setInterval(() => {
    count += step
    console.log(count)
    if (count >= limit) {
      clearInterval(intervalCount)
    }
  }, step)

  return intervalCount
}

const logCountComplete = () => {
  return console.log('Yay!! Count Completed!')
}

const exerciseTimeout = () => {
  scriptTitle('Async Timeout Example')
  delayCountStart(500)
  countToLimit(1000, 100)
  logCountComplete()
}

export default exerciseTimeout

//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//

//
//
//
//
//

//
//
//
//
//
//
//
//
//
//

//
//
// Answer

// const delayCountStart = (delay) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(`We delayed for ${delay}ms`)
//       resolve(true)
//     }, delay)
//   })
// }

// const countToLimit = (limit, step) => {
//   let count = 0

//   return new Promise(resolve => {
//     const intervalCount = setInterval(() => {
//       count += step
//       console.log(count)
//       if (count >= limit) {
//         clearInterval(intervalCount)
//         resolve(true)
//       }
//     }, step)
//   })
// }

// const logCountComplete = () => {
//   return console.log('Yay!! Count Completed!')
// }

// const exerciseTimeout = async () => {
//   scriptTitle('Async Timeout Example')

//   await delayCountStart(5000)
//   await countToLimit(1000, 100)
//   logCountComplete()
// }
