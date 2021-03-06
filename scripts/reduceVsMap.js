import scriptTitle from '../helpers/scriptTitle'

const originalFunction = (array) => {
  const selectedItems = array.reduce((pres, cur) => {
    if (cur.title === 'socks') {
      return pres
    }
    pres.push({
      itemID: cur.id,
      quantity: 1,
      title: cur.title
    })
    return pres
  }, [])

  return selectedItems
}

const updatedFunction = (array) => {
  return array
    .filter((item) => item.title !== 'socks')
    .map((item) => {
      return {
        itemID: item.id,
        quantity: 1,
        title: item.title
      }
    })
}

const reduceVsMap = () => {
  scriptTitle('Creating an array')

  const exampleArray = [
    { title: 'socks', id: 123 },
    { title: 'shorts', id: 343 },
    { title: 'shoes', id: 12323 }
  ]

  console.log('Original Response:')
  console.log(originalFunction(exampleArray))

  console.log('Updated Example:')
  console.log(updatedFunction(exampleArray))
}

export default reduceVsMap

/*
  NOTE:
  This is an example scenario based on what was found in a pr.
*/
