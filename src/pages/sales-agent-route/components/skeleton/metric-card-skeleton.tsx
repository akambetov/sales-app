import { cn } from '@utils'

export const MetricCardSkeleton = () => (
  <div className={cn('animate-pulse bg-linear-to-br rounded')}>
    <div className="h-3 bg-slate-200 rounded w-1/2 mb-2" />
    <div className="h-5 bg-slate-200 rounded w-1/3" />
  </div>
)
