import React from 'react'

import type { Metadata } from 'next'

import type { Product } from '@/lib/definitions'
import { removeHtmlTags } from '@/lib/utils'

import { absoluteUrl } from './config'

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

export const constructProductMetadata = ({
  product,
  locale,
}: {
  product: Product
  locale: string
}): Metadata => {
  // Use plain text description, fallback to removeHtmlTags if needed, or simple slice
  // Actually getPlainTextDescription handles ReactNode, removeHtmlTags handles string with HTML.
  // Let's assume description might be complex, so let's stick to getPlainTextDescription if it's a node tree,
  // but if it's just a string it returns it. If that string has HTML tags, we should strip them?
  // Current getPlainTextDescription just returns the string.
  // Let's wrap it.
  const rawDescription = getPlainTextDescription(product.description)
  const description = removeHtmlTags(rawDescription).slice(0, 160)

  const imageUrl = absoluteUrl(product.image)
  const pageUrl = absoluteUrl(`/${locale}/products/${product.key}`)

  return {
    title: `${product.title} | TetraQuant`,
    description,
    keywords: [product.title, 'TetraQuant', 'laboratory equipment', 'scientific instruments'],
    openGraph: {
      title: `${product.title} | TetraQuant`,
      description,
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
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl(`/en/products/${product.key}`),
        ru: absoluteUrl(`/ru/products/${product.key}`),
      },
    },
  }
}

export const constructProductJsonLd = ({
  product,
  locale,
}: {
  product: Product
  locale: string
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: absoluteUrl(product.image),
    description:
      typeof product.description === 'string' ? removeHtmlTags(product.description) : product.title,
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
      url: absoluteUrl(`/${locale}/products/${product.key}`),
    },
  }
}
