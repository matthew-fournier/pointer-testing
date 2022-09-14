import scriptTitle from '../helpers/scriptTitle'

const funcA = <GenType>(arg: GenType): GenType => {
  // This will cause an error because we are expecting to return our generic type
  // return parseInt(arg)
  return arg
}

const funcB = (arg: any): any => {
  // This will work as the type is not carried over from the called function
  return parseInt(arg)
}

const generics = (): void => {
  scriptTitle('TypeScript Generics')

  const res: number | string = funcA<string>('33')

  const res2: number | string = funcB('33')
  console.log(res, res2)
}

export default generics
