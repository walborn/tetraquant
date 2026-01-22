import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import { setRequestLocale } from 'next-intl/server'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import { routing } from '@/i18n/routing'
import type { Product } from '@/lib/definitions'
import { constructProductJsonLd, constructProductMetadata } from '@/lib/seo/product'

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

  return constructProductMetadata({ product, locale })
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

  const productSchema = await constructProductJsonLd({ product, locale })

  return (
    <>
      <Script
        id={`product-schema-${id}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(productSchema)}
      </Script>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}/products`}>
                {t.navigation('products')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>

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
