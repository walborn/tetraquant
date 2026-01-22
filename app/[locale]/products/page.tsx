import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SchemaScript } from '@/components/seo/schema-script'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'
import type { Product } from '@/lib/definitions'
import { absoluteUrl } from '@/lib/seo/config'
import { createMetadata } from '@/lib/seo/metadata'
import { createBreadcrumbSchema } from '@/lib/seo/schema'

import { ProductsAccordion } from './accordion'
import { getPoducts } from './get-products'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return createMetadata({
    title: t('products'),
    description: `TetraQuant → ${t('products')}`,
    path: '/products',
    locale,
  })
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.title,
      url: absoluteUrl(`/${locale}/products/${product.key}`),
    })),
  }

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: t.navigation('home'), path: '' },
    { name: t.navigation('products'), path: '/products' },
  ])

  return (
    <>
      <SchemaScript
        id="item-list-schema"
        schema={itemListSchema}
      />
      <SchemaScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema}
      />
      <AppHeader>{t.navigation('products')}</AppHeader>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map(product => (
          <Card
            className="p-4"
            key={product.key}
          >
            <CardContent className="flex flex-col gap-4">
              <Link
                href={`/${locale}/products/${product.key}`}
                className="flex flex-col gap-4"
              >
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
                {Boolean(product.description) && <Separator />}
              </Link>

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
        ))}
      </section>
    </>
  )
}
