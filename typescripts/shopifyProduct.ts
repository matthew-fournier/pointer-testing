import axios, { AxiosResponse } from 'axios'
import scriptTitle from '../helpers/scriptTitle'

interface ShopifyProduct {
  id: number
  title: string
  variants: Array<{
    title: string
    price: string
    sku: string
  }>
}

const shopifyProduct = async (): Promise<void> => {
  try {
    scriptTitle('Shopify Product Example')

    const axiosRes: AxiosResponse = await axios('https://dudeproducts.com/products/dude-wipes-48ct-dispenser-30pk-travel-home-away-combo.json')
    const productData: ShopifyProduct = axiosRes.data.product

    const { title, id, variants: [{ title: firstVarTitle, price, sku }] } = productData
    console.log(title, id, firstVarTitle, price, sku)
  } catch (err) {
    console.log(err)
  }
}

export default shopifyProduct
