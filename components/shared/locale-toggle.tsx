'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function LocaleToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleChange}
      className="cursor-pointer text-xl"
    >
      {locale === 'en' ? (
        <Image
          src="/assets/shared/ru.svg"
          alt="RU"
          width={20}
          height={20}
          priority
        />
      ) : (
        <Image
          src="/assets/shared/us.svg"
          alt="EN"
          width={20}
          height={20}
          priority
        />
      )}
    </Button>
  )
}
