import { cn } from '@utils'

export const ButtonSave = ({
  label = 'Сохранить',
  onClick,
  disabled = false
}: {
  label?: string
  onClick: () => void
  disabled?: boolean
}) => (
  <div className="fixed bottom-20 left-1/2 z-20 w-full max-w-107.5 -translate-x-1/2 px-4">
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full rounded-3xl px-4 py-4 text-sm font-semibold text-white shadow-xl cursor-pointer',
        disabled ? 'bg-slate-300' : 'bg-slate-900'
      )}
    >
      {label}
    </button>
  </div>
)
