import { createBrowserRouter } from 'react-router'

import { Header } from '@components'
import { PATHS } from '@constants'
import { rootPage, salesPersonRoutePage, storeDetailsPage, visitStepsPage } from '@pages'

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
        element: (
          <div className="pb-28">
            <Header title="debts" />
          </div>
        )
      },
      {
        path: PATHS.coverage,
        element: <Header title="coverage" />
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
