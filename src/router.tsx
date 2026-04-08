import { createBrowserRouter } from 'react-router'

import { Header } from '@components'
import { PATHS } from '@constants'
import {
  coveragePage,
  debtsPage,
  rootPage,
  salesPersonRoutePage,
  storeDetailsPage,
  visitStepsPage
} from '@pages'

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <rootPage.Component />,
    errorElement: <>OOOps</>,
    children: [
      {
        index: true,
        element: <salesPersonRoutePage.Component />
      },
      {
        path: PATHS.storeDetails,
        element: <storeDetailsPage.Component />
      },
      {
        path: PATHS.visitSteps,
        element: <visitStepsPage.Component />
      },
      {
        path: PATHS.debts,
        element: <debtsPage.Component />
      },
      {
        path: PATHS.coverage,
        element: <coveragePage.Component />
      },
      {
        path: PATHS.products,
        element: <Header title="products" />
      },
      {
        path: PATHS.plans,
        element: <Header title="plans" />
      },
      {
        path: PATHS.results,
        element: <Header title="results" />
      }
    ]
  }
])
