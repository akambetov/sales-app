import type { IStore } from '@types'

export interface IRouteCoordinate {
  storeId: IStore['id']
  position: [number, number]
}

export const routeCoordinatesSeed: IRouteCoordinate[] = [
  { storeId: 1, position: [42.3336, 69.5895] },
  { storeId: 2, position: [42.3467, 69.6288] },
  { storeId: 3, position: [42.3214, 69.5992] },
  { storeId: 4, position: [42.3318, 69.6426] },
  { storeId: 5, position: [42.3088, 69.6505] }
]
