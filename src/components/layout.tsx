import { Outlet } from 'react-router'

import { BottomNavigation } from './bottom-navigation'

export const Layout = () => (
  <div className="pb-28">
    <Outlet />
    <BottomNavigation />
  </div>
)
