import { useQuery } from '@tanstack/react-query'

import { fakeNetwork } from '@utils'

const mockData = {
  data: {
    user: {
      name: 'Петров',
      lastName: 'Петр'
    }
  }
}

export const useRootQuery = () =>
  useQuery({
    queryKey: ['root'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: mockData })

      return data.user
    }
  })
