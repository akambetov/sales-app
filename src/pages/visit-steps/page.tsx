import { AlertTriangle, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Card, Chip, Header, Modal } from '@components'
import { useAppNavigate } from '@hooks'
import { useStoreByIdQuery, useProductsQuery } from '@queries'
import { useVisitContext } from '@store'
import { cn, money, statusTone } from '@utils'

import { VISIT_STEP_DEFINITIONS } from './constants'

const VisitSteps = () => {
  const { visitState, initVisit } = useVisitContext()
  const { goBack } = useAppNavigate()
  const { data: store } = useStoreByIdQuery((storeById) => {
    if (storeById) {
      initVisit([storeById])
    }
  })
  const { data: products } = useProductsQuery()
  const [selectedStepId, setSelectedStepId] = useState<
    (typeof VISIT_STEP_DEFINITIONS)[number]['id'] | null
  >(null)

  if (!store || !products || !visitState) {
    return null
  }

  const currentVisit = visitState[store.id]
  const completedSteps = Object.values(currentVisit.stepStatuses).filter(
    (v) => v !== 'Не начат'
  ).length

  const currentOrderItems = Object.entries(currentVisit.cart)
    .filter(([, qty]) => qty > 0)
    .map(([productId, qty]) => ({
      product: products.find((p) => p.id === Number(productId))!,
      qty
    }))

  const orderAmount = currentOrderItems.reduce((sum, row) => sum + row.product.price * row.qty, 0)
  const orderSkuCount = currentOrderItems.length
  const selectedStep = VISIT_STEP_DEFINITIONS.find((step) => step.id === selectedStepId) ?? null

  const requiredNotDone = VISIT_STEP_DEFINITIONS.filter(
    (s) => s.required && currentVisit.stepStatuses[s.id] === 'Не начат'
  ).map((s) => s.title)

  return (
    <div className="pb-28">
      <Header title="Шаги визита" onBack={goBack} />
      <div className="space-y-4 px-4 py-4">
        <Card className="bg-slate-900 p-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-slate-300">{store.name}</div>
              <div className="mt-1 text-lg font-semibold">Визит в торговую точку</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-300">Прогресс</div>
              <div className="mt-1 text-base font-semibold">{completedSteps}/12</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <div className="rounded-2xl bg-white/10 p-2.5">
              <div className="text-[10px] text-slate-300">Шагов</div>
              <div className="mt-1 font-semibold">12</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-2.5">
              <div className="text-[10px] text-slate-300">Сумма</div>
              <div className="mt-1 font-semibold">{money(orderAmount)}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-2.5">
              <div className="text-[10px] text-slate-300">SKU</div>
              <div className="mt-1 font-semibold">{orderSkuCount}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-2.5">
              <div className="text-[10px] text-slate-300">Отклонения</div>
              <div className="mt-1 font-semibold">{currentVisit.gpsAcceptedOutside ? 1 : 0}</div>
            </div>
          </div>
        </Card>

        {requiredNotDone.length > 0 ? (
          <Card className="border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 text-amber-600" size={18} />
              <div>
                <div className="text-sm font-semibold text-amber-900">Есть обязательные шаги</div>
                <div className="mt-1 text-xs text-amber-800">
                  Для завершения визита необходимо выполнить: {requiredNotDone.join(', ')}.
                </div>
              </div>
            </div>
          </Card>
        ) : null}

        <div className="space-y-3">
          {VISIT_STEP_DEFINITIONS.map((step, index) => {
            const Icon = step.icon
            const status = currentVisit.stepStatuses[step.id]
            return (
              <Card
                key={step.id}
                className="cursor-pointer p-4 transition hover:shadow-md"
                onClick={() => {
                  setSelectedStepId(step.id)
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {index + 1}. {step.title}
                      </div>
                      {step.required ? (
                        <Chip tone="danger">обязательно</Chip>
                      ) : (
                        <Chip>рекомендуется</Chip>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{step.description}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium',
                        statusTone(status)
                      )}
                    >
                      {status}
                    </span>
                    <ChevronRight className="ml-auto mt-3 text-slate-400" size={18} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
      <Modal
        open={Boolean(selectedStep)}
        title={selectedStep?.title ?? ''}
        description={selectedStep?.description}
        onClose={() => {
          setSelectedStepId(null)
        }}
      >
        {selectedStep ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                <selectedStep.icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-900">{selectedStep.title}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {selectedStep.required ? 'Обязательный шаг визита' : 'Рекомендуемый шаг визита'}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-2.5">
              <span className="text-sm text-slate-500">Текущий статус</span>
              <span
                className={cn(
                  'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium',
                  statusTone(currentVisit.stepStatuses[selectedStep.id])
                )}
              >
                {currentVisit.stepStatuses[selectedStep.id]}
              </span>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 p-3 text-sm text-slate-600">
              Детальная форма для шага `{selectedStep.title}` в разработке.
            </div>
            <button
              type="button"
              className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => {
                setSelectedStepId(null)
              }}
            >
              Закрыть
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

export default VisitSteps
