'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BookOpenText, CirclePile, CookingPot, Landmark, MessageCircleMore } from 'lucide-react'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

const Icons = {
  HomeIcon: Landmark,
  AboutIcon: BookOpenText,
  ProductsIcon: CirclePile,
  ServicesIcon: CookingPot,
  ContactsIcon: MessageCircleMore,
}

export type Item = {
  title: string
  url: string
  icon: keyof typeof Icons
}

export function AppSidebarItems({ items, locale }: { items: Item[]; locale: string }) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map(item => {
        const Icon = Icons[item.icon]
        const href = `/${locale}${item.url}`
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
