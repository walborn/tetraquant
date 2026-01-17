import Image from 'next/image'

import { getTranslations, setRequestLocale } from 'next-intl/server'

interface GetProductsProps {
  products: (value: string) => string
  common: (value: string) => string
}
const getPoducts = ({ products, common }: GetProductsProps) => [
  {
    key: 'Reactor_CR-1B',
    title: products('Reactor_CR-1B.title'),
    description: products('Reactor_CR-1B.description'),
    image: '/assets/products/Reactor_CR-1B.jpg',
    price: common('on_request'),
  },
  {
    key: 'Rotator_R1',
    title: products('Rotator_R1.title'),
    description: products('Rotator_R1.description'),
    image: '/assets/products/Rotator_R1.jpg',
    price: `20000 ${common('currency.rub')}`,
  },
]

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [tProducts, tCommon] = await Promise.all([
    getTranslations('entities.products'),
    getTranslations('shared'),
  ])

  const products = getPoducts({ products: tProducts, common: tCommon })

  return products.map(product => (
    <section key={product.key}>
      <h2 className="text-2xl">{product.title}</h2>
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
  ))
}
