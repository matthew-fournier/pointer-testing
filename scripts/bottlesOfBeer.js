import scriptTitle from '../helpers/scriptTitle'

/*
  99 bottles of beer on the wall, 99 bottles of beer.
  Take one down and pass it around, 98 bottles of beer on the wall.
  ...
  1 bottle of beer on the wall, 1 bottle of beer.
  Take one down and pass it around, no more bottles of beer on the wall.

  No more bottles of beer on the wall, no more bottles of beer.
  Go to the store and buy some more, 99 bottles of beer on the wall.
*/

const howManyBeer = (index, isStartOfSentence) => {
  const adjustedIndex = index < 0 ? 99 : index
  return `${adjustedIndex > 0 ? adjustedIndex : `${isStartOfSentence ? 'N' : 'n'}o more`} bottle${adjustedIndex === 1 ? '' : 's'} of beer`
}

const takeOrStore = (index) => {
  return index > 0 ? 'Take one down and pass it around' : 'Go to the store and buy some more'
}

const bottlesOfBeer = () => {
  scriptTitle('99 Bottles Of Beer')

  const lyrics = [...Array(100).keys()].reverse()
    .map((index) => {
      return `${howManyBeer(index, true)} on the wall, ${howManyBeer(index, true)}.\n${takeOrStore(index)}, ${howManyBeer(index - 1, false)} on the wall.`
    }).join('\n\n')

  console.log(lyrics)
}

export default bottlesOfBeer
