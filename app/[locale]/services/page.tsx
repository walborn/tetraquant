import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SchemaScript } from '@/components/seo/schema-script'
import { TypographyH1 } from '@/components/ui/typography/h1'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { TypographyP } from '@/components/ui/typography/p'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import { absoluteUrl } from '@/lib/seo/config'
import { createMetadata } from '@/lib/seo/metadata'
import { createBreadcrumbSchema, createServiceSchema } from '@/lib/seo/schema'

const services = ['ParticleSynthesis', 'ProtocolDevelopment']

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return createMetadata({
    title: t('services'),
    description: 'i do not know what should be here',
    path: '/services',
    locale,
    images: [
      {
        url: absoluteUrl('/assets/services/service_scaled.jpg'),
        width: 700,
        height: 259,
        alt: 'TetraQuant Services',
      },
    ],
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    services: 'entities.services',
    navigation: 'entities.navigation',
  })

  if (!t) return notFound()

  const serviceSchemas = services.map(service =>
    createServiceSchema(locale, {
      title: t.services(`PSnPD.${service}.title`),
      shortDescription: t.services(`PSnPD.${service}.description`),
      image: '/assets/services/service_scaled.jpg',
      slug: service,
    })
  )

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: t.navigation('home'), path: '' },
    { name: t.navigation('services'), path: '/services' },
  ])

  return (
    <>
      {serviceSchemas.map((schema, index) => (
        <SchemaScript
          key={`service-schema-${services[index]}`}
          id={`service-schema-${services[index]}`}
          schema={schema}
        />
      ))}
      <SchemaScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema}
      />
      <AppHeader>{t.navigation('services')}</AppHeader>
      <TypographyH1>{t.services('PSnPD.title')}</TypographyH1>
      <Image
        src="/assets/services/service_scaled.jpg"
        alt="Products page image"
        width={700}
        height={259}
        priority
        className="w-full rounded-md"
      />
      {services.map(service => (
        <section key={service}>
          <TypographyH2>{t.services(`PSnPD.${service}.title`)}</TypographyH2>
          <TypographyP>{t.services(`PSnPD.${service}.description`)}</TypographyP>
        </section>
      ))}
    </>
  )
}
