import { useQuery } from '@tanstack/react-query'

import { fakeNetwork } from '@utils'

interface Invoice {
  id: number
  storeId: number
  invoiceNo: string
  date: string
  amount: number
  balance: number
  dueDate: string
  status: 'Просрочен' | 'Частично оплачен' | 'Открыт' | 'Закрыт'
}

export const invoicesSeed: Invoice[] = [
  {
    id: 1,
    storeId: 1,
    invoiceNo: 'INV-24031',
    date: '20.03.2026',
    amount: 80000,
    balance: 80000,
    dueDate: '03.04.2026',
    status: 'Просрочен'
  },
  {
    id: 2,
    storeId: 1,
    invoiceNo: 'INV-24118',
    date: '28.03.2026',
    amount: 40000,
    balance: 40000,
    dueDate: '11.04.2026',
    status: 'Открыт'
  },
  {
    id: 3,
    storeId: 3,
    invoiceNo: 'INV-24152',
    date: '30.03.2026',
    amount: 45000,
    balance: 15000,
    dueDate: '06.04.2026',
    status: 'Частично оплачен'
  },
  {
    id: 4,
    storeId: 5,
    invoiceNo: 'INV-23987',
    date: '14.03.2026',
    amount: 130000,
    balance: 130000,
    dueDate: '28.03.2026',
    status: 'Просрочен'
  }
]

export const useInvoicesQuery = () =>
  useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data } = await fakeNetwork({ response: { data: { invoices: invoicesSeed } } })

      return data.invoices
    }
  })
