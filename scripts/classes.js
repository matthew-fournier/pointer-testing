import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'

class Agent {
  constructor (name) {
    this.operations = []
    this.codename = name
    this.name = name
  }

  get codename () {
    return this._codename
  }

  set codename (name) {
    const newCodeName = name.split(' ').reverse()
      .map(word => {
        const letters = word.toLowerCase().split('').reverse()
        letters[0] = letters[0].toUpperCase()
        return letters.join('')
      }).join(' ')

    this._codename = `${newCodeName} ${name.length}`
  }

  newOperation (opp) {
    this.operations.push(opp)
    return this.operations[0]
  }

  setOperationStatus (id, status) {
    const operation = this.operations.find(opp => opp.id === id)
    if (typeof operation === 'undefined') {
      throw Error(`No operation matchesd id ${id}`)
    }
    operation.status = status
  }
}

const basicGetSet = () => {
  scriptTitle('Use Get and Set to define ')
  console.log('Create a new agent with the name "Marco Polo"')
  const agent = new Agent('Marco Polo')
  console.log(`agent's codename is < ${agent.codename} >`)

  console.log('\nSet agent name to "Bob Belcher" without Setter')
  agent._codename = 'Bob Belcher'
  console.log(`agent's codename is < ${agent.codename} >`)

  console.log('\nSet agent name to "Ron Swanson" with Setter')
  agent.codename = 'Ron Swanson'
  console.log(`agent's codename is < ${agent.codename} >`)
}

const agentOperations = () => {
  scriptTitle('Assign our a new agent to some operations')

  const agent = new Agent('Jason Bourne')
  console.log(`Agent ${agent.name} has been created. Codename < ${agent.codename} >`)

  const newOperationDetails = agent.newOperation({
    id: 0,
    name: 'Treadstone',
    year: 2002,
    completed: true
  })

  console.log('\nNew Operation Details:')
  console.log(newOperationDetails)

  ;[
    { id: 1, name: 'The Bourne Identity', year: 2002, completed: true },
    { id: 2, name: 'The Bourne Supremacy', year: 2004, completed: true },
    { id: 3, name: 'The Bourne Ultimatum', year: 2007, completed: false }
  ].forEach(opp => {
    agent.newOperation(opp)
  })

  console.log('\nAdd More Operations & view')
  console.log(agent.operations)

  console.log('\nSet Operation id:3 to completed')
  agent.setOperationStatus(3, true)

  console.log('\nView updated operations')
  console.log(agent.operations)

  console.log('\nSet Operation id:30 to incompleted. Will throw error')
  agent.setOperationStatus(30, false)
}

const classes = () => {
  try {
    basicGetSet()
    agentOperations()
  } catch (err) {
    terminal.red(`${err}\n\n`)
  }
}

export default classes

/*
  NOTE:
*/
