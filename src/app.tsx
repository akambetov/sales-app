import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'

import { useVisitStore, VisitProvider } from '@store'

import { router } from './router'

import './app.css'

const App = () => {
  const queryClient = new QueryClient()
  const visitStoreInstance = useVisitStore()

  return (
    <QueryClientProvider client={queryClient}>
      <VisitProvider value={visitStoreInstance}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </VisitProvider>
    </QueryClientProvider>
  )
}

export default App
