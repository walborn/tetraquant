import { getTranslations, setRequestLocale } from 'next-intl/server'

import { HomeCarousel } from '@/components/shared/home-carousel'
import { AppHeader } from '@/components/utils/app-header'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return {
    title: `TetraQuant | ${t('home')}`,
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('entities.navigation')

  return (
    <>
      <AppHeader>{t('home')}</AppHeader>
      <HomeCarousel />
    </>
  )
}
