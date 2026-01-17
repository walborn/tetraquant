import Image from 'next/image'

import { FlaskConical, Home, Library, type LucideIcon, Send, Server } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

type Item = {
  title: string
  url: string
  icon: LucideIcon
}

const getTopItems = (t: (key: string) => string): Item[] => [
  {
    title: t('home'),
    url: '/',
    icon: Home,
  },
  {
    title: t('about'),
    url: '/about',
    icon: FlaskConical,
  },
  {
    title: t('products'),
    url: '/products',
    icon: Library,
  },
  {
    title: t('services'),
    url: '/services',
    icon: Server,
  },
  {
    title: t('contacts'),
    url: '/contacts',
    icon: Send,
  },
]

export async function AppSidebar() {
  const t = await getTranslations('entities.navigation')
  const topItems = getTopItems(t)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image
          src="/assets/favicon.png"
          alt="Logo image"
          width={32}
          height={32}
          priority
        />
        <Image
          src="/assets/tetraquant.png"
          alt="Logo image"
          width={100}
          height={32}
          priority
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}
