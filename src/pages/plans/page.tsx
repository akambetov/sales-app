import { Card, Header } from '@components'
import { usePlansQuery } from '@queries'
import { cn, money, percent } from '@utils'

const PlansPage = () => {
  const { data: plans } = usePlansQuery()

  if (!plans) {
    return null
  }

  return (
    <div className="pb-28">
      <Header title="Планы" />
      <div className="space-y-4 px-4 py-4">
        {plans.map((k) => {
          const p = percent(k.plan, k.fact)
          return (
            <Card key={k.name} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{k.name}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    План: {k.plan > 100 ? money(k.plan) : k.plan} • Факт:{' '}
                    {k.fact > 100 ? money(k.fact) : k.fact}
                  </div>
                </div>
                <div
                  className={cn(
                    'rounded-2xl px-3 py-2 text-sm font-semibold',
                    p >= 80
                      ? 'bg-emerald-50 text-emerald-700'
                      : p >= 50
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                  )}
                >
                  {p}%
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default PlansPage
