import scriptTitle from '../helpers/scriptTitle'

const stringArray = 'this is a sentence with spacing and stuff'.split(' ')

const getStringAtPosition = (position, time, callback) => {
  try {
    if (
      typeof position !== 'number' ||
      typeof time !== 'number' ||
      typeof callback !== 'function'
    ) { throw new Error('getStringAtPosition requires position, time and a callback') }

    const stringAtPosition = stringArray[position]
    return callback(position, stringAtPosition, time)
  } catch (err) {
    console.log(err.message)
    return null
  }
}

const afterWeGetString = (position, string, time) => {
  return setTimeout(() => {
    console.log(`String at position ${position}: "${string}" - ${time}ms delay`)
  }, time)
}

const callbacks = () => {
  scriptTitle('Callback Example')

  getStringAtPosition(0, 800, afterWeGetString)
  getStringAtPosition(3, 0, afterWeGetString)

  getStringAtPosition(0, 900, (position, string, time) => {
    setTimeout(() => {
      console.log(`\nString at position ${position}: "${string}" - ${time}ms delay`)

      getStringAtPosition(position + 1, 0, (position2, string2, time2) => {
        console.log(`The next string at position ${position}: "${string}" - ${time}ms delay`)
      })
    }, time)
  })

  // myFunction('This Should Appear First', 500, myCallbackFunction)
}

export default callbacks

/*
  NOTE:
*/
