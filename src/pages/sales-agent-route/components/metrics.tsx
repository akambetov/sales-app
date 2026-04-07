import { MetricCard, MetricCardSkeleton } from './metric-card'

export const Metrics = ({
  metrics,
  isLoading
}: {
  metrics: {
    total: number
    done: number
    inProgress: number
    left: number
  }
  isLoading: boolean
}) => (
  <div className="grid grid-cols-2 gap-3">
    {isLoading ? (
      <>
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </>
    ) : (
      <>
        <MetricCard label="Всего визитов" value={`${metrics.total}`} />
        <MetricCard label="Завершено" value={`${metrics.done}`} tone="green" />
        <MetricCard label="В процессе" value={`${metrics.inProgress}`} tone="blue" />
        <MetricCard label="Осталось" value={`${metrics.left}`} tone="amber" />
      </>
    )}
  </div>
)
