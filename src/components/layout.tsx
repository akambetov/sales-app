import { Outlet } from 'react-router'

import { useIsLoading } from '@hooks'

import { BottomNavigation } from './bottom-navigation'
import { Spinner } from './spinner'

export const Layout = () => {
  const isLoading = useIsLoading()

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {isLoading ? <Spinner fullscreen /> : null}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  )
}
