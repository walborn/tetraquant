import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SchemaScript } from '@/components/seo/schema-script'
import { HomeCarousel } from '@/components/shared/home-carousel'
import { AppHeader } from '@/components/utils/app-header'
import { createMetadata } from '@/lib/seo/metadata'
import { createBreadcrumbSchema } from '@/lib/seo/schema'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return createMetadata({
    title: t('home'),
    description: 'home page - TetraQuant products and services',
    path: '',
    locale,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('entities.navigation')

  const breadcrumbSchema = createBreadcrumbSchema(locale, [{ name: t('home'), path: '' }])

  return (
    <>
      <SchemaScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema}
      />
      <AppHeader>{t('home')}</AppHeader>
      <HomeCarousel />
    </>
  )
}
