import { cn } from '@utils'

import type { IRouteStats } from '../@types'

export const RouteStatsFilter = ({
  routeStats,
  isLoading
}: {
  routeStats: IRouteStats
  isLoading: boolean
}) => (
  <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {[
      { label: 'Все', count: routeStats.total, active: true },
      { label: 'Не начаты', count: routeStats.notStarted },
      { label: 'В процессе', count: routeStats.inProgress },
      { label: 'Завершены', count: routeStats.done },
      { label: 'Просрочены', count: routeStats.overdue },
      { label: 'С долгом', count: routeStats.withDebt },
      { label: 'Приоритет', count: routeStats.priority }
    ].map((item) =>
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
