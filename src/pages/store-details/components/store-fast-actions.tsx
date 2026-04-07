import { FileText, Phone, Route, Wallet } from 'lucide-react'

import { Card, SectionTitle } from '@components'

import type { IStore } from '@types'

export const StoreFastActions = ({ store }: { store: IStore }) => (
  <Card className="p-4">
    <SectionTitle title="Быстрые действия" />
    <div className="grid grid-cols-4 gap-3 text-center text-xs">
      <button className="rounded-3xl bg-slate-50 p-3">
        <Phone className="mx-auto mb-2" size={18} />
        <a href={`tel:${store.phone}`} className="block">
          Позвонить
        </a>
      </button>
      <button className="rounded-3xl bg-slate-50 p-3">
        <Route className="mx-auto mb-2" size={18} />
        Маршрут
      </button>
      <button className="rounded-3xl bg-slate-50 p-3">
        <FileText className="mx-auto mb-2" size={18} />
        История
      </button>
      <button
        className="rounded-3xl bg-slate-50 p-3"
        onClick={() => {
          // setSelectedDebtStoreId(selectedStore.id)
          // setPage('debtInvoices')
        }}
      >
        <Wallet className="mx-auto mb-2" size={18} />
        Долги
      </button>
    </div>
  </Card>
)
