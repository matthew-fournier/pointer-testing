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
    return (() => {
      // this.multiplier will be 2 as it is in scope of the arrowInRegular function who's this refers to anObject
      return this.multiplier * passedValue
    })()
  }
}

// The value of assedValue * 2 will be returned even though the return keyword is not written
const thisHasAnImplicitReturn = (passedValue) => passedValue * 2

// Once brackets are added, the return keyword is needed
const thisHasAnExplicitReturn = (passedValue) => {
  return passedValue * 2
}

const functionsAndRecursion = () => {
  scriptTitle('Function & Recursion')

  console.log('The use of this')
  console.log('Regular Function:', anObject.regular(42))
  console.log('Arrow Function:', anObject.arrow(42))
  console.log('Arrow in Regular', anObject.arrowInRegular(10))

  console.log('Implicit Return:', thisHasAnImplicitReturn(11))
  console.log('Explicit Return:', thisHasAnExplicitReturn(11))
}

export default functionsAndRecursion
