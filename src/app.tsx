import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'

import { useVisitStore } from '@store'

import { VisitProvider } from './contexts'
import { router } from './router'

import './app.css'

const App = () => {
  const queryClient = new QueryClient()
  const visitStore = useVisitStore()

  return (
    <QueryClientProvider client={queryClient}>
      <VisitProvider value={visitStore}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </VisitProvider>
    </QueryClientProvider>
  )
}

export default App
