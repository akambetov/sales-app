import { cn } from '@utils'

export const Card = ({
  className = '',
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('rounded-3xl border border-slate-200 bg-white shadow-sm', className)}
    {...props}
  >
    {children}
  </div>
)
