'use client'

import * as React from 'react'

import Image from 'next/image'

import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function HomeCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {['/assets/home/0.jpg', '/assets/home/1.jpg', '/assets/home/2.jpg'].map(path => (
          <CarouselItem key={path}>
            <Card className="p-0 overflow-hidden">
              <CardContent className="flex items-center justify-center p-0 m-0">
                <Image
                  src={path}
                  alt={path}
                  width={900}
                  height={510}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
