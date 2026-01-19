import Image from 'next/image'

import { getTranslations, setRequestLocale } from 'next-intl/server'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
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
