'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FlaskConical, Home, Library, Send, Server } from 'lucide-react'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

const Icons = {
  Home,
  FlaskConical,
  Library,
  Server,
  Send,
}

export type Item = {
  title: string
  url: string
  icon: keyof typeof Icons
}

export function SidebarNav({ items, locale }: { items: Item[]; locale: string }) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map(item => {
        const Icon = Icons[item.icon]
        const href = `/${locale}${item.url === '/' ? '' : item.url}`
        const isActive = pathname === href || (item.url !== '/' && pathname.startsWith(href))

        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
            >
              <Link href={href}>
                <Icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
