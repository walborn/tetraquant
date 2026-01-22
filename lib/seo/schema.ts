import { absoluteUrl } from './config'

interface BreadcrumbItem {
  name: string
  path: string
}

export const createBreadcrumbSchema = (locale: string, items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(`/${locale}${item.path}`),
    })),
  }
}

export const createContactPageSchema = (locale: string, title: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: title,
    url: absoluteUrl(`/${locale}/contacts`),
    mainEntity: {
      '@type': 'Organization',
      name: 'TetraQuant',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+79164283893',
          email: 'berezkin@tetraquant.com',
          contactType: 'sales',
          availableLanguage: ['en', 'ru'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+79774585153',
          email: 'osipov@tetraquant.com',
          contactType: 'technical support',
          availableLanguage: ['en', 'ru'],
        },
      ],
    },
  }
}

export const createServiceSchema = (
  locale: string,
  service: { title: string; shortDescription: string; image: string; slug: string }
) => {
  return {
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'TetraQuant',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    url: absoluteUrl(`/${locale}/services`),
    image: absoluteUrl(service.image),
  }
}

export const createOrganizationSchema = (locale: string) => {
  const url = absoluteUrl('')
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TetraQuant',
    url,
    logo: absoluteUrl('/tetraquant.png'),
    description: 'Specialized scientific equipment and chemical reagents',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+79164283893',
      contactType: 'sales',
    },
    sameAs: ['https://www.linkedin.com/company/tetraquant'],
  }
}

export const createWebsiteSchema = (locale: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TetraQuant',
    url: absoluteUrl(''),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl(`/${locale}/products?q={search_term_string}`),
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
