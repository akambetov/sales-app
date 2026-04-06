import { SIZE, type TSize } from '@constants'

import type { IUser } from '@contexts'

interface IAvatar extends IUser {
  src?: string
  alt?: string
  size?: TSize
}

export const Avatar = ({ name, lastName, src, alt = 'Avatar', size = 'md' }: IAvatar) =>
  src ? (
    <img className={`rounded-full ${SIZE[size]}`} src={src} alt={alt} />
  ) : (
    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
      {name.charAt(0) || 'Х'}
      {lastName.charAt(0) || 'Х'}
    </div>
  )
