import scriptTitle from '../helpers/scriptTitle'

// Declare a custom type "DevStatus"
type DevStatus = 'Not Started' | 'In Progress' | 'Approved' | 'Complete'

// Sets interfect for devStatus objects
interface DevTask {
  title: string,
  dueDate: Date,
  status: DevStatus
}

// This function only accepts a numbers and a string. The return value will be of type string
const onlyAcceptsNumberAndString = (passedNumber: number, passedString: string) : string => {
  return `My number is < ${passedNumber} > and my string is < "${passedString}" >`
}

const basicTypescript = async () => {
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
        status: 'In Progress'
      }
    ]
    // The new pushed object must follow the DevTask Interface
    myTaskList.push({
      title: 'Task1',
      dueDate: new Date('September 24, 2022'),
      status: 'Not Started'
    })
  
  
  
    console.log(myTaskList, "d")


  } catch (err) {
    console.log(err)
  }
}

export default basicTypescript