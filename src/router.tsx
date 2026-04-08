import { createBrowserRouter } from 'react-router'

import { PATHS } from '@constants'
import {
  coveragePage,
  debtsPage,
  plansPage,
  productsPage,
  resultsPage,
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
        element: <productsPage.Component />
      },
      {
        path: PATHS.plans,
        element: <plansPage.Component />
      },
      {
        path: PATHS.results,
        element: <resultsPage.Component />
      }
    ]
  }
])
