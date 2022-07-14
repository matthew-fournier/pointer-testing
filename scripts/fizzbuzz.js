import scriptTitle from '../helpers/scriptTitle'

const originalFunction = () => {
  let answerString = ''

  for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      answerString += 'FizzBuzz'
    } else if (i % 3 === 0) {
      answerString += 'Fizz'
    } else if (i % 5 === 0) {
      answerString += 'Buzz'
    } else {
      answerString += `${i}`
    }

    if (i < 50) {
      answerString += ', '
    }
  }

  return answerString
}

const updatedFunction = () => {
  return [...Array(51).keys()].slice(1)
    .map(i =>
      ((i % 3 === 0 && i % 5 === 0) && 'FizzBuzz') ||
      ((i % 3 === 0) && 'Fizz') ||
      ((i % 5 === 0) && 'Buzz') ||
      i
    )
    .join(', ')
}

const fizzbuzz = () => {
  scriptTitle('Exercise to minimize the code needed to complete the FizzBuzz challenge')

  console.log('Original Response:')
  console.log(originalFunction())

  console.log('Updated Response:')
  console.log(updatedFunction())
}

export default fizzbuzz

/*
  NOTE:
  display string of 1-50
  If number is divisible by 3 then display Fizz
  If number is divisible by 5 then display Buzz
  If number is divisible by 3 & 5 then display FizzBuzz
*/
