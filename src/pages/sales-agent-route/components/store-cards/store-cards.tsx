import { useNavigate } from 'react-router'

import { Card, Chip } from '@components'
import { useVisitContext } from '@store'
import { cn, money, statusTone } from '@utils'

import type { IStore } from '@types'

const StoreCards = ({ stores }: { stores: IStore[] }) => {
  const navigate = useNavigate()
  const { visitState, startVisit } = useVisitContext()

  const handleSelectStore = (storeId: number) => () => {
    navigate(`/store/${storeId}`)
  }

  const handleVisit = (storeId: number) => {
    navigate(`/store/${storeId}/visit-steps`)
  }

  return (
    <div className="space-y-3">
      {stores.map((store) => {
        const visit = visitState?.[store.id]
        const completed = visit
          ? Object.values(visit.stepStatuses).filter((v) => v !== 'Не начат').length
          : 0

        return (
          <Card
            key={store.id}
            className="cursor-pointer p-4 transition hover:shadow-md"
            onClick={handleSelectStore(store.id)}
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

            <div className="mt-3 flex flex-wrap gap-2">
              {store.debt > 0 ? <Chip tone="danger">Есть долг</Chip> : null}
              {store.noOrderRisk ? <Chip tone="warning">Нет заказа</Chip> : null}
              {store.shelfRisk ? <Chip tone="warning">Риск по полке</Chip> : null}
              {store.risk ? <Chip tone="danger">Требует внимания</Chip> : null}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700"
                onClick={handleSelectStore(store.id)}
              >
                Карточка ТТ
              </button>
              <button
                className="cursor-pointer rounded-2xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  startVisit(store.id)
                  handleVisit(store.id)
                }}
              >
                {visit?.started ? 'Продолжить визит' : 'Начать визит'}
              </button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

const StoreCardsSkeleton = () => {
  const skeletonBaseClasses = 'flex-1 bg-slate-200 rounded'

  return (
    <div className="animate-pulse rounded-2xl bg-slate-50 p-4">
      <div className="flex gap-2 mb-2">
        <div className={cn(skeletonBaseClasses, 'h-20')} />
        <div className={cn(skeletonBaseClasses, 'h-20')} />
      </div>
      <div className="flex gap-2 mb-2">
        <div className={cn(skeletonBaseClasses, 'h-16')} />
        <div className={cn(skeletonBaseClasses, 'h-16')} />
        <div className={cn(skeletonBaseClasses, 'h-16')} />
      </div>
      <div className="flex gap-2 mb-2">
        <div className={cn(skeletonBaseClasses, 'h-10')} />
        <div className={cn(skeletonBaseClasses, 'h-10')} />
        <div className={cn(skeletonBaseClasses, 'h-10')} />
      </div>
      <div className="flex gap-2">
        <div className={cn(skeletonBaseClasses, 'h-16')} />
        <div className={cn(skeletonBaseClasses, 'h-16')} />
      </div>
    </div>
  )
}

export { StoreCards, StoreCardsSkeleton }
