import type { useVisitStore } from './visit-store'
import type { TVisitStatus } from '@types'

interface IEquipment {
  id: number
  storeId: number
  name: string
  brand: string
  serial: string
  type: string
  status: 'Исправно' | 'Требует обслуживания' | 'Повреждено' | 'Не найдено'
}

type TStepStatus = 'Не начат' | 'Выполнен' | 'Выполнен с отклонением'
interface IVisitState {
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

type TVisitStore = ReturnType<typeof useVisitStore>

export type { TStepStatus, IVisitState, TVisitStore }
