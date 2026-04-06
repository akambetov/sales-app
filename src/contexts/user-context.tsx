import { createContext, useContext } from 'react'

export interface IUser {
  name: string
  lastName: string
}

const UserContext = createContext<IUser | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }

  return context
}

export const UserProvider = UserContext.Provider
