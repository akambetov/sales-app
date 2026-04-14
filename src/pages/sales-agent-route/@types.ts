export interface IRouteStats {
  total: number
  notStarted: number
  inProgress: number
  done: number
  overdue: number
  withDebt: number
  priority: number
}

export type TRouteDayFilter =
  | 'all'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
