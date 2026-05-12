import type { IStore } from '@types'

export interface IRouteCoordinate {
  storeId: IStore['id']
  position: { lat: number; lng: number }
}

export const routeCoordinatesSeed: IRouteCoordinate[] = [
  { storeId: 1, position: { lat: 42.323638, lng: 69.586446 } },
  { storeId: 2, position: { lat: 42.312382, lng: 69.610963 } },
  { storeId: 3, position: { lat: 42.339193, lng: 69.59893 } },
  { storeId: 4, position: { lat: 42.317246, lng: 69.636704 } },
  { storeId: 5, position: { lat: 42.320933, lng: 69.620102 } }
]
