import axios from 'axios'
import scriptTitle from '../helpers/scriptTitle'

/**
 * Fetch city data
 * @returns a large json array of cities
 */
const fetchData = async () => {
  try {
    return await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then((res) => res.data)
  } catch (err) {
    console.log(err.message)
  }
}

/**
 * Get the cities in a specific country
 * @param {object} allCityData : array of city data
 * @param {string} countryName : ex "Canada"
 * @returns Array of cities in requested country
 */
const getCitiesInCountry = (allCityData, countryName) => {
  return allCityData.filter((cityData) => cityData.country === countryName)
}

/**
 * Organises city infromation by subcountry / province
 * @param {object} arrayOfCityData : array of city data
 * @returns Organised object of cities in provinces
 */
const organizeCities = (arrayOfCityData) => {
  return arrayOfCityData.reduce((resObject, currentCity) => {
    const { subcountry: provinceOrTerritory } = currentCity
    if (typeof resObject[provinceOrTerritory] !== 'undefined') { return resObject }
    resObject[provinceOrTerritory.replace(/ /g, '')] = arrayOfCityData
      .filter((cityToFilter) => cityToFilter.subcountry === provinceOrTerritory)
      .map((cityToMap) => cityToMap.name)
    return resObject
  }, {})
}

const deconstruction = async () => {
  try {
    scriptTitle('Destructuring')

    const allCityData = await fetchData()
    const canadianCities = getCitiesInCountry(allCityData, 'Canada')
    const candianCityObject = organizeCities(canadianCities)

    // Gets the first two cities from canadianCities, remaining will be in the restOfCanadianCities array
    const [firstCityInfo, secondCityInfo, ...restOfCanadianCities] = canadianCities
    // console.log(firstCityInfo, secondCityInfo, restOfCanadianCities)

    // Get properties for the first city object
    const { name, geonameid, subcountry: provinceOrTerritory, notARealProperty, iHaveADefault = true } = firstCityInfo
    // console.log(name, geonameid, provinceOrTerritory, notARealProperty, iHaveADefault)

    // Get the first Ontario city from the Ontario property
    const { Ontario: [firstOntarioCity, ...otherOntarioCities], Quebec: quebecCities, ...otherProvinces } = candianCityObject
    // console.log(firstOntarioCity, otherOntarioCities)
  } catch (err) {
    console.log(err)
  }
}

export default deconstruction
