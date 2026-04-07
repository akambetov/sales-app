import { createBrowserRouter } from 'react-router'

import { rootPage, salesPersonRoutePage, storeDetailsPage } from '@pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <rootPage.Component />,
    errorElement: <>OOOps</>,
    children: [
      {
        index: true,
        element: <salesPersonRoutePage.Component />
      },
      {
        path: '/store/:storeId',
        element: <storeDetailsPage.Component />
      }
    ]
  }
])
