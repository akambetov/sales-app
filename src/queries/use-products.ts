import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { productsSeed } from '@seeds'
import { fakeNetwork } from '@utils'

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
