'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useLocale } from 'next-intl'

export function AppSidebarHeader() {
  const locale = useLocale()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            asChild
          >
            <Link href={`/${locale}`}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-2">
                <Image
                  className="invert"
                  src="/logo.png"
                  alt="Logo image"
                  width={24}
                  height={24}
                  priority
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <Image
                  src="/tetraquant.png"
                  alt="Logo text"
                  width={100}
                  height={24}
                  priority
                  className="w-fit"
                />
                {/* <span className="truncate font-medium">TetraQuant</span> */}
                {/* <span className="truncate text-xs">Skoltech</span> */}
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
