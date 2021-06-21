import { createContext } from 'react'

export const AuthContext = createContext({
  login: async (loginId: string, password: string): Promise<void> => {},
  logout: async (): Promise<void> => {},
})
