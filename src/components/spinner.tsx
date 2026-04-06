import { SIZE, type TSize } from '@constants'
import { cn } from '@utils'

export const Spinner = ({
  size = 'md',
  fullscreen = false
}: {
  size?: TSize
  fullscreen?: boolean
}) => (
  <div className={cn('flex items-center justify-center', fullscreen && 'h-screen')}>
    <div className={cn(`${SIZE[size]} border-r-4 border-slate-900 rounded-full animate-spin`)} />
  </div>
)
