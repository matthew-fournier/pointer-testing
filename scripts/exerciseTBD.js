import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'

const templateObj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: {
      g: 4
    },
    f () {
      return this.a * 2
    }
  }
}

const basicEquals = () => {
  const newObj = structuredClone(templateObj)
  templateObj.a = 5
  console.log(newObj)
  return newObj
}

const spreadClone = () => {
  const newObj = { ...templateObj }
  templateObj.a = 5
  console.log(newObj)
  console.log(templateObj.d.f())
  return newObj
}

const structedClone = () => {
  const newObj = structuredClone(templateObj)
  templateObj.a = 5
  console.log(newObj)
  console.log(newObj.d.f())
  return newObj
}

const exerciseTBD = async () => {
  try {
    scriptTitle('Wait for variable < waitForMe > to be defined')

    // basicEquals()
    spreadClone()

    terminal.magenta('The Value of waitForMe is: \n')
  } catch (err) {
    terminal.red(`\n${err}\n`)
  }
}

export default exerciseTBD
