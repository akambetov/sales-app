import { Bell } from 'lucide-react'
import { useMemo } from 'react'

import { Header, Avatar, Card } from '@components'
import { useUser } from '@contexts'

import { Metrics } from './components'
import { useStoresQuery } from './query'

const SalesAgentRoute = () => {
  const user = useUser()
  const { data: stores, isLoading } = useStoresQuery()
  // const visitData = useVisitData(stores.map((s) => s.id))
  // const routeStats = getRouteStats(stores)

  const routeStats = useMemo(() => {
    if (stores) {
      const total = stores.length
      const done = stores.filter((s) => s.status === 'Завершен').length
      const inProgress = stores.filter((s) => s.status === 'В процессе').length
      const left = total - done - inProgress

      return { total, done, inProgress, left }
    }

    return { total: 0, done: 0, inProgress: 0, left: 0 }
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
                <div className="text-base font-semibold">
                  {/* {routeStats.done}/{routeStats.total} */}
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-white"
                // style={{ width: `${(routeStats.done / routeStats.total) * 100}%` }}
              />
            </div>
          </div>
        </Card>
        <Metrics isLoading={isLoading} metrics={routeStats} />

        {/* 
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { label: 'Все', count: routeStats.total, active: true },
          { label: 'Не начаты', count: stores.filter((s) => s.status === 'Не начат').length },
          { label: 'В процессе', count: stores.filter((s) => s.status === 'В процессе').length },
          { label: 'Завершены', count: stores.filter((s) => s.status === 'Завершен').length },
          { label: 'Просрочены', count: stores.filter((s) => s.status === 'Просрочен').length },
          { label: 'С долгом', count: stores.filter((s) => s.debt > 0).length },
          { label: 'Приоритет', count: stores.filter((s) => s.priority).length }
        ].map((item) => (
          <button
            key={item.label}
            className={cn(
              'shrink-0 rounded-full border px-3 py-2 text-xs font-medium',
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
        ))}
      </div>

      <Card className="p-3">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5">
          <Search size={16} className="text-slate-400" />
          <input
            placeholder="Поиск по ТТ, договору, адресу"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </Card>

      <div className="space-y-3">
        {stores.map((store) => {
          const visit = visitData[store.id]
          const completed = Object.values(visit.stepStatuses).filter((v) => v !== 'Не начат').length
          return (
            <Card key={store.id} className="p-4 transition hover:shadow-md">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setSelectedStoreId(store.id)
                  setPage('store')
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate text-[15px] font-semibold text-slate-900">
                        {store.name}
                      </div>
                      {store.priority ? <Chip tone="blue">Приоритет</Chip> : null}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{store.address}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {store.contact} • {store.contractNo}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium',
                        statusTone(store.status)
                      )}
                    >
                      {store.status}
                    </span>
                    <div className="mt-2 text-xs text-slate-500">{store.visitWindow}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-slate-50 p-2.5">
                    <div className="text-[10px] text-slate-500">Долг</div>
                    <div
                      className={cn(
                        'mt-1 text-sm font-semibold',
                        store.debt > 0 ? 'text-red-700' : 'text-slate-900'
                      )}
                    >
                      {money(store.debt)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-2.5">
                    <div className="text-[10px] text-slate-500">Последний заказ</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {store.lastOrderDate}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-2.5">
                    <div className="text-[10px] text-slate-500">Шаги визита</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{completed}/12</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {store.debt > 0 ? <Chip tone="danger">Есть долг</Chip> : null}
                {store.noOrderRisk ? <Chip tone="warning">Нет заказа</Chip> : null}
                {store.shelfRisk ? <Chip tone="warning">Риск по полке</Chip> : null}
                {store.risk ? <Chip tone="danger">Требует внимания</Chip> : null}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700"
                  onClick={() => {
                    setSelectedStoreId(store.id)
                    setPage('store')
                  }}
                >
                  Карточка ТТ
                </button>
                <button
                  className="rounded-2xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white"
                  onClick={() => startVisit(store.id)}
                >
                  {visit.started ? 'Продолжить визит' : 'Начать визит'}
                </button>
              </div>
            </Card>
          )
        })}
      </div> */}
      </div>
    </>
  )
}

export default SalesAgentRoute
