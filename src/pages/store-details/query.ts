import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { orderHistorySeed, productsSeed, storesSeed } from '@seeds'
import { fakeNetwork } from '@utils'

export const useStoreByIdQuery = () => {
  const { storeId } = useParams()

  return useQuery({
    queryKey: ['stores', storeId],
    queryFn: async () => {
      const { data } = await fakeNetwork({
        response: {
          data: { stores: storesSeed.find((store) => storeId && store.id === Number(storeId)) }
        }
      })

      return data.stores
    }
  })
}

export const useStoreOrderHistoryQuery = () => {
  const { storeId } = useParams()

  return useQuery({
    queryKey: ['stores', storeId, 'orderHistory'],
    queryFn: async () => {
      const { data } = await fakeNetwork({
        response: {
          data: {
            orderHistory: orderHistorySeed.filter(
              (store) => storeId && store.storeId === Number(storeId)
            )
          }
        }
      })

      return data.orderHistory
    }
  })
}

export const useStoreProductsQuery = () => {
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
