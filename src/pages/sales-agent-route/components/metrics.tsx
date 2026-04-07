import { MetricCard, SkeletonMetricCard } from './metric-card'

export const Metrics = ({
  metrics,
  isLoading
}: {
  isLoading: boolean
  metrics: {
    total: number
    done: number
    inProgress: number
    left: number
  }
}) => (
  <div className="grid grid-cols-2 gap-3">
    {isLoading ? (
      <>
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
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
