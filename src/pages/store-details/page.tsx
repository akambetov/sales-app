import { useNavigate } from 'react-router'

import { ButtonSave, Header } from '@components'
import { useStoreByIdQuery, useProductsQuery } from '@queries'
import { useVisitContext } from '@store'
import { cn, statusTone } from '@utils'

import {
  StoreHistoryOrderCard,
  StoreContacts,
  StoreMetrics,
  StoreFastActions,
  StoreProductsList
} from './components'
import { useStoreOrderHistoryQuery } from './query'

const StoreDetailsPage = () => {
  const navigate = useNavigate()
  const { data: store } = useStoreByIdQuery()
  const { data: storeHistory = [], isLoading: isHistoryLoading } = useStoreOrderHistoryQuery()
  const { data: products = [], isLoading: isProductsLoading } = useProductsQuery()
  const { visitState, startVisit } = useVisitContext()

  const handleBack = () => {
    navigate('/')
  }

  const handleVisit = (storeId: number) => {
    startVisit(storeId)
    navigate(`/store/${storeId}/visit-steps`)
  }

  if (!store) {
    return null
  }

  return (
    <div className="pb-32">
      <Header
        title={store.name}
        onBack={handleBack}
        right={
          <span
            className={cn(
              'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium',
              statusTone(store.status)
            )}
          >
            {store.status}
          </span>
        }
      />
      <div className="space-y-4 px-4 py-4">
        <StoreContacts store={store} />
        <StoreMetrics store={store} />
        <StoreFastActions store={store} />
        <StoreHistoryOrderCard orders={storeHistory} isLoading={isHistoryLoading} />
        <StoreProductsList products={products} isLoading={isProductsLoading} />
      </div>
      <ButtonSave
        label={visitState?.[store.id]?.started ? 'Продолжить визит' : 'Начать визит'}
        onClick={() => {
          handleVisit(store.id)
        }}
      />
    </div>
  )
}

export default StoreDetailsPage
