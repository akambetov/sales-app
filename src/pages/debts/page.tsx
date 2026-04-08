import { ChevronRight } from 'lucide-react'

import { Card, Header } from '@components'
import { useInvoicesQuery, useStoresQuery } from '@queries'
import { money } from '@utils'

import { MetricCard } from '../sales-agent-route/components/metric-card'

const DebtsPage = () => {
  const { data: stores } = useStoresQuery()
  const { data: invoices } = useInvoicesQuery()

  if (!stores || !invoices) {
    return null
  }

  const debtStores = stores.filter((s) => s.debt > 0)

  return (
    <div className="pb-28">
      <Header title="Долги" />
      <div className="space-y-4 px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <MetricCard
            label="Общий долг"
            value={money(debtStores.reduce((s, x) => s + x.debt, 0))}
            tone="red"
          />
          <MetricCard
            label="Просрочка"
            value={money(debtStores.reduce((s, x) => s + x.overdueDebt, 0))}
            tone="amber"
          />
          <MetricCard label="Договоров" value={`${debtStores.length}`} />
        </div>
        {debtStores.map((store) => (
          <Card key={store.id} className="cursor-pointer p-4" onClick={() => {}}>
            {/* <Card key={store.id} className="cursor-pointer p-4" onClick={() => { setSelectedDebtStoreId(store.id); setPage("debtInvoices"); }}> */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">{store.name}</div>
                <div className="mt-1 text-xs text-slate-500">{store.contractNo}</div>
              </div>
              <ChevronRight className="text-slate-400" size={18} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-slate-50 p-2.5">
                <div className="text-[10px] text-slate-500">Общий долг</div>
                <div className="mt-1 text-sm font-semibold text-red-700">{money(store.debt)}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-2.5">
                <div className="text-[10px] text-slate-500">Просрочка</div>
                <div className="mt-1 text-sm font-semibold text-amber-700">
                  {money(store.overdueDebt)}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-2.5">
                <div className="text-[10px] text-slate-500">Накладных</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {invoices.filter((i) => i.storeId === store.id && i.balance > 0).length}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DebtsPage
