import { Card, Select } from '@components'
import { cn } from '@utils'

import type { IRouteStats, TRouteDayFilter } from '../@types'

const FILTER: { label: string; key: keyof IRouteStats }[] = [
  { label: 'Все', key: 'total' },
  { label: 'Не начаты', key: 'notStarted' },
  { label: 'В процессе', key: 'inProgress' },
  { label: 'Завершены', key: 'done' },
  { label: 'Просрочены', key: 'overdue' },
  { label: 'С долгом', key: 'withDebt' },
  { label: 'Приоритет', key: 'priority' }
]

const DAY_FILTERS: { label: string; key: TRouteDayFilter }[] = [
  { label: 'Все дни', key: 'all' },
  { label: 'Понедельник', key: 'monday' },
  { label: 'Вторник', key: 'tuesday' },
  { label: 'Среда', key: 'wednesday' },
  { label: 'Четверг', key: 'thursday' },
  { label: 'Пятница', key: 'friday' },
  { label: 'Суббота', key: 'saturday' },
  { label: 'Воскресенье', key: 'sunday' }
]

const getDateByOffset = (offset: number) => {
  const date = new Date()

  date.setDate(date.getDate() + offset)

  return date.toLocaleDateString()
}

export const RouteStatsFilter = ({
  dayFilter,
  dayStats,
  routeStats,
  isLoading,
  filter,
  onDayFilterChange,
  onFilterChange
}: {
  dayFilter: TRouteDayFilter
  dayStats: Record<TRouteDayFilter, number>
  routeStats: IRouteStats
  isLoading: boolean
  filter: keyof IRouteStats
  onDayFilterChange: (filter: TRouteDayFilter) => void
  onFilterChange: (filter: keyof IRouteStats) => void
}) => {
  const dayOptions = DAY_FILTERS.map((item, idx) => ({
    value: item.key,
    label: `${item.key !== 'all' ? `${getDateByOffset(idx - 1)} - ` : ''}${item.label} (${dayStats[item.key]})`
  }))

  const filteredStats = FILTER.map((item) => ({
    ...item,
    count: routeStats[item.key],
    active: item.key === filter
  }))

  return (
    <Card className="p-3">
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="h-12 rounded-2xl bg-slate-100" />
          <div className="flex gap-2 overflow-hidden">
            <div className="h-9 w-20 rounded-full bg-slate-100" />
            <div className="h-9 w-26 rounded-full bg-slate-100" />
            <div className="h-9 w-24 rounded-full bg-slate-100" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Select
            label="Рабочий день"
            value={dayFilter}
            options={dayOptions}
            onChange={(event) => {
              onDayFilterChange(event.target.value as TRouteDayFilter)
            }}
            hint="Основной фильтр маршрута по дням недели"
          />
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-500">Статус</div>
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filteredStats.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    'cursor-pointer shrink-0 rounded-full border px-3 py-2 text-xs font-medium',
                    item.active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700'
                  )}
                  onClick={() => {
                    onFilterChange(item.key)
                  }}
                >
                  {item.label}
                  <span
                    className={cn(
                      'ml-1 rounded-full px-1.5 py-0.5 text-[10px]',
                      item.active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
