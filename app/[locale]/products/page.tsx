import Image from 'next/image'
import { notFound } from 'next/navigation'

import { setRequestLocale } from 'next-intl/server'

import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import { TypographyH2 } from '@/components/ui/typography/h2'

interface GetProductsProps {
  products: (value: string) => string
  shared: (value: string) => string
}
const getPoducts = ({ products, shared }: GetProductsProps) => [
  {
    key: 'Reactor_CR-1B',
    title: products('Reactor_CR-1B.title'),
    description: products('Reactor_CR-1B.description'),
    image: '/assets/products/Reactor_CR-1B.jpg',
    price: shared('on_request'),
  },
  {
    key: 'Rotator_R1',
    title: products('Rotator_R1.title'),
    description: products('Rotator_R1.description'),
    image: '/assets/products/Rotator_R1.jpg',
    price: `20000 ${shared('currency.rub')}`,
  },
]

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    products: 'entities.products',
    shared: 'shared',
    navigation: 'entities.navigation',
  })

  if (!t) return notFound()

  const products = getPoducts({
    products: t.products,
    shared: t.shared,
  })

  return (
    <>
      <AppHeader>{t.navigation('products')}</AppHeader>
      {products.map(product => (
        <section key={product.key}>
          <TypographyH2>{product.title}</TypographyH2>
          <p>{product.description}</p>
          <Image
            src={product.image}
            alt={product.title}
            width={700}
            height={259}
            priority
          />
          <p>{product.price}</p>
        </section>
      ))}
    </>
  )
}
