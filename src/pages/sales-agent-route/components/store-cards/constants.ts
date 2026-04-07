import {
  Boxes,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  MapPin,
  PackageSearch,
  Receipt,
  ScanBarcode,
  ShoppingCart,
  Target
} from 'lucide-react'

import type { IVisitState } from './@types'
import type { TStepStatus } from '@types'

const VISIT_STEP_DEFINITIONS = [
  {
    id: 'gps',
    title: 'GPS',
    required: false,
    icon: MapPin,
    description: 'Подтверждение местоположения'
  },
  {
    id: 'storeInfo',
    title: 'Инфо о ТТ',
    required: false,
    icon: FileText,
    description: 'Договор, история, MML, долг'
  },
  {
    id: 'kpi',
    title: 'KPI в начале визита',
    required: false,
    icon: Target,
    description: 'План, факт, выполнение'
  },
  {
    id: 'order',
    title: 'Заказ',
    required: false,
    icon: ShoppingCart,
    description: 'SKU, промо, скидки, сумма'
  },
  {
    id: 'returns',
    title: 'Возврат',
    required: false,
    icon: Receipt,
    description: 'Товар, кега, оборудование'
  },
  {
    id: 'stocks',
    title: 'Остатки на ТТ',
    required: false,
    icon: Boxes,
    description: 'Анкета по остаткам'
  },
  {
    id: 'shelfPhoto',
    title: 'Фото полки',
    required: true,
    icon: Camera,
    description: 'Обязательный фотоотчет'
  },
  {
    id: 'priceControl',
    title: 'Контроль цен',
    required: false,
    icon: CircleDollarSign,
    description: 'Факт vs рекомендованная цена'
  },
  {
    id: 'goodsInStore',
    title: 'Товары в точке',
    required: false,
    icon: PackageSearch,
    description: 'Наличие и фейсинги'
  },
  {
    id: 'equipmentCheck',
    title: 'Проверка оборудования',
    required: false,
    icon: ClipboardCheck,
    description: 'Статус и комментарий'
  },
  {
    id: 'inventory',
    title: 'Инвентаризация',
    required: true,
    icon: ScanBarcode,
    description: 'Обязательная проверка оборудования'
  },
  {
    id: 'finish',
    title: 'Завершение визита',
    required: true,
    icon: CheckCircle2,
    description: 'Итог и валидация визита'
  }
]

const INITIAL_VISIT_STATE: IVisitState = {
  status: 'Не начат',
  started: false,
  stepStatuses: Object.fromEntries(VISIT_STEP_DEFINITIONS.map((s) => [s.id, 'Не начат'])) as Record<
    string,
    TStepStatus
  >,
  gpsDistanceKm: 1.2,
  gpsAcceptedOutside: false,
  cart: {},
  photos: [],
  inventoryItems: [],
  returns: [],
  stockInputs: {},
  priceInputs: {},
  goodsInStore: {},
  equipmentStatuses: {}
}

export { INITIAL_VISIT_STATE }
