import { ArrowLeft } from 'lucide-react'

export const Header = ({
  title,
  left,
  right,
  onBack
}: {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
  onBack?: () => void
}) => (
  <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {onBack ? (
          <button
            className="rounded-2xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
          </button>
        ) : null}
        {left}
        <div className="min-w-0">
          <div className="truncate text-[17px] font-semibold text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{new Date().toLocaleDateString()} • Шымкент</div>
        </div>
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  </div>
)
