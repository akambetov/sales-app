import { Bell } from 'lucide-react'
import { useMemo } from 'react'

import { Header, Avatar, Card } from '@components'
import { useUser, useVisit } from '@contexts'
import { cn } from '@utils'

import { Metrics, RouteStatsFilter, StoreCards, StoreCardsSkeleton } from './components'
import { useStoresQuery } from './query'

import type { IRouteStats } from './@types'

const DEFAULT_ROUTE_STATS: IRouteStats = {
  total: 0,
  notStarted: 0,
  inProgress: 0,
  done: 0,
  overdue: 0,
  withDebt: 0,
  priority: 0,
  left: 0
}

const SalesAgentRoute = () => {
  const user = useUser()
  const { initVisit } = useVisit()
  const { data: stores, isLoading } = useStoresQuery({ onSuccess: initVisit })

  const routeStats = useMemo(() => {
    if (stores) {
      const total = stores.length
      const notStarted = stores.filter((s) => s.status === 'Не начат').length
      const inProgress = stores.filter((s) => s.status === 'В процессе').length
      const done = stores.filter((s) => s.status === 'Завершен').length
      const overdue = stores.filter((s) => s.status === 'Просрочен').length
      const withDebt = stores.filter((s) => s.debt > 0).length
      const priority = stores.filter((s) => s.priority).length
      const left = total - done - inProgress

      return { total, notStarted, inProgress, done, overdue, withDebt, priority, left }
    }

    return DEFAULT_ROUTE_STATS
  }, [stores])

  return (
    <>
      <Header
        title="Маршрут"
        left={<Avatar name={user.name} lastName={user.lastName} />}
        right={
          <button className="rounded-2xl border border-slate-200 p-2 text-slate-700">
            <Bell size={18} />
          </button>
        }
      />
      <div className="space-y-4 px-4 py-4">
        <Card className="overflow-hidden bg-slate-900 text-white ">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs">Торговый представитель</div>
                <div className="mt-1 text-lg font-semibold">
                  {user.name} {user.lastName}
                </div>
                <div className="mt-1 text-xs">Территория: Шымкент • Маршрут на сегодня</div>
              </div>
              <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                <div className="text-[11px] text-slate-300">Прогресс дня</div>
                <div
                  className={cn(
                    'text-base font-semibold',
                    isLoading ? 'animate-pulse rounded bg-slate-200 text-transparent mt-2' : ''
                  )}
                >
                  {routeStats.done}/{routeStats.total}
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div
                className={cn(
                  'h-2 rounded-full',
                  isLoading ? 'animate-pulse bg-slate-200' : 'bg-white'
                )}
                style={{
                  width: `${(routeStats.done / routeStats.total) * 100}%`
                }}
              />
            </div>
          </div>
        </Card>
        <Metrics metrics={routeStats} isLoading={isLoading} />
        {/* <Card className="p-3">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Поиск по ТТ, договору, адресу"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </Card> */}
        <RouteStatsFilter routeStats={routeStats} isLoading={isLoading} />
        {isLoading ? <StoreCardsSkeleton /> : <StoreCards stores={stores ?? []} />}
      </div>
    </>
  )
}

export default SalesAgentRoute
