import { BarChart3, Building2, MapPinned, Package, Target, Wallet } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

import { PATHS } from '@constants'
import { cn } from '@utils'

const navItems = [
  { id: 'route', label: 'Маршрут', icon: MapPinned, path: PATHS.root },
  { id: 'debts', label: 'Долги', icon: Wallet, path: PATHS.debts },
  { id: 'coverage', label: 'Покрытие', icon: Building2, path: PATHS.coverage },
  { id: 'products', label: 'Товары', icon: Package, path: PATHS.products },
  { id: 'plans', label: 'Планы', icon: Target, path: PATHS.plans },
  { id: 'results', label: 'Результат', icon: BarChart3, path: PATHS.results }
] as const

export const BottomNavigation = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-6 rounded-[28px] border border-slate-200 bg-white p-2 shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.path
        return (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.path)
            }}
            className={cn(
              'flex flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-medium cursor-pointer',
              isActive ? 'bg-slate-900 text-white' : 'text-slate-500'
            )}
          >
            <Icon size={17} />
            <span className="mt-1 leading-none">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
