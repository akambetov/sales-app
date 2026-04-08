import { Bell } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Header, Avatar, Card } from '@components'
import { useUser } from '@contexts'
import { useVisitContext } from '@store'
import { cn } from '@utils'

import { Metrics, RouteStatsFilter, StoreCards, StoreCardsSkeleton } from './components'
import { useStoresQuery } from './query'

import type { IRouteStats } from './@types'

const SalesAgentRoute = () => {
  const user = useUser()
  const { initVisit } = useVisitContext()
  const { data: stores, isLoading } = useStoresQuery({ onSuccess: initVisit })
  const [filter, setFilter] = useState<keyof IRouteStats>('total')

  const groupedStores = useMemo(() => {
    const notStarted = stores?.filter((s) => s.status === 'Не начат') ?? []
    const inProgress = stores?.filter((s) => s.status === 'В процессе') ?? []
    const done = stores?.filter((s) => s.status === 'Завершен') ?? []
    const overdue = stores?.filter((s) => s.status === 'Просрочен') ?? []
    const withDebt = stores?.filter((s) => s.debt > 0) ?? []
    const priority = stores?.filter((s) => s.priority) ?? []
    const total = stores ?? []

    return { notStarted, inProgress, done, overdue, withDebt, priority, total }
  }, [stores])

  const filteredStores = useMemo(() => {
    switch (filter) {
      case 'notStarted':
        return groupedStores.notStarted
      case 'inProgress':
        return groupedStores.inProgress
      case 'done':
        return groupedStores.done
      case 'overdue':
        return groupedStores.overdue
      case 'withDebt':
        return groupedStores.withDebt
      case 'priority':
        return groupedStores.priority
      default:
        return groupedStores.total
    }
  }, [filter, groupedStores])

  const routeStats = useMemo(() => {
    const total = groupedStores.total.length
    const notStarted = groupedStores.notStarted.length
    const inProgress = groupedStores.inProgress.length
    const done = groupedStores.done.length
    const overdue = groupedStores.overdue.length
    const withDebt = groupedStores.withDebt.length
    const priority = groupedStores.priority.length
    const left = total - done - inProgress

    return { total, notStarted, inProgress, done, overdue, withDebt, priority, left }
  }, [groupedStores])

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
        <RouteStatsFilter
          routeStats={routeStats}
          isLoading={isLoading}
          filter={filter}
          onFilterChange={setFilter}
        />
        {isLoading ? <StoreCardsSkeleton /> : <StoreCards stores={filteredStores} />}
      </div>
    </>
  )
}

export default SalesAgentRoute
