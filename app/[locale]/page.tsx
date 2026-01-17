import { setRequestLocale } from 'next-intl/server'

import { HomeCarousel } from '@/components/shared/home-carousel'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="p-10">
      <HomeCarousel />
    </div>
  )
}
