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

export function SidebarNav({ items }: { items: Item[] }) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map(item => {
        const Icon = Icons[item.icon]
        const isActive = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)

        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
            >
              <Link href={item.url}>
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
