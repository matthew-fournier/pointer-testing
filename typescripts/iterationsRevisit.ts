import scriptTitle from '../helpers/scriptTitle'

interface InterSimpleProduct {
  title: string
  price: number
  inventory: number
  collections: string[]
}

const products: InterSimpleProduct[] = [
  { title: 'Plain T-Shirt', price: 39, inventory: 400, collections: ['tops', 't-shirts'] },
  { title: 'Striped Tee', price: 52, inventory: 30, collections: ['tops', 't-shirts'] },
  { title: 'Branded Hoodie', price: 78, inventory: 400, collections: ['tops', 'hoodie'] },
  { title: 'Socks', price: 12, inventory: 0, collections: ['socks'] }
]

/**
 *
 * @param collectionHandle { string } : A collection handle to search
 * @returns Array of products in collection
 */
const speedBreakdownExample = (collectionHandle: string): InterSimpleProduct[] => {
  // Filter using .filter()
  console.time('Filter Collection')
  const collectionTShirt: InterSimpleProduct[] = products.filter(product => product.collections.includes(collectionHandle))
  console.log(collectionTShirt)
  console.timeEnd('Filter Collection')

  // Filter using 'for of loop'
  console.time('Filter Collection For of Loop')
  const collectionTShirtArray: InterSimpleProduct[] = []
  for (const product of products) {
    if (product.collections.includes(collectionHandle) === false) { continue }
    collectionTShirtArray.push(product)
  }
  console.log(collectionTShirtArray)
  console.timeEnd('Filter Collection For of Loop')

  // Filter using 'for loop'
  console.time('Filter Collection For Loop')
  const collectionTShirtArray2: InterSimpleProduct[] = []
  for (let i = 0; i < products.length; i++) {
    if (products[i].collections.includes(collectionHandle) === false) { continue }
    collectionTShirtArray2.push(products[i])
  }
  console.log(collectionTShirtArray2)
  console.timeEnd('Filter Collection For Loop')

  return collectionTShirt
}

/**
 * Main Function to demo iterations
 */
const iterationsRevisit = (): void => {
  scriptTitle('Iterations Revisit')
  speedBreakdownExample('t-shirts')

  // Products that are sold out
  // const soldOutProducts: InterSimpleProduct[] =
  // console.log(soldOutProducts)

  // A single product that has an invintory of 400
  // const singleProductOf400: InterSimpleProduct | undefined =
  // console.log(singleProductOf400)

  // Tops that cost over $50
  // const topsOver50: InterSimpleProduct[] =
  // console.log(topsOver50)

  // An array of all product names
  // const productNames: string[] =
  // console.log(productNames)

  // Total stock of all products
  // const totalStock: number =
  // console.log(totalStock)
}

export default iterationsRevisit
