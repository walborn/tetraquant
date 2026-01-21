import { TypographyList } from '@/components/ui/typography/list'
import { TypographyP } from '@/components/ui/typography/p'
import { TypographyTable } from '@/components/ui/typography/table'
import type { Product } from '@/lib/definitions'

import references from './references'
import Link from 'next/link'

interface GetProductsProps {
  products: (value: string) => string
  shared: (value: string) => string
}

export const getPoducts = ({ products, shared }: GetProductsProps): Product[] => [
  {
    key: 'Reactor_CR_1B',
    title: products('Reactor_CR_1B.title'),
    description: <TypographyP>{products('Reactor_CR_1B.description')}</TypographyP>,
    params: [
      {
        id: 'reagent_addition_system',
        title: products('Reactor_CR_1B.params.reagent_addition_system.title'),
        description: products('Reactor_CR_1B.params.reagent_addition_system.description'),
      },
      {
        id: 'mechanical_stirrer',
        title: products('Reactor_CR_1B.params.mechanical_stirrer.title'),
        description: products('Reactor_CR_1B.params.mechanical_stirrer.description'),
      },
      {
        id: 'single_replacement_unit',
        title: products('Reactor_CR_1B.params.single_replacement_unit.title'),
        description: products('Reactor_CR_1B.params.single_replacement_unit.description'),
      },
      {
        id: 'characteristics',
        title: products('Reactor_CR_1B.params.characteristics.title'),
        description: (
          <TypographyTable
            keys={['name', 'value']}
            values={[
              {
                id: 'volume',
                name: products('Reactor_CR_1B.params.characteristics.params.volume.name'),
                value: products('Reactor_CR_1B.params.characteristics.params.volume.value'),
              },
              {
                id: 'temperature',
                name: products('Reactor_CR_1B.params.characteristics.params.temperature.name'),
                value: products('Reactor_CR_1B.params.characteristics.params.temperature.value'),
              },
              {
                id: 'stirrer_speed',
                name: products('Reactor_CR_1B.params.characteristics.params.stirrer_speed.name'),
                value: products('Reactor_CR_1B.params.characteristics.params.stirrer_speed.value'),
              },
              {
                id: 'reagent_channels',
                name: products('Reactor_CR_1B.params.characteristics.params.reagent_channels.name'),
                value: products(
                  'Reactor_CR_1B.params.characteristics.params.reagent_channels.value'
                ),
              },
              {
                id: 'inert_atmosphere',
                name: products('Reactor_CR_1B.params.characteristics.params.inert_atmosphere.name'),
                value: products(
                  'Reactor_CR_1B.params.characteristics.params.inert_atmosphere.value'
                ),
              },
              {
                id: 'pressure',
                name: products('Reactor_CR_1B.params.characteristics.params.pressure.name'),
                value: products('Reactor_CR_1B.params.characteristics.params.pressure.value'),
              },
            ]}
          />
        ),
      },
      {
        id: 'references',
        title: products('Reactor_CR_1B.params.references.title'),
        description: (
          <TypographyList
            values={references.Reactor_CR_1B.map(({ title, url }) => ({
              id: url,
              children: (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {title}
                </Link>
              ),
            }))}
            ordered
          />
        ),
      },
    ],
    image: '/assets/products/Reactor_CR_1B.jpg',
    price: <div className="inline-block first-letter:uppercase">{shared('on_request')}</div>,
  },
  {
    key: 'Rotator_R1',
    title: products('Rotator_R1.title'),
    description: <TypographyP>{products('Rotator_R1.description')}</TypographyP>,
    image: '/assets/products/Rotator_R1.jpg',
    params: [
      {
        id: 'applications',
        title: products('Rotator_R1.params.applications.title'),
        description: products('Rotator_R1.params.applications.description'),
      },
      {
        id: 'easy_and_safe',
        title: products('Rotator_R1.params.easy_and_safe.title'),
        description: products('Rotator_R1.params.easy_and_safe.description'),
      },
      {
        id: 'references',
        title: products('Rotator_R1.params.references.title'),
        description: (
          <TypographyList
            values={references.Rotator_R1.map(({ title, url }) => ({
              id: url,
              children: (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {title}
                </Link>
              ),
            }))}
            ordered
          />
        ),
      },
    ],
    price: `20000 ${shared('currency.rub')}`,
  },
  {
    key: 'CaCO3',
    title: products('CaCO3.title'),
    description: <TypographyP>{products('CaCO3.description')}</TypographyP>,
    params: [
      {
        id: 'characteristics',
        title: products('CaCO3.params.characteristics.title'),
        description: (
          <TypographyTable
            keys={['name', 'value']}
            values={[
              {
                id: 'purity',
                name: products('CaCO3.params.characteristics.params.purity.name'),
                value: products('CaCO3.params.characteristics.params.purity.value'),
              },
              {
                id: 'shape',
                name: products('CaCO3.params.characteristics.params.shape.name'),
                value: products('CaCO3.params.characteristics.params.shape.value'),
              },
              {
                id: 'specific_surface',
                name: products('CaCO3.params.characteristics.params.specific_surface.name'),
                value: products('Reactor_CR_1B.params.characteristics.params.stirrer_speed.value'),
              },
            ]}
          />
        ),
      },
      {
        id: 'references',
        title: products('CaCO3.params.references.title'),
        description: (
          <TypographyList
            values={references.CaCO3.map(({ title, url }) => ({
              id: url,
              children: (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {title}
                </Link>
              ),
            }))}
            ordered
          />
        ),
      },
    ],
    image: '/assets/products/CalciumCarbonate.png',
    price: (
      <TypographyList
        values={[
          { id: '1g', children: `1${shared('measures.g')} - 2 500 ${shared('currency.rub')}` },
          { id: '5g', children: `5${shared('measures.g')} - 11 000 ${shared('currency.rub')}` },
          { id: '10g', children: `10${shared('measures.g')} - 15 250 ${shared('currency.rub')}` },
        ]}
      />
    ),
  },
  {
    key: 'IronOxide',
    title: products('IronOxide.title'),
    description: <TypographyP>{products('IronOxide.description')}</TypographyP>,
    params: [
      {
        id: 'characteristics',
        title: products('IronOxide.params.characteristics.title'),
        description: (
          <TypographyTable
            keys={['name', 'value']}
            values={[
              {
                id: 'form',
                name: products('IronOxide.params.characteristics.params.form.name'),
                value: products('IronOxide.params.characteristics.params.form.value'),
              },
              {
                id: 'magnetic_properties',
                name: products('IronOxide.params.characteristics.params.magnetic_properties.name'),
                value: products(
                  'IronOxide.params.characteristics.params.magnetic_properties.value'
                ),
              },
              {
                id: 'stabilizer',
                name: products('IronOxide.params.characteristics.params.stabilizer.name'),
                value: products('IronOxide.params.characteristics.params.stabilizer.value'),
              },
              {
                id: 'average_particle_size',
                name: products(
                  'IronOxide.params.characteristics.params.average_particle_size.name'
                ),
                value: products(
                  'IronOxide.params.characteristics.params.average_particle_size.value'
                ),
              },
              {
                id: 'concentration',
                name: products('IronOxide.params.characteristics.params.concentration.name'),
                value: products('IronOxide.params.characteristics.params.concentration.value'),
              },
            ]}
          />
        ),
      },
      {
        id: 'references',
        title: products('IronOxide.params.references.title'),
        description: (
          <TypographyList
            values={references.IronOxide.map(({ title, url }) => ({
              id: url,
              children: (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {title}
                </Link>
              ),
            }))}
            ordered
          />
        ),
      },
    ],
    image: '/assets/products/IronOxide.png',
    price: (
      <TypographyList
        values={[
          { id: '5ml', children: `5 ${shared('measures.ml')} - 2 500 ${shared('currency.rub')}` },
          {
            id: '25ml',
            children: `25 ${shared('measures.ml')} - 10 500 ${shared('currency.rub')}`,
          },
          {
            id: '50ml',
            children: `50 ${shared('measures.ml')} - 15 000 ${shared('currency.rub')}`,
          },
        ]}
      />
    ),
  },
  {
    key: 'NPsilica',
    title: products('NPsilica.title'),
    description: <TypographyP>{products('NPsilica.description')}</TypographyP>,
    params: [
      {
        id: 'characteristics',
        title: products('NPsilica.params.characteristics.title'),
        description: (
          <TypographyTable
            keys={['name', 'value']}
            values={[
              {
                id: 'form',
                name: products('NPsilica.params.characteristics.params.form.name'),
                value: products('NPsilica.params.characteristics.params.form.value'),
              },
              {
                id: 'magnetic_properties',
                name: products('NPsilica.params.characteristics.params.magnetic_properties.name'),
                value: products('NPsilica.params.characteristics.params.magnetic_properties.value'),
              },
              {
                id: 'stabilizer',
                name: products('NPsilica.params.characteristics.params.stabilizer.name'),
                value: products('NPsilica.params.characteristics.params.stabilizer.value'),
              },
              {
                id: 'average_particle_size',
                name: products('NPsilica.params.characteristics.params.average_particle_size.name'),
                value: products(
                  'NPsilica.params.characteristics.params.average_particle_size.value'
                ),
              },
              {
                id: 'concentration',
                name: products('NPsilica.params.characteristics.params.concentration.name'),
                value: products('NPsilica.params.characteristics.params.concentration.value'),
              },
            ]}
          />
        ),
      },
    ],
    image: '/assets/products/NPsilica.png',
    price: (
      <TypographyList
        values={[
          { id: '1ml', children: `1 ${shared('measures.ml')} - 10 000 ${shared('currency.rub')}` },
          {
            id: '5ml',
            children: `5 ${shared('measures.ml')} - 30 000 ${shared('currency.rub')}`,
          },
        ]}
      />
    ),
  },
]
