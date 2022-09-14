import scriptTitle from '../helpers/scriptTitle'

// Custom type for id. Ex: product-ABCD-0123456789
type typeID = `${string}-${string}-${number}`

// Interface for product info object
interface typeProductInfo {
  title: string
  price: number
  id: typeID
}

/**
 * Product Class
 */
class Product {
  private _title: string
  private readonly _price: number
  readonly id: typeID

  constructor (title: string, price: number) {
    this._title = title
    this._price = price
    this.id = generateID('product')
  }

  get title (): string {
    return this._title
  }

  set title (title: string) {
    this._title = title
  }

  get price (): number {
    return this._price
  }

  get info (): typeProductInfo {
    return {
      title: this.title,
      price: this.price,
      id: this.id
    }
  }
}

/**
 * Collection Class
 */
class Collection {
  private readonly _title: string
  private readonly _products: Product[]
  readonly id: typeID

  constructor (title, products: Product[]) {
    this._title = title
    this._products = products
    this.id = generateID('collection')
  }

  get products (): typeProductInfo[] {
    return this._products.map(product => product.info)
  }
}

/**
 * Returns 4 random characters for ids
 * @returns { string } : random 4 Characters
 */
const rand4Char = (): string => {
  const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return [...Array(4).keys()]
    .map(() => (
      validCharacters.charAt(
        Math.floor(
          Math.random() * validCharacters.length
        )
      )
    ))
    .join('')
}

/**
 * Creates ID for product or collections classes
 * @param prefix : Either 'product' or 'collection';
 * @returns { typeID } : Id
 */
const generateID = (prefix: string): typeID => {
  return `${prefix}-${rand4Char()}-${Date.now()}`
}

/**
 * Example of Typescript Classes
 */
const classes = (): void => {
  scriptTitle('TypeScript Classes')

  const shirt: Product = new Product('Long Sleeve T-Shirt', 50.00)
  const shirtInfo: typeProductInfo = shirt.info

  console.log('Shirt Info:', shirtInfo)

  const collection: Collection = new Collection('My New Collection', [
    shirt,
    new Product('Amazing Backpack', 80.98),
    new Product('Orange Hat', 27.45)
  ])

  console.log('\nCollection Products:', collection.products)
}

export default classes
