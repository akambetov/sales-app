import { useQuery } from '@tanstack/react-query'

import { storesSeed } from '@seeds'
import { fakeNetwork } from '@utils'

import type { IStore } from '@types'

export const useStoresQuery = (params?: { onSuccess: (data: IStore[]) => void }) =>
  useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: { data: { stores: storesSeed } } })
      params?.onSuccess(data.stores)

      return data.stores
    }
  })
