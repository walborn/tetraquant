import Image from 'next/image'

import { getTranslations, setRequestLocale } from 'next-intl/server'

const services = ['ParticleSynthesis', 'ProtocolDevelopment']

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('entities.services')

  return (
    <>
      <h1 className="text-3xl">{t('ParticleSynthesisAndProtocolDevelopment.title')}</h1>
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
          <h2 className="text-2xl">
            {t(`ParticleSynthesisAndProtocolDevelopment.${service}.title`)}
          </h2>
          <p>{t(`ParticleSynthesisAndProtocolDevelopment.${service}.description`)}</p>
        </section>
      ))}
    </>
  )
}
