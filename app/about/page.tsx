import Image from 'next/image'

import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('pages.about')
  return (
    <>
      <h1 className="text-3xl">{t('title')}</h1>
      <p>{t('description')}</p>
      <Image
        src="/assets/skoltech.jpg"
        alt="About page image"
        width={700}
        height={259}
        priority
        className="w-full"
      />
    </>
  )
}
