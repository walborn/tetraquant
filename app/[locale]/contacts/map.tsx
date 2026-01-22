'use client'

import { useState } from 'react'

import { Placemark, Map as YMap, YMaps } from '@pbe/react-yandex-maps'
import { useLocale } from 'next-intl'

import { Skeleton } from '@/components/ui/skeleton'

export default () => {
  const locale = useLocale()
  const [isLoaded, setIsLoaded] = useState(false)
  const defaultState = {
    center: [55.69841, 37.358854],
    zoom: 15,
    controls: ['zoomControl', 'fullscreenControl'],
  }

  return (
    <div className="relative h-87.5 w-full overflow-hidden rounded-md">
      {!isLoaded && <Skeleton className="absolute inset-0 z-10 size-full" />}
      <YMaps
        query={{
          lang: locale === 'ru' ? 'ru_RU' : 'en_US',
          apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
        }}
        preload
      >
        <YMap
          defaultState={defaultState}
          height="100%"
          width="100%"
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          onLoad={() => setIsLoaded(true)}
        >
          <Placemark
            geometry={[55.69841, 37.358854]}
            properties={{
              hintContent: 'Skolkovo Institute of Science and Technology',
              balloonContent: 'Skoltech',
            }}
            options={{
              iconLayout: 'default#image',
              iconImageHref: '/assets/contacts/placemark.png',
              iconImageSize: [64, 64],
              iconImageOffset: [-32, -64],
            }}
          />
        </YMap>
      </YMaps>
    </div>
  )
}
