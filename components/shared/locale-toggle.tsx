'use client'

import { useTransition } from 'react'

import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import { setLocaleCookie } from '@/lib/actions'

export function LocaleToggle() {
  const locale = useLocale()
  const [, startTransition] = useTransition()

  const handleChange = () => {
    startTransition(async () => {
      await setLocaleCookie(locale === 'en' ? 'ru' : 'en')
    })
  }
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleChange}
    >
      {locale === 'en' ? '🇺🇸' : '🇷🇺'}
    </Button>
  )
}
