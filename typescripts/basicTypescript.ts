import scriptTitle from '../helpers/scriptTitle'

// Declare a custom type "DevStatus"
type DevStatus = 'Not Started' | 'In Progress' | 'Approved' | 'Complete'

// Sets interfect for devStatus objects --> Tags are optional
interface DevTask {
  title: string
  dueDate: Date
  status: DevStatus
  tags?: string[]
}

/**
 * Example function that returns a string containing the passed values
 * @param passedNumber : Type of number
 * @param passedString : Type of string
 * @returns : Type of string
 */
const onlyAcceptsNumberAndString = (passedNumber: number, passedString: string): string => {
  return `My number is < ${passedNumber} > and my string is < "${passedString}" >`
}

const basicTypescript = async (): Promise<void> => {
  try {
    scriptTitle('Basic TypeScript')

    // myNumber must have a value with type number
    const myNumber: number = 2

    // valueFromFunction must have a value of type string
    const valueFromFunction: string = onlyAcceptsNumberAndString(myNumber, 'Hi')
    console.log(valueFromFunction)

    // My status can only equal a value defined in the "DevStatus" type
    const myStatus: DevStatus = 'Approved'

    // myTaskList will be an array of object that follow the DevTask Interface
    const myTaskList: DevTask[] = [
      {
        title: 'Task1',
        dueDate: new Date('September 22, 2022'),
        status: myStatus,
        tags: ['dev-only', 'quick-fix']
      }
    ]

    // The new pushed object must follow the DevTask Interface
    myTaskList.push({
      title: 'Task1',
      dueDate: new Date('September 24, 2022'),
      status: 'Not Started'
    })

    // Create a new new promise to wait for 100ms. Promise resolves a type booleon
    await new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 100))

    console.log(myTaskList)
  } catch (err) {
    console.log(err)
  }
}

export default basicTypescript
