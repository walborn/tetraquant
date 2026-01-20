import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { TypographyH1 } from '@/components/ui/typography/h1'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { TypographyP } from '@/components/ui/typography/p'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'

const services = ['ParticleSynthesis', 'ProtocolDevelopment']

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return {
    title: t('services'),
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    services: 'entities.services',
    navigation: 'entities.navigation',
  })

  if (!t) return notFound()

  return (
    <>
      <AppHeader>{t.navigation('services')}</AppHeader>
      <TypographyH1>{t.services('ParticleSynthesisAndProtocolDevelopment.title')}</TypographyH1>
      <Image
        src="/assets/services/service_scaled.jpg"
        alt="Products page image"
        width={700}
        height={259}
        priority
        className="w-full"
      />
      {services.map(service => (
        <section key={service}>
          <TypographyH2>
            {t.services(`ParticleSynthesisAndProtocolDevelopment.${service}.title`)}
          </TypographyH2>
          <TypographyP>
            {t.services(`ParticleSynthesisAndProtocolDevelopment.${service}.description`)}
          </TypographyP>
        </section>
      ))}
    </>
  )
}
