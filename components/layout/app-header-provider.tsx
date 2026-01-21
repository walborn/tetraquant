'use client'

import { createContext, useContext, useState } from 'react'

interface AppHeaderContext {
  value: string
  setValue: (value: string) => void
}

const AppHeaderContext = createContext<AppHeaderContext>({ value: '', setValue: () => {} })

export function AppHeaderProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<string>('')

  return (
    <AppHeaderContext.Provider value={{ value, setValue }}>{children}</AppHeaderContext.Provider>
  )
}

export function useAppHeader() {
  const context = useContext(AppHeaderContext)

  if (context === undefined) {
    throw new Error('useAppHeader must be used within a AppHeaderProvider')
  }

  return context
}
