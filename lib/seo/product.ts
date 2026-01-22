import React from 'react'

import type { Metadata } from 'next'
import { headers } from 'next/headers'

import type { Product } from '@/lib/definitions'

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

// Extract price as string for JSON-LD
const getPriceString = (priceNode: React.ReactNode): string => {
  if (typeof priceNode === 'string') {
    const match = priceNode.match(/\d+/)
    return match ? match[0] : '0'
  }
  return '0'
}

export const constructProductMetadata = async ({
  product,
  locale,
}: {
  product: Product
  locale: string
}): Promise<Metadata> => {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  const url = `${protocol}://${host}`

  const description = getPlainTextDescription(product.description)
  const imageUrl = `${url}${product.image}`
  const pageUrl = `${url}/${locale}/products/${product.key}`

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
        en: `${url}/en/products/${product.key}`,
        ru: `${url}/ru/products/${product.key}`,
      },
    },
  }
}

export const constructProductJsonLd = async ({
  product,
  locale,
}: {
  product: Product
  locale: string
}) => {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  const url = `${protocol}://${host}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: `${url}${product.image}`,
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
      url: `${url}/${locale}/products/${product.key}`,
    },
  }
}
