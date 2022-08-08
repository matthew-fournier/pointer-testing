import { terminal } from 'terminal-kit'

const paginationInfo = {
  namesList: 'Kody Rosa,Stephan Burdette,Darin Sanford,Madysen Culpepper,Jerimiah Carlin,Lina Sykes,Kalyn Kohl,Cannon Sheppard,Martina Delatorre,Cain Suggs,Madelynn Truong,Marian Shirley,Clarissa Richards,Antoine Arthur,Delilah Small,Emmalee Seals,Keila Dupont,Kamron Delarosa,Elle Burdette,Dwayne Chow,Darlene Ma,Callie Suarez,Simon Shifflett,Kelvin Freedman,Damion Conrad,Kaylynn Graham,Devonta Gagne,Augustine Galvez,Milton Olvera,Santana Metzger,Jameson Royer,Moises McDonough,Kinley Jernigan,William Becker,Kallie Pyle,Bailee Tobias,Stefanie Scales,Marion Helms,Long Nunn,Demarco Taft,Cameron Hardin,Marco Edmondson,Ignacio Marin,Kobi Pryor,Daja Maier,Kyla Briseno,Colby Bearden,Santana Goode,Madison Abreu,Alejandro Brock,Clarissa Hensley,Terry Tubbs,Kole Christy,Analise Satterfield,Infant Asbury,Keira Hebert,Toby Neeley,Luisa Streeter,Felipe Trammell,Matteo Madrid,Iman Hubbard,Belen West,Moshe Fallon,Marvin Earle,Ayana Dukes,Macey Christie,Deangelo Cano,Tobias Segovia,Lillian Naylor,Francesca Wheaton,Baby Howell,Erin Hogue,Alvin Brenner,Yamile Nielson,Rubi Conn,Sara Brice,Nicholas Meyer,Robin Danner,Haleigh Green,Katelynn Erwin,Kaliyah Young,Juana Gamble,Ryder Reiter,Demonte Ruff,Jefferson Arrington,Muhammad Lieberman,Tristan Fisk,Lorena Maier,Abdul Brewer,Annabella Hanley,Quincy Thai,Simeon Muir,Erich Weems,Shauna Reilly,Marla Feldman,Douglas Hallman,Ashli Lusk,Spencer McKee,Amberly Hensley,Estevan Schofield'.split(','),
  lastCall: null,
  rateLimit: 500,
  pageSize: 20,
  getPage (pageNumber) {
    const currentTime = new Date().getTime()
    if (this.lastCall !== null && (currentTime - this.lastCall) < this.rateLimit) {
      throw Error(`Called getPage before limit of ${this.rateLimit}ms`)
    }
    this.lastCall = currentTime

    if (!pageNumber) { throw Error('<pageNumber> is missing') }

    return {
      names: this.getNames(pageNumber),
      hasNextPage: this.getNames(pageNumber + 1).length > 0,
      hasPrevPage: this.getNames(pageNumber - 1).length > 0
    }
  },
  getNames (pageNumber) {
    const startSpliceIndex = (this.namesList.length / (this.namesList.length / this.pageSize)) * (pageNumber - 1)
    return this.namesList.slice(startSpliceIndex, startSpliceIndex + this.pageSize)
  }
}

const loopThroughPages = async () => {
  const resultArray = []
  let index = 1

  while (index === 1 || resultArray[resultArray.length - 1].hasNextPage) {
    const currentPage = paginationInfo.getPage(index)
    resultArray.push(currentPage)
    index++
    console.log(currentPage)
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 500)
    })
  }

  console.log(`There are ${resultArray.flatMap(page => page.names).length} names`)
}

const rateLimit = () => {
  try {
    loopThroughPages()
  } catch (err) {
    terminal.red(`${err}\n\n`)
  }
}

export default rateLimit

/*
  NOTE:
  Don't modify the paginationInfo function
  Loop though all the pages
  Console .log total number of names
*/
