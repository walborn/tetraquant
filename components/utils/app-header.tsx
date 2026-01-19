'use client'

import * as React from 'react'

import { useAppHeader } from '@/components/providers/app-header-provider'

interface Props {
  children: string
}

export function AppHeader({ children }: Props) {
  const { setValue } = useAppHeader()

  React.useEffect(() => {
    setValue(children)
  }, [children, setValue])

  return null
}
