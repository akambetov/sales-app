import { Bell } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Header, Avatar, Card, SearchInput } from '@components'
import { useUser } from '@contexts'
import { useStoresQuery } from '@queries'
import { useVisitContext } from '@store'
import { cn } from '@utils'

import { Metrics, RouteStatsFilter, StoreCards, StoreCardsSkeleton } from './components'

import type { IRouteStats } from './@types'
import type { IStore } from '@types'

const getMatchedSearch = ({ stores, search }: { stores: IStore[]; search: string }) => {
  const query = search.trim().toLowerCase()

  return stores.filter((store) =>
    [store.name, store.address, store.contractNo].join(' ').toLowerCase().includes(query)
  )
}

const SalesAgentRoute = () => {
  const user = useUser()
  const { initVisit } = useVisitContext()
  const { data: stores, isLoading } = useStoresQuery({ onSuccess: initVisit })
  const [filter, setFilter] = useState<keyof IRouteStats>('total')
  const [search, setSearch] = useState('')

  const groupedStatusStores = useMemo(() => {
    const notStarted = stores?.filter((s) => s.status === 'Не начат') ?? []
    const inProgress = stores?.filter((s) => s.status === 'В процессе') ?? []
    const done = stores?.filter((s) => s.status === 'Завершен') ?? []
    const overdue = stores?.filter((s) => s.status === 'Просрочен') ?? []
    const withDebt = stores?.filter((s) => s.debt > 0) ?? []
    const priority = stores?.filter((s) => s.priority) ?? []
    const total = stores ?? []

    return { notStarted, inProgress, done, overdue, withDebt, priority, total }
  }, [stores])

  const metrics = {
    total: groupedStatusStores.total.length,
    done: groupedStatusStores.done.length,
    inProgress: groupedStatusStores.inProgress.length,
    get left() {
      return this.total - this.done - this.inProgress
    }
  }

  const filteredStores = useMemo(() => {
    const getFilteredStores = () => {
      switch (filter) {
        case 'notStarted':
          return groupedStatusStores.notStarted
        case 'inProgress':
          return groupedStatusStores.inProgress
        case 'done':
          return groupedStatusStores.done
        case 'overdue':
          return groupedStatusStores.overdue
        case 'withDebt':
          return groupedStatusStores.withDebt
        case 'priority':
          return groupedStatusStores.priority
        default:
          return groupedStatusStores.total
      }
    }

    const filtered = getFilteredStores()

    if (!search) {
      return filtered
    }

    return getMatchedSearch({ stores: filtered, search })
  }, [filter, groupedStatusStores, search])

  const routeStats = useMemo(() => {
    const total = getMatchedSearch({ stores: groupedStatusStores.total, search }).length
    const notStarted = getMatchedSearch({ stores: groupedStatusStores.notStarted, search }).length
    const inProgress = getMatchedSearch({ stores: groupedStatusStores.inProgress, search }).length
    const done = getMatchedSearch({ stores: groupedStatusStores.done, search }).length
    const overdue = getMatchedSearch({ stores: groupedStatusStores.overdue, search }).length
    const withDebt = getMatchedSearch({ stores: groupedStatusStores.withDebt, search }).length
    const priority = getMatchedSearch({ stores: groupedStatusStores.priority, search }).length

    return { total, notStarted, inProgress, done, overdue, withDebt, priority }
  }, [groupedStatusStores, search])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

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
                  {metrics.done}/{metrics.total}
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
                  width: `${(metrics.done / metrics.total) * 100}%`
                }}
              />
            </div>
          </div>
        </Card>
        <Metrics metrics={metrics} isLoading={isLoading} />
        <SearchInput search={search} handleSearch={handleSearch} handleClear={handleClearSearch} />
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
