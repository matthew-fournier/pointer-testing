import axios from 'axios'
import scriptTitle from '../helpers/scriptTitle'

const doSomthingWithData = (userData) => {
  console.log(`OF: ${userData.name.first} ${userData.name.last} ${userData.email}`)
}

const originalFunction = async () => {
  return await axios.get('https://randomuser.me/api/')
    .then((res) => {
      const userData = res.data.results[0]
      doSomthingWithData(userData)
      return res
    })
    .catch((err) => {
      console.log(`OF Error: ${err.message}`)
    })
}

const updatedFunction = async () => {
  try {
    const res = await axios.get('https://randomuser.me/api/')
    const userData = res.data.results[0]
    console.log(`UF: ${userData.name.first} ${userData.name.last} ${userData.email}`)
    return res
  } catch (err) {
    console.log(err.message)
  }
}

const simpleFetch = async () => {
  scriptTitle('Get the name and email of a random user')

  originalFunction()
  const x = await updatedFunction()
  console.log(x)
}

export default simpleFetch

/*
  NOTE:
*/
