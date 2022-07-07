import scriptTitle from '../helpers/scriptTitle'

const fromPR = (array) => {
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

const fromUpdated = (array) => {
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

const test1 = () => {
  scriptTitle('Creating an array')

  const exampleArray = [
    { title: 'socks', id: 123 },
    { title: 'shorts', id: 343 },
    { title: 'shoes', id: 12323 }
  ]

  console.log('From PR:')
  console.log(fromPR(exampleArray))

  console.log('Updated Example:')
  console.log(fromUpdated(exampleArray))
}

export default test1
