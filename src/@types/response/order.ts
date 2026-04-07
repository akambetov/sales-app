export interface IOrderHistoryItem {
  id: number
  storeId: number
  date: string
  total: number
  skuCount: number
  units: number
  paymentForm: string
  items: { productId: number; qty: number }[]
}
