import { useQuery } from '@tanstack/react-query'

import { invoicesSeed } from '@seeds'
import { fakeNetwork } from '@utils'

export const useInvoicesQuery = () =>
  useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: { data: { invoices: invoicesSeed } } })

      return data.invoices
    }
  })
