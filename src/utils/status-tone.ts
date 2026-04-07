import type { TVisitStatus } from '@types'

export const statusTone = (status: TVisitStatus) => {
  switch (status) {
    case 'Завершен':
    case 'Выполнен':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'В процессе':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'Просрочен':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'Выполнен с отклонением':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200'
  }
}
