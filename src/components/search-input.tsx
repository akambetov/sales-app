import { Search, X } from 'lucide-react'

import { Card } from './card'

import type { ChangeEvent } from 'react'

export const SearchInput = ({
  search,
  handleSearch,
  handleClear
}: {
  search: string
  handleSearch: (value: string) => void
  handleClear: () => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length && value.at(0) === ' ') {
      return
    }

    handleSearch(value)
  }

  return (
    <Card className="p-3">
      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5">
        <Search size={16} className="text-slate-400" />
        <input
          value={search}
          onChange={handleChange}
          placeholder="Поиск по названию ТТ, договору, адресу"
          aria-label="Поиск по торговой точке"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        <X size={16} className="text-slate-400 cursor-pointer" onClick={handleClear} />
      </div>
    </Card>
  )
}
