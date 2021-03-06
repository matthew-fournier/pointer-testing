import axios from 'axios'
import scriptTitle from '../helpers/scriptTitle'

const getZips = async (zipToLookup) => {
  try {
    const rawData = await axios.get('https://raw.githubusercontent.com/Fyresite/US-City-State-Zip-Master-JSON/master/states.json')
      .then((res) => res.data)

    return Object.entries(rawData)
      .flatMap((state) =>
        Object.keys(state[1].cities).map((city) => {
          return {
            stateCode: state[0],
            stateName: state[1].name,
            zipCodes: state[1].cities[city],
            cityName: city
          }
        })
      ).find((zipData) => zipData.zipCodes.includes(zipToLookup))
  } catch (err) {
    console.log(err.message)
  }
}

const zipCodes = async () => {
  scriptTitle('Get location info based on a zipcode')

  const zipInfo = await getZips(36610)
  console.log(zipInfo)
}

export default zipCodes
