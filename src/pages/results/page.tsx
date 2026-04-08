import { Card, Header, SectionTitle } from '@components'
import { useInvoicesQuery, useProductsQuery, useStoresQuery } from '@queries'
import { useVisitContext } from '@store'
import { money } from '@utils'

import { MetricCard } from '../sales-agent-route/components/metric-card'

const ResultsPage = () => {
  const { visitState, initVisit } = useVisitContext()
  const { data: products } = useProductsQuery()
  const { data: invoices } = useInvoicesQuery()
  const { data: stores } = useStoresQuery({ onSuccess: initVisit })

  if (!invoices || !stores || !products || !visitState) {
    return null
  }

  const doneVisits = Object.values(visitState).filter((visit) => visit.status === 'Завершен')
  const orders = doneVisits.map((visit) =>
    Object.entries(visit.cart)
      .filter(([, qty]) => qty > 0)
      .map(([productId, qty]) => ({
        product: products.find((p) => p.id === Number(productId))!,
        qty
      }))
  )
  const ordersAmount = orders.reduce((sum, orderPosition) => {
    const orderPositionSum = orderPosition.reduce(
      (positionSum, items) => positionSum + items.product.price * items.qty,
      0
    )

    return sum + orderPositionSum
  }, 0)

  const orderUnits = orders.reduce((sum, orderPosition) => {
    const orderPositionSum = orderPosition.reduce(
      (positionSum, items) => positionSum + items.qty,
      0
    )

    return sum + orderPositionSum
  }, 0)

  const ordersSkuCount = orders.reduce((sum, order) => sum + order.length, 0)

  const paidAmount = invoices.reduce((sum, inv) => {
    const current = invoices.find((i) => i.id === inv.id) ?? inv
    return sum + (current.amount - current.balance)
  }, 0)

  return (
    <div className="pb-28">
      <Header title="Результат работы" />
      <div className="space-y-4 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Сумма заказов" value={money(ordersAmount || 49700)} tone="blue" />
          <MetricCard label="Шт" value={`${orderUnits || 142}`} />
          <MetricCard label="SKU" value={`${ordersSkuCount || 16}`} />
          <MetricCard
            label="Завершено визитов"
            value={`${stores.filter((s) => s.status === 'Завершен').length}`}
            tone="green"
          />
        </div>
        <MetricCard label="Собрано долгов" value={money(paidAmount)} tone="amber" />
        <Card className="p-4">
          <SectionTitle title="По брендам" />
          <div className="space-y-2">
            {[
              { brand: 'Shymkent', sum: 140000, qty: 68 },
              { brand: 'Wolf', sum: 92000, qty: 51 },
              { brand: 'Cesna', sum: 54400, qty: 23 }
            ].map((b) => (
              <div
                key={b.brand}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5 text-sm"
              >
                <span className="font-medium text-slate-900">{b.brand}</span>
                <span className="text-slate-600">
                  {money(b.sum)} • {b.qty} шт
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ResultsPage
