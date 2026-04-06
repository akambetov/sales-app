import { createBrowserRouter } from 'react-router'

import { rootPage, salesPersonRoutePage } from '@pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <rootPage.Component />,
    errorElement: <>OOOps</>,
    children: [
      {
        index: true,
        element: <salesPersonRoutePage.Component />
      }
    ]
  }
])
