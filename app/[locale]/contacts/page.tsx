import { notFound } from 'next/navigation'

import { setRequestLocale } from 'next-intl/server'

import ContactFrom from '@/components/shared/contact-form'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'

import Map from './map'

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
      <p>
        <span className="capitalize">{t.shared('address')}</span>: {t.page('address')}
      </p>
      <p>
        <span className="capitalize">{t.shared('email')}</span>: tetraquant@mail.ru
      </p>

      <ContactFrom />
    </>
  )
}
