import { cn } from '@utils'

export const Card = ({
  className = '',
  children
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div className={cn('rounded-3xl border border-slate-200 bg-white shadow-sm', className)}>
    {children}
  </div>
)
