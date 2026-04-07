import { Card } from '@components'
import { cn } from '@utils'

type TTone = 'slate' | 'green' | 'blue' | 'amber' | 'red'

const toneClass = {
  slate: 'from-slate-50 to-white',
  green: 'from-emerald-50 to-white',
  blue: 'from-blue-50 to-white',
  amber: 'from-amber-50 to-white',
  red: 'from-red-50 to-white'
}

export const MetricCard = ({
  label,
  value,
  tone = 'slate'
}: {
  label: string
  value: string
  tone?: TTone
}) => (
  <Card className={cn('bg-linear-to-br p-3', toneClass[tone])}>
    <div className="text-[11px] text-slate-500">{label}</div>
    <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
  </Card>
)
