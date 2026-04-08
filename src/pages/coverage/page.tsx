import { Card, Header } from '@components'
import { useStoresQuery } from '@queries'
import { cn, money } from '@utils'

export const CoveragePage = () => {
  const { data: stores } = useStoresQuery()

  if (!stores) {
    return null
  }

  return (
    <div className="pb-28">
      <Header title="Покрытие" />
      <div className="space-y-4 px-4 py-4">
        <Card className="p-4">
          <div className="text-sm font-semibold text-slate-900">Покрытие</div>
          <div className="mt-1 text-xs text-slate-500">
            Все ТТ, закрепленные за торговым представителем
          </div>
        </Card>
        {stores.map((store) => (
          <Card key={store.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">{store.name}</div>
                <div className="mt-1 text-xs text-slate-500">{store.address}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {store.contractNo} • Последний визит: {store.lastVisit}
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium',
                  store.debt > 0
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                )}
              >
                {store.debt > 0 ? `Долг ${money(store.debt)}` : 'Без долга'}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CoveragePage
