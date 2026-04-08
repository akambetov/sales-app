import { Outlet } from 'react-router'

import { BottomNavigation } from './bottom-navigation'

export const Layout = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    <div className="flex-1 overflow-auto">
      <Outlet />
    </div>
    <BottomNavigation />
  </div>
)
