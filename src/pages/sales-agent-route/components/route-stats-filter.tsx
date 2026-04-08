import { cn } from '@utils'

import type { IRouteStats } from '../@types'

const FILTER: { label: string; key: keyof IRouteStats }[] = [
  { label: 'Все', key: 'total' },
  { label: 'Не начаты', key: 'notStarted' },
  { label: 'В процессе', key: 'inProgress' },
  { label: 'Завершены', key: 'done' },
  { label: 'Просрочены', key: 'overdue' },
  { label: 'С долгом', key: 'withDebt' },
  { label: 'Приоритет', key: 'priority' }
]

export const RouteStatsFilter = ({
  routeStats,
  isLoading,
  filter,
  onFilterChange
}: {
  routeStats: IRouteStats
  isLoading: boolean
  filter: keyof IRouteStats
  onFilterChange: (filter: keyof IRouteStats) => void
}) => {
  const filteredStats = FILTER.map((f) => ({
    ...f,
    count: routeStats[f.key],
    active: f.key === filter
  }))

  const handleFilterChange = (newFilter: keyof IRouteStats) => () => {
    onFilterChange(newFilter)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {filteredStats.map((item) =>
        isLoading ? (
          <div key={item.label} className={cn('animate-pulse rounded bg-slate-50 p-2')}>
            <div className="w-20 h-6 mb-2 rounded bg-slate-200" />
          </div>
        ) : (
          <button
            key={item.label}
            className={cn(
              'cursor-pointer shrink-0 rounded-full border px-3 py-2 text-xs font-medium',
              item.active
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700'
            )}
            onClick={handleFilterChange(item.key)}
          >
            {item.label}{' '}
            <span
              className={cn(
                'ml-1 rounded-full px-1.5 py-0.5 text-[10px]',
                item.active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
              )}
            >
              {item.count}
            </span>
          </button>
        )
      )}
    </div>
  )
}
