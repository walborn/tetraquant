import React from 'react'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import { setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import { routing } from '@/i18n/routing'
import type { Product } from '@/lib/definitions'

import { ProductsAccordion } from '../accordion'
import { getPoducts } from '../get-products'

const productIds = ['Reactor_CR_1B', 'Rotator_R1', 'CaCO3', 'IronOxide', 'NPsilica']

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = []

  for (const locale of routing.locales) {
    for (const id of productIds) {
      params.push({ locale, id })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const t = await fetchTranslations({
    products: 'entities.products',
    shared: 'shared',
  })

  if (!t) return {}

  const products = getPoducts({
    products: t.products,
    shared: t.shared,
  })

  const product = products.find(p => p.key === id)

  if (!product) return {}

  // Extract plain text description from ReactNode
  const getPlainTextDescription = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode }
      if (props.children) {
        return getPlainTextDescription(props.children)
      }
    }
    return ''
  }

  const description = getPlainTextDescription(product.description)
  const imageUrl = `https://yogaclubom.ru${product.image}`
  const pageUrl = `https://yogaclubom.ru/${locale}/products/${id}`

  return {
    title: `${product.title} | TetraQuant`,
    description: description.slice(0, 160),
    keywords: [product.title, 'TetraQuant', 'laboratory equipment', 'scientific instruments'],
    openGraph: {
      title: product.title,
      description: description.slice(0, 160),
      url: pageUrl,
      siteName: 'TetraQuant',
      images: [
        {
          url: imageUrl,
          width: 700,
          height: 259,
          alt: product.title,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: description.slice(0, 160),
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `https://yogaclubom.ru/en/products/${id}`,
        ru: `https://yogaclubom.ru/ru/products/${id}`,
      },
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    products: 'entities.products',
    shared: 'shared',
    navigation: 'entities.navigation',
    email: 'entities.email',
  })

  if (!t) return notFound()

  const products = getPoducts({
    products: t.products,
    shared: t.shared,
  })

  const product = products.find(p => p.key === id)

  if (!product) return notFound()

  const getSubject = (product: Product) => `${t.email('order')}: ${product.title}`

  const getBody = (product: Product) =>
    `→ ${getSubject(product)}
────────────────────

• ${t.email('name')}: 
• ${t.email('phone')}: 
• ${t.email('quantity')}: 
• ${t.email('company')}: 
• ${t.email('address')}: 
────────────────────

${t.email('message')}: 
`.replace(/\n/g, '%0D%0A')
  // Extract price as string for JSON-LD
  const getPriceString = (priceNode: React.ReactNode): string => {
    if (typeof priceNode === 'string') {
      const match = priceNode.match(/\d+/)
      return match ? match[0] : '0'
    }
    return '0'
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: `https://yogaclubom.ru${product.image}`,
    description: typeof product.description === 'string' ? product.description : product.title,
    brand: {
      '@type': 'Brand',
      name: 'TetraQuant',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: getPriceString(product.price),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'TetraQuant',
      },
      url: `https://yogaclubom.ru/${locale}/products/${id}`,
    },
  }

  return (
    <>
      <Script
        id={`product-schema-${id}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(productSchema)}
      </Script>
      <AppHeader>{t.navigation('products')}</AppHeader>

      <section className="container mx-auto max-w-4xl">
        <Card className="p-4">
          <CardContent className="flex flex-col gap-4">
            <TypographyH2>{product.title}</TypographyH2>
            <Image
              src={product.image}
              alt={product.title}
              width={700}
              height={259}
              className="w-full h-auto rounded-md"
              priority
            />
            {product.description}
            {Array.isArray(product.params) && (
              <ProductsAccordion
                values={product.params}
                defaultValue="characteristics"
              />
            )}
            <div>
              <b>{t.shared('price')}</b>: {product.price}
            </div>

            <a
              href={`mailto:tetraquant@mail.ru?subject=${encodeURIComponent(getSubject(product))}&body=${getBody(product)}`}
            >
              <Button
                variant="default"
                className="w-full cursor-pointer capitalize"
              >
                {t.shared('order')}
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
