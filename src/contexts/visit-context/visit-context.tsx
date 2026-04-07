import { createContext, useContext } from 'react'

import type { TVisitStore } from '@store'

const visitContext = createContext<TVisitStore | undefined>(undefined)

export const VisitProvider = visitContext.Provider

export const useVisit = () => {
  const context = useContext(visitContext)

  if (!context) {
    throw new Error('useVisit must be used within a VisitProvider')
  }

  return context
}
