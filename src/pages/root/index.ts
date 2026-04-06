import { lazy } from 'react'

export const rootPage = {
  Component: lazy(() => import('./root'))
}
