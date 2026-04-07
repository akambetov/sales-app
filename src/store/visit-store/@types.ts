import type { useVisitStore } from './visit-store'
import type { IEquipment, TStepStatus, TVisitStatus } from '@types'

export interface IVisitState {
  status: TVisitStatus
  started: boolean
  stepStatuses: Record<string, TStepStatus>
  gpsDistanceKm: number
  gpsAcceptedOutside: boolean
  cart: Record<number, number>
  photos: string[]
  inventoryItems: {
    id: string
    name: string
    brand: string
    serial: string
    type: string
    photo: boolean
  }[]
  returns: { type: string; reason: string; qty: number }[]
  stockInputs: Record<number, number>
  priceInputs: Record<number, number>
  goodsInStore: Record<number, { exists: boolean; facings: number }>
  equipmentStatuses: Record<number, IEquipment['status']>
}

export type TVisitStore = ReturnType<typeof useVisitStore>
