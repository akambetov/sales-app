import { useQuery } from '@tanstack/react-query'

import { fakeNetwork } from '@utils'

import { storesSeed } from './seeds'

export const useStoresQuery = () =>
  useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: { data: { stores: storesSeed } } })

      return data.stores
    }
  })
