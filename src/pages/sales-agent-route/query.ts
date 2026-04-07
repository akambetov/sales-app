import { useQuery } from '@tanstack/react-query'

import { storesSeed } from '@seeds'
import { fakeNetwork } from '@utils'

import type { IStore } from '@types'

export const useStoresQuery = ({ onSuccess }: { onSuccess: (data: IStore[]) => void }) =>
  useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: { data: { stores: storesSeed } } })
      onSuccess(data.stores)

      return data.stores
    }
  })
