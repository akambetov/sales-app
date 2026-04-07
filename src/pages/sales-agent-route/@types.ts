import type { TVisitStatus } from '@types'

interface IStore {
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
  priority?: boolean
  risk?: boolean
  noOrderRisk?: boolean
  shelfRisk?: boolean
  status: TVisitStatus
}

interface IRouteStats {
  total: number
  notStarted: number
  inProgress: number
  done: number
  overdue: number
  withDebt: number
  priority: number
  left: number
}

export type { IStore, IRouteStats }
