import scriptTitle from '../helpers/scriptTitle'

const anObject = {
  multiplier: 2,
  // this will refer to anObject so this.multiplier will equal to this.multiplier
  regular: function (passedValue) {
    return this.multiplier * passedValue
  },
  // this will be the 'window' and therefore this.multiplier is undefined
  arrow: (passedValue) => {
    return anObject.multiplier * passedValue
  },
  arrowInRegular (passedValue) {
    // This is a self invoked unnamed function. It will be be invoked after initialization
    // this.multiplier will be 2 as it is in scope of the arrowInRegular function who's this refers to anObject
    return (() => this.multiplier * passedValue)()
  }
}

// The value of passedValue * 2 will be returned even though the return keyword is not written
const thisHasAnImplicitReturn = (passedValue) => passedValue * 2

// Once brackets are added, the return keyword is needed
const thisHasAnExplicitReturn = (passedValue) => {
  return passedValue * 2
}

// Example of recursion in game or canvas loop
const recursionExampleMovePlayer = async (playerPosition) => {
  playerPosition++
  console.log('Player Position', playerPosition)

  await new Promise(resolve => setTimeout(() => resolve(true), 1000 / 5))

  return playerPosition < 10
    ? recursionExampleMovePlayer(playerPosition)
    : playerPosition
}

const linkedList = {
  head: {
    value: 6,
    next: {
      value: 10,
      next: {
        value: 12,
        next: {
          value: 3,
          next: null
        }
      }
    }
  }
}

// Traverse the linked list to return all the values in an array
const recursionExampleLinkedList = async (listNode, listNodeArray) => {
  listNodeArray.push(listNode.value)

  return listNode.next === null
    ? listNodeArray
    : recursionExampleLinkedList(listNode.next, listNodeArray)
}

// Long written curried example
function curryExampleLong (a) {
  // b and c are passed directly to the nested function
  return function (b, c) {
    return a + b + c
  }
}

// Curried arrow function with implicit return
const curryExampleArrow = (a) => (b, c) => a + b + c

// Another example of currying
const parentFunction = (a, b) => {
  const base = a * b
  return (c) => {
    return base * c
  }
}

const functionsAndRecursion = async () => {
  scriptTitle('Function & Recursion')

  // Examples of 'this' definition
  console.log('Regular Function:', anObject.regular(42))
  console.log('Arrow Function:', anObject.arrow(42))
  console.log('Arrow in Regular', anObject.arrowInRegular(10))

  // Examples of Implicit vs Explicit return
  console.log('Implicit Return:', thisHasAnImplicitReturn(11))
  console.log('Explicit Return:', thisHasAnExplicitReturn(11))

  // Recursion Examples
  // await recursionExampleMovePlayer(0)
  // const linkedListToArray = await recursionExampleLinkedList(linkedList.head, [])
  // console.log('Linked List to Array:', linkedListToArray)

  // Curried Fuction
  console.log('Long Currying Example:', curryExampleLong(2)(2, 3))
  console.log('Short Arrow Currying Example:', curryExampleArrow(2)(2, 3))

  // childFunction is equal to the returned function in parentFunction
  // We can then call the child function which returns base * c
  const childFunction = parentFunction(2, 1)
  console.log(childFunction(2))
  // We can get the same result with the below as we are ecentall calling each returned function
  console.log(parentFunction(2, 1)(2))
}

export default functionsAndRecursion
