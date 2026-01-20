import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/ui/typography/p'
import { TypographyTable } from '@/components/ui/typography/table'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'

import Map from './map'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return {
    title: t('contacts'),
  }
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

  return (
    <>
      <AppHeader>{t.navigation('contacts')}</AppHeader>
      <div className="w-full h-87.5">
        <Map />
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
          <Button className="cursor-pointer">{t.shared('send_email')}</Button>
        </a>
      </TypographyP>
    </>
  )
}
