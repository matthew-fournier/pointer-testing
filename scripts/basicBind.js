import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'

const exampleObject = {
  aNumber: 20,
  multipliyANumber (multiplier = 2) {
    return this.aNumber * multiplier
  }
}

const exampleObjectTwo = {
  aNumber: 40
}

const basicBind = async () => {
  try {
    scriptTitle('Bind an object for proper values')

    console.log(exampleObject.multipliyANumber(2))
    const referenceToObjectFunction = exampleObject.multipliyANumber
    console.log(referenceToObjectFunction.bind(exampleObject)(3))
    console.log(referenceToObjectFunction.bind(exampleObjectTwo)(3))
  } catch (err) {
    terminal.red(`\n${err}\n`)
  }
}

export default basicBind
