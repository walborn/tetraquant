import type { Metadata } from 'next'

import { absoluteUrl } from './config'

type Image = {
  url: string
  width: number
  height: number
  alt: string
}
interface Props {
  title: string
  description: string
  path: string // The path segment (e.g., '/about'), without locale prefix
  locale: string
  images?: Image[]
}

export const createMetadata = ({
  title,
  description,
  path,
  locale,
  images = [
    {
      url: absoluteUrl('/tetraquant.png'),
      width: 1200,
      height: 630,
      alt: 'TetraQuant',
    },
  ],
}: Props): Metadata => {
  // Ensure path starts with / if not present (defensive)
  const safePath = path.startsWith('/') ? path : `/${path}`
  const pageUrl = absoluteUrl(`/${locale}${safePath}`)

  return {
    title, // Root layout template will add "TetraQuant | "
    description,
    openGraph: {
      title: `TetraQuant | ${title}`,
      description,
      url: pageUrl,
      siteName: 'TetraQuant',
      images,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `TetraQuant | ${title}`,
      description,
      images: images.map(i => i.url),
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl(`/en${safePath}`),
        ru: absoluteUrl(`/ru${safePath}`),
      },
    },
  }
}
