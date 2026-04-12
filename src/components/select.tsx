import { ChevronDown } from 'lucide-react'

import { cn } from '@utils'

import type { SelectHTMLAttributes } from 'react'

interface ISelectOption {
  label: string
  value: string
}

export const Select = ({
  label,
  hint,
  options,
  className,
  containerClassName,
  ...props
}: {
  label?: string
  hint?: string
  options: ISelectOption[]
  className?: string
  containerClassName?: string
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>) => (
  <div className={cn('space-y-2', containerClassName)}>
    {label ? <label className="block text-xs font-medium text-slate-500">{label}</label> : null}
    <div className="relative">
      <select
        className={cn(
          'w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-200/70 disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
      />
    </div>
    {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
  </div>
)
