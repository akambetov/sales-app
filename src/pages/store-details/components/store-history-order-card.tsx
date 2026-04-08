import { Card, SectionTitle } from '@components'
import { cn, money } from '@utils'

import type { IOrderHistoryItem } from '../@types'

export const StoreHistoryOrderCard = ({
  orders,
  isLoading
}: {
  orders: IOrderHistoryItem[]
  isLoading: boolean
}) => (
  <Card className="p-4">
    <SectionTitle title="История заказов" subtitle="Последние заказы за 6 месяцев" />
    <div className="space-y-3">
      {isLoading ? (
        <div className="animate-pulse rounded-2xl bg-slate-200 h-36" />
      ) : (
        orders.map((o) => (
          <div key={o.id} className={cn('rounded-2xl border border-slate-200 p-3')}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-900">Заказ от {o.date}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {o.skuCount} SKU • {o.units} шт • {o.paymentForm}
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-900">{money(o.total)}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700"
                // onClick={() => addHistoryToOrder(o.items)}
              >
                Добавить в текущий заказ
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </Card>
)
