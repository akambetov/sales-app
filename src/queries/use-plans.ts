import { useQuery } from '@tanstack/react-query'

import { fakeNetwork } from '@utils'

export const plansSeed = [
  { name: 'Сумма продаж', plan: 450000, fact: 286400 },
  { name: 'SKU', plan: 28, fact: 16 },
  { name: 'MML', plan: 90, fact: 72 },
  { name: 'Фокусные SKU', plan: 18, fact: 9 },
  { name: 'Сбор долга', plan: 150000, fact: 80000 }
]

export const usePlansQuery = () =>
  useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data } = await fakeNetwork({
        response: {
          data: {
            plans: plansSeed
          }
        }
      })

      return data.plans
    }
  })
