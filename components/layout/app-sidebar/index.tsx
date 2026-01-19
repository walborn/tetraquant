import { getLocale, getTranslations } from 'next-intl/server'

import { AppSidebarHeader } from '@/components/layout/app-sidebar/header'
import { AppSidebarItems, type Item } from '@/components/layout/app-sidebar/items'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
} from '@/components/ui/sidebar'

const getItems = (t: (key: string) => string): Item[] => [
  {
    title: t('home'),
    url: '/',
    icon: 'Home',
  },
  {
    title: t('about'),
    url: '/about',
    icon: 'FlaskConical',
  },
  {
    title: t('products'),
    url: '/products',
    icon: 'Library',
  },
  {
    title: t('services'),
    url: '/services',
    icon: 'Server',
  },
  {
    title: t('contacts'),
    url: '/contacts',
    icon: 'Send',
  },
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const locale = await getLocale()
  const t = await getTranslations('entities.navigation')
  const items = getItems(t)

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <AppSidebarItems
              items={items}
              locale={locale}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
