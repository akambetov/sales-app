import type { TVisitStatus } from '../status'

export interface IStore {
  id: number
  name: string
  address: string
  contact: string
  phone: string
  contractNo: string
  delayDays: number
  type: string
  lastVisit: string
  lastOrderDate: string
  avgCheck: number
  debt: number
  overdueDebt: number
  visitWindow: string
  workDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  priority?: boolean
  risk?: boolean
  noOrderRisk?: boolean
  shelfRisk?: boolean
  status: TVisitStatus
  draft: boolean
}
