import Image from 'next/image'

import { getTranslations } from 'next-intl/server'

import { type Item, SidebarNav } from '@/components/layout/sidebar-nav'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
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

export async function AppSidebar() {
  const t = await getTranslations('entities.navigation')
  const items = getItems(t)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='flex gap-2 overflow-hidden p-2'>
            <Image
              src="/assets/favicon.png"
              alt="Logo image"
              width={24}
              height={24}
              priority
            />
            <Image
              src="/assets/tetraquant.png"
              alt="Logo image"
              width={100}
              height={24}
              priority
              className='w-fit'
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarNav items={items} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}
