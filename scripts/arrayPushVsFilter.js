import scriptTitle from '../helpers/scriptTitle'

const originalFunction = (conditionalValues) => {
  const itemsToAdd = []

  if (conditionalValues.a) {
    itemsToAdd.push({
      id: conditionalValues.a,
      name: 'Item A',
      quantity: 2
    })
  }

  if (conditionalValues.b) {
    itemsToAdd.push({
      id: conditionalValues.b,
      name: 'Item B',
      quantity: 1
    })
  }

  if (conditionalValues.c) {
    itemsToAdd.push({
      id: conditionalValues.c,
      name: 'Item C',
      quantity: 2
    })
  }

  return itemsToAdd
}

const updatedFunction = (conditionalValues) => {
  return [
    {
      id: conditionalValues.a,
      name: 'Item A',
      quantity: 2
    },
    {
      id: conditionalValues.b,
      name: 'Item B',
      quantity: 1
    },
    {
      id: conditionalValues.c,
      name: 'Item C',
      quantity: 2
    }
  ].filter(item => item.id !== null)
}

const arrayPushVsFilter = () => {
  scriptTitle('Creating an array of conditional objects')

  const conditionalValues = {
    a: 1421,
    b: 214,
    c: null
  }

  console.log('Original Response:')
  console.log(originalFunction(conditionalValues))

  console.log('Updated Response:')
  console.log(updatedFunction(conditionalValues))
}

export default arrayPushVsFilter

/*
  NOTE:
  This is an example scenario based on what was found in a pr.
  conditionalValues was set up to replication condiditional values that can come from getArrtibute()
*/
