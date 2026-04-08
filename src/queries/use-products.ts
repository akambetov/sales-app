import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { fakeNetwork } from '@utils'

import type { IProduct } from '@types'

export const productsSeed: IProduct[] = [
  {
    id: 1,
    name: 'Shymkent Premium 0.5',
    brand: 'Shymkent',
    category: 'Пиво',
    manufacturer: 'ШПЗ',
    barcode: '487001111001',
    price: 620,
    stock: 340,
    unit: 'бут',
    mml: true,
    focus: true,
    image: '🍺'
  },
  {
    id: 2,
    name: 'Shymkent Draft 30L',
    brand: 'Shymkent',
    category: 'Кега',
    manufacturer: 'ШПЗ',
    barcode: '487001111002',
    price: 22400,
    stock: 42,
    unit: 'кега',
    focus: true,
    promo: true,
    image: '🛢️'
  },
  {
    id: 3,
    name: 'Wolf Forest 0.45',
    brand: 'Wolf',
    category: 'Пиво',
    manufacturer: 'ШП',
    barcode: '487001111003',
    price: 710,
    stock: 210,
    unit: 'бут',
    mml: true,
    promo: true,
    image: '🍻'
  },
  {
    id: 4,
    name: 'Capital Black 0.25',
    brand: 'Capital',
    category: 'Пиво',
    manufacturer: 'ШП',
    barcode: '487001111004',
    price: 540,
    stock: 190,
    unit: 'бан',
    novelty: true,
    image: '🥤'
  },
  {
    id: 5,
    name: 'Синяя гора легкая 0.45',
    brand: 'Синяя гора',
    category: 'Пиво',
    manufacturer: 'ШП',
    barcode: '487001111005',
    price: 680,
    stock: 165,
    unit: 'бут',
    mml: true,
    image: '🍺'
  },
  {
    id: 6,
    name: 'Qymyz Cola 1L',
    brand: 'Galanz',
    category: 'Напиток',
    manufacturer: 'Galanz',
    barcode: '487001111006',
    price: 520,
    stock: 460,
    unit: 'бут',
    promo: true,
    image: '🥤'
  },
  {
    id: 7,
    name: 'Cesna Water 1.5L',
    brand: 'Cesna',
    category: 'Вода',
    manufacturer: 'Cesna',
    barcode: '487001111007',
    price: 300,
    stock: 510,
    unit: 'бут',
    focus: true,
    image: '💧'
  },
  {
    id: 8,
    name: 'Wolf Mountains 0.45',
    brand: 'Wolf',
    category: 'Пиво',
    manufacturer: 'ШП',
    barcode: '487001111008',
    price: 730,
    stock: 120,
    unit: 'бут',
    mml: true,
    image: '🍺'
  }
]

export const useProductsQuery = () => {
  const { storeId } = useParams()

  return useQuery({
    queryKey: ['stores', storeId, 'products'],
    queryFn: async () => {
      const { data } = await fakeNetwork({
        response: {
          data: {
            products: productsSeed
          }
        }
      })

      return data.products
    }
  })
}
