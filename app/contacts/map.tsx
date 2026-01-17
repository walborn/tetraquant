'use client'

import { Map, Placemark, YMaps } from '@iminside/react-yandex-maps'

export default () => {
  const defaultState = {
    center: [55.69841, 37.358854],
    zoom: 15,
    controls: ['zoomControl', 'fullscreenControl'],
  }

  return (
    <YMaps query={{ lang: 'en_US' }}>
      <Map
        defaultState={defaultState}
        height="350px"
        modules={['control.ZoomControl', 'control.FullscreenControl']}
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
      </Map>
    </YMaps>
  )
}
