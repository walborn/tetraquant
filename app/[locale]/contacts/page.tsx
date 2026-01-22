import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SchemaScript } from '@/components/seo/schema-script'
import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/ui/typography/p'
import { TypographyTable } from '@/components/ui/typography/table'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import { createMetadata } from '@/lib/seo/metadata'
import { createBreadcrumbSchema, createContactPageSchema } from '@/lib/seo/schema'

import ContactsMap from './map'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return createMetadata({
    title: t('contacts'),
    description: 'how to connect with us',
    path: '/contacts',
    locale,
  })
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    shared: 'shared',
    page: 'pages.contacts',
    navigation: 'entities.navigation',
  })

  if (!t) return notFound()

  const contactPageSchema = createContactPageSchema(locale, t.navigation('contacts'))
  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: t.navigation('home'), path: '' },
    { name: t.navigation('contacts'), path: '/contacts' },
  ])

  return (
    <>
      <SchemaScript
        id="contact-page-schema"
        schema={contactPageSchema}
      />
      <SchemaScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema}
      />
      <AppHeader>{t.navigation('contacts')}</AppHeader>
      <div className="w-full h-87.5">
        <ContactsMap />
      </div>
      <TypographyTable
        keys={['title', 'value']}
        values={[
          {
            id: 'address',
            title: <span className="capitalize font-semibold">{t.shared('address')}</span>,
            value: t.page('address'),
          },
          {
            id: 'email',
            title: <span className="capitalize font-semibold">{t.shared('email')}</span>,
            value: (
              <a
                className="underline"
                href="mailto:tetraquant@mail.ru"
              >
                tetraquant@mail.ru
              </a>
            ),
          },
        ]}
      />
      <TypographyP>
        <a href="mailto:tetraquant@mail.ru">
          <Button className="cursor-pointer capitalize">{t.shared('send_email')}</Button>
        </a>
      </TypographyP>
    </>
  )
}
