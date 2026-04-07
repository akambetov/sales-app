import { Card, SectionTitle } from '@components'
import { Chip } from '@components'

import type { IProduct } from '@types'

export const StoreProductsList = ({
  products,
  isLoading
}: {
  products: IProduct[]
  isLoading: boolean
}) => (
  <Card className="p-4">
    <SectionTitle title="MML / Ассортиментный список" subtitle="Минимальный обязательный список" />
    {isLoading ? (
      <div className="animate-pulse rounded-2xl bg-slate-200 h-14" />
    ) : (
      <div className="space-y-2">
        {products
          .filter((p) => p.mml)
          .slice(0, 4)
          .map((p, idx) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">{p.image}</div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500">{p.brand}</div>
                </div>
              </div>
              {idx % 2 === 0 ? <Chip tone="success">Есть</Chip> : <Chip tone="danger">Нет</Chip>}
            </div>
          ))}
      </div>
    )}
  </Card>
)
