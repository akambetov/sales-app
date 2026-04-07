import { money } from '@utils'

import { MetricCard } from '../../sales-agent-route/components/metric-card'

import type { IStore } from '@types'

export const StoreMetrics = ({ store }: { store: IStore }) => (
  <div className="grid grid-cols-2 gap-3">
    <MetricCard
      label="Текущий долг"
      value={money(store.debt)}
      tone={store.debt > 0 ? 'red' : 'green'}
    />
    <MetricCard label="MML" value="72%" tone="amber" />
    <MetricCard label="Последний заказ" value={store.lastOrderDate} tone="blue" />
    <MetricCard label="Средний чек" value={money(store.avgCheck)} />
  </div>
)
