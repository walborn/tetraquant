'use client'

import { useState } from 'react'

import { Placemark, Map as YMap, YMaps } from '@iminside/react-yandex-maps'

import { Skeleton } from '@/components/ui/skeleton'

export default () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const defaultState = {
    center: [55.69841, 37.358854],
    zoom: 15,
    controls: ['zoomControl', 'fullscreenControl'],
  }

  return (
    <div className="relative h-[350px] w-full overflow-hidden rounded-md">
      {!isLoaded && <Skeleton className="absolute inset-0 z-10 size-full" />}
      <YMaps query={{ lang: 'en_US' }}>
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
