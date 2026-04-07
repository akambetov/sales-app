export interface IProduct {
  id: number
  name: string
  brand: string
  category: string
  manufacturer: string
  barcode: string
  price: number
  stock: number
  unit: string
  mml?: boolean
  focus?: boolean
  promo?: boolean
  novelty?: boolean
  image: string
}
