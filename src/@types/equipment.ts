export interface IEquipment {
  id: number
  storeId: number
  name: string
  brand: string
  serial: string
  type: string
  status: 'Исправно' | 'Требует обслуживания' | 'Повреждено' | 'Не найдено'
}
