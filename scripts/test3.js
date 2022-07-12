import scriptTitle from '../helpers/scriptTitle'

const originalFunction = (mainArray) => {
  /* The Below will cause an error: TypeError: Cannot read property 'subValue' of null
    return mainArray.map((obj) => obj.primeValue.subValue)
  */

  // To fix it we can apply an if undefined or null check
  return mainArray
    .map((obj) => {
      if (
        typeof obj.primeValue === 'undefined' ||
        !obj.primeValue ||
        typeof obj.primeValue.subFunction !== 'function' ||
        !obj.primeValue.subFunction
      ) { return null }

      return obj.primeValue.subFunction()
    })
    .filter((item) => item !== null)
}

const updatedFunction = (mainArray) => {
  /*
     By adding '?' after primeValue, obj.primeValue?.subFunction will return
     'undefined' instead of throwing an error. This allows us to use a
     typeof === 'function' check
  */

  return mainArray
    .filter((obj) => typeof obj.primeValue?.subFunction === 'function')
    .map((obj) => obj.primeValue?.subFunction())
}

const test3 = () => {
  scriptTitle('Use "Optional Chaining" to create a list of values from an array')

  const mainArray = [
    {
      primeValue: null
    },
    {
      primeValue: {
        subFunction: () => {
          return 'Only Valid Object'
        }
      }
    },
    {
      primeValue: {
        subFunction: 342
      }
    },
    {
      primeValue: {
        subFunction: null
      }
    },
    {
      primeValue: {
        wrongFunction: () => {
          return 'Any String'
        }
      }
    },
    {
      notPrimeValue: 'Any String'
    }
  ]

  console.log('Original Response:')
  console.log(originalFunction(mainArray))

  console.log('Updated Response:')
  console.log(updatedFunction(mainArray))
}

export default test3

/*
  NOTE:
  Prevent error when cheking a property of undefined of null
  Our goal is to the valid values of each mainArray.primeValue.subFunction
*/
