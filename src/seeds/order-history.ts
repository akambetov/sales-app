import type { IOrderHistoryItem } from '@types'

export const orderHistorySeed: IOrderHistoryItem[] = [
  {
    id: 101,
    storeId: 1,
    date: '02.04.2026',
    total: 148000,
    skuCount: 5,
    units: 86,
    paymentForm: 'Безнал',
    items: [
      { productId: 1, qty: 30 },
      { productId: 3, qty: 18 },
      { productId: 5, qty: 24 }
    ]
  },
  {
    id: 102,
    storeId: 1,
    date: '25.03.2026',
    total: 182400,
    skuCount: 6,
    units: 93,
    paymentForm: 'Безнал',
    items: [
      { productId: 2, qty: 2 },
      { productId: 1, qty: 20 },
      { productId: 8, qty: 16 }
    ]
  },
  {
    id: 103,
    storeId: 2,
    date: '01.04.2026',
    total: 64000,
    skuCount: 4,
    units: 38,
    paymentForm: 'Наличные',
    items: [
      { productId: 6, qty: 10 },
      { productId: 7, qty: 16 }
    ]
  }
]
