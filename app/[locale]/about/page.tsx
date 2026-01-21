import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { TypographyH1 } from '@/components/ui/typography/h1'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return {
    title: t('about'),
  }
}

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await fetchTranslations({
    page: 'pages.about',
    navigation: 'entities.navigation',
  })

  if (!t) return notFound()

  return (
    <>
      <AppHeader>{t.navigation('about')}</AppHeader>
      <section>
        <TypographyH1>{t.page('title')}</TypographyH1>
        <p>{t.page('description')}</p>
      </section>
      <Image
        src="/assets/about/skoltech.jpg"
        alt="About page image"
        width={700}
        height={259}
        priority
        className="w-full rounded-md"
      />
    </>
  )
}
