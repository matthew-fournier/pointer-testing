import axios from 'axios'
import scriptTitle from '../helpers/scriptTitle'

/**
 * Fetch city data
 * @returns a large json array of cities
 */
const fetchData = async (url) => {
  try {
    return await axios.get(url).then((res) => res.data)
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

/**
 * Demo for deconstructing in params
 * @param {object} param0 : City data object
 * @returns string with city info
 */
const deconstructInArguments = ({ name, geonameid, ...otherProperties }) => {
  // console.log(name, geonameid)
  return `${name}'s geo id is: ${geonameid}. Other Info: ${JSON.stringify(otherProperties)}`
}

/**
 * Labled cities with nhl teams
 * @param {object} canadianCities array of candian city data
 * @param {object} nhlTeamData array of nhl team data
 * @returns array on city objects with nhl team properites if valid
 */
const labelCitiesWithNhlTeams = (canadianCities, nhlTeamData) => {
  return Object.values(canadianCities)
    .map((cityData) => {
      const cityTeam = nhlTeamData.find(team => team.city === cityData.name)
      return {
        cityName: cityData.name,
        ...(typeof cityTeam !== 'undefined' && {
          nhlTeam: cityTeam.name
        })
      }
    })
}

const deconstruction = async () => {
  try {
    scriptTitle('Destructuring')

    const [{ value: allCityData }, { value: nhlTeamData }] = await Promise.allSettled(
      [
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json',
        'https://raw.githubusercontent.com/ryanburgess/nhl-schedule/master/teams.json'
      ].map(async (url) => {
        return await fetchData(url)
      })
    )

    const canadianCities = getCitiesInCountry(allCityData, 'Canada')
    const canadianCityObject = organizeCities(canadianCities)

    // // Gets the first two cities from canadianCities, remaining will be in the restOfCanadianCities array
    const [firstCityInfo, secondCityInfo, ...restOfCanadianCities] = canadianCities
    // // console.log(firstCityInfo, secondCityInfo, restOfCanadianCities)

    // // Get properties for the first city object
    const { name, geonameid, subcountry: provinceOrTerritory, notARealProperty, iHaveADefault = true } = firstCityInfo
    // // console.log(name, geonameid, provinceOrTerritory, notARealProperty, iHaveADefault)

    // // Get the first Ontario city from the Ontario property
    const { Ontario: [firstOntarioCity, ...otherOntarioCities], Quebec: quebecCities, ...otherProvinces } = canadianCityObject
    // // console.log(firstOntarioCity, otherOntarioCities)

    const deconstructedReturnValue = deconstructInArguments(secondCityInfo)
    // console.log(deconstructedReturnValue)

    const candianCitiesWithTeams = labelCitiesWithNhlTeams(canadianCities, nhlTeamData)
    // console.log(candianCitiesWithTeams)
  } catch (err) {
    console.log(err)
  }
}

export default deconstruction
