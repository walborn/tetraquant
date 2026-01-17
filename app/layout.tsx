import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { AppSidebar } from '@/components/layout/app-sidebar'
import { LocaleToggle } from '@/components/shared/locale-toggle'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tetraquant',
  description: 'Tetraquant application',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4"
                />
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 max-w-240 m-auto">{children}</div>
            </SidebarInset>
          </SidebarProvider>
          <div className="fixed top-4 right-4">
            <LocaleToggle />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
