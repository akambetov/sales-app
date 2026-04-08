import { useState } from 'react'

import { Card, Chip, Header, SearchInput } from '@components'
import { useProductsQuery } from '@queries'
import { money } from '@utils'

import type { IProduct } from '@types'

const getMatchedSearch = ({ products, search }: { products: IProduct[]; search: string }) => {
  const query = search.trim().toLowerCase()

  return products.filter((product) =>
    [product.name, product.category, product.brand, product.manufacturer]
      .join(' ')
      .toLowerCase()
      .includes(query)
  )
}

export const ProductsPage = () => {
  const [search, setSearch] = useState('')
  const { data: products } = useProductsQuery()

  if (!products) {
    return null
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  return (
    <div className="pb-28">
      <Header title="Товары" />
      <div className="space-y-4 px-4 py-4">
        <SearchInput search={search} handleSearch={handleSearch} handleClear={handleClearSearch} />
        {getMatchedSearch({ products, search }).map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-2xl">
                {p.image}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                  {p.mml ? <Chip tone="danger">MML</Chip> : null}
                  {p.promo ? <Chip tone="success">Акция</Chip> : null}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {p.brand} • {p.category} • {p.manufacturer}
                </div>
                <div className="mt-1 text-xs text-slate-500">{p.barcode}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-900">{money(p.price)}</span>
                  <span className="text-slate-500">
                    Остаток: {p.stock} {p.unit}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
