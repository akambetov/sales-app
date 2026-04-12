import { X } from 'lucide-react'

import { cn } from '@utils'

import type { ReactNode } from 'react'

export const Modal = ({
  open,
  title,
  description,
  children,
  onClose
}: {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  onClose: () => void
}) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-4 sm:items-center">
      <button
        type="button"
        aria-label="Закрыть модальное окно"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">{title}</div>
            {description ? <div className="mt-1 text-sm text-slate-500">{description}</div> : null}
          </div>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  )
}
