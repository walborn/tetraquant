import { getTranslations } from 'next-intl/server'

import ContactFrom from '@/components/shared/contact-form'

import Map from './map'

export default async function Page() {
  const tShared = await getTranslations('shared')
  const t = await getTranslations('pages.contacts')
  return (
    <>
      <h1 className="text-3xl">{t('title')}</h1>
      <Map />
      <p>
        <span className="capitalize">{tShared('address')}</span>: {t('address')}
      </p>
      <p>
        <span className="capitalize">{tShared('email')}</span>: tetraquant@mail.ru
      </p>

      <ContactFrom />
    </>
  )
}
