import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { storesSeed } from '@seeds'
import { fakeNetwork } from '@utils'

import type { IStore } from '@types'

export const useStoreByIdQuery = (onSuccess?: (store: IStore | undefined) => void) => {
  const { storeId } = useParams()

  return useQuery({
    queryKey: ['stores', storeId],
    queryFn: async () => {
      const { data } = await fakeNetwork({
        response: {
          data: { store: storesSeed.find((store) => storeId && store.id === Number(storeId)) }
        }
      })
      onSuccess?.(data.store)

      return data.store
    }
  })
}
