import { createBrowserRouter } from 'react-router'

import { rootPage, salesPersonRoutePage, storeDetailsPage, visitStepsPage } from '@pages'

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
      },
      {
        path: '/store/:storeId/visit-steps',
        element: <visitStepsPage.Component />
      }
    ]
  }
])
