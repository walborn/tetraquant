import { getTranslations, setRequestLocale } from 'next-intl/server'

import { HomeCarousel } from '@/components/shared/home-carousel'
import { AppHeader } from '@/components/utils/app-header'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pages.home')

  return (
    <>
      <AppHeader>{t('title')}</AppHeader>
      <HomeCarousel />
    </>
  )
}
