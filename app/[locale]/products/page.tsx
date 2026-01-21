import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TypographyH2 } from '@/components/ui/typography/h2'
import { TypographyList } from '@/components/ui/typography/list'
import { TypographyP } from '@/components/ui/typography/p'
import { TypographyTable } from '@/components/ui/typography/table'
import { AppHeader } from '@/components/utils/app-header'
import { fetchTranslations } from '@/components/utils/fetch-translations'

import { ProductsAccordion } from './accordion'

interface GetProductsProps {
  products: (value: string) => string
  shared: (value: string) => string
}

type Product = {
  key: string
  title: string
  description: React.ReactNode
  params: {
    id: string
    title: string
    description: React.ReactNode
  }[]
  image: string
  price: React.ReactNode
}

const references = {
  Reactor_CR_1B: [
    {
      title:
        'German, S. et al. High-Efficiency Freezing-Induced Loading of Inorganic Nanoparticles and Proteins into Micron- and Submicron-Sized Porous Particles. Sci. Rep. 2018, 8 (1), 17763',
      url: 'https://www.nature.com/articles/s41598-018-35846-x.pdf',
    },
    {
      title:
        'Novoselova, M. et al. Submicron-Sized Nanocomposite Magnetic-Sensitive Carriers: Controllable Organ Distribution and Biological Effects. Polymers (Basel). 2019, 11 (6), 1082',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6630964/pdf/polymers-11-01082.pdf',
    },
    {
      title:
        'Novoselova, M. et al. Focused Ultrasound-Mediated Fluorescence of Composite Microcapsules Loaded with Magnetite Nanoparticles: In Vitro and in Vivo Study. Colloids Surfaces B Biointerfaces 2019, 181 (June), 680–687',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S092777651930431X',
    },
    {
      title:
        'Vostrikova, A. et al. Fabrication and Photoluminescent Properties of Tb3+ Doped Carbon Nanodots. Sci. Rep. 2018, 8 (1), 16301',
      url: 'https://www.nature.com/articles/s41598-018-34683-2',
    },
    {
      title:
        'Mokrousov, M. et al. Amplification of Photoacoustic Effect in Bimodal Polymer Particles by Self-Quenching of Indocyanine Green. Biomed. Opt. Express 2019, 10 (9), 4775',
      url: 'https://www.osapublishing.org/boe/fulltext.cfm?uri=boe-10-9-4775&id=417085',
    },
    {
      title:
        'Kozlova, A. et al. Magnetic Composite Submicron Carriers with Structure-Dependent MRI Contrast. Inorganics 2020, 8 (2), 11',
      url: 'https://www.mdpi.com/2304-6740/8/2/11/htm',
    },
    {
      title:
        'Demina, P. et al. Freezing-Induced Loading of TiO2 into Porous Vaterite Microparticles: Preparation of CaCO3/TiO2 Composites as Templates to Assemble UV-Responsive Microcapsules for Wastewater Treatment. ACS Omega 2020, 5 (8), 4115–4124',
      url: 'https://pubs.acs.org/doi/10.1021/acsomega.9b03819',
    },
    {
      title:
        'German S. et al. Advanced Technique for in situ Raman Spectroscopy Monitoring the Freezing-Induced Loading Process. Langmuir 2021, 37, 4, 1365–1371',
      url: 'https://pubs.acs.org/doi/10.1021/acs.langmuir.0c02593',
    },
    {
      title:
        'Novoselova M. et al. Multifunctional nanostructured drug delivery carriers for cancer therapy: multimodal imaging and ultrasound induced drug release. Colloids and Surfaces B 2021, 200, 111576',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0927776521000205',
    },
  ],
  Rotator_R1: [
    {
      title:
        'German, S. et al. High-Efficiency Freezing-Induced Loading of Inorganic Nanoparticles and Proteins into Micron- and Submicron-Sized Porous Particles. Sci. Rep. 2018, 8 (1), 17763.',
      url: 'https://www.nature.com/articles/s41598-018-35846-x.pdf',
    },
    {
      title:
        'Novoselova, M. et al. Submicron-Sized Nanocomposite Magnetic-Sensitive Carriers: Controllable Organ Distribution and Biological Effects. Polymers (Basel). 2019, 11 (6), 1082.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6630964/pdf/polymers-11-01082.pdf',
    },
    {
      title:
        'Novoselova, M. et al. Focused Ultrasound-Mediated Fluorescence of Composite Microcapsules Loaded with Magnetite Nanoparticles: In Vitro and in Vivo Study. Colloids Surfaces B Biointerfaces 2019, 181 (June), 680–687.',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S092777651930431X',
    },
    {
      title:
        'Vostrikova, A. et al. Fabrication and Photoluminescent Properties of Tb3+ Doped Carbon Nanodots. Sci. Rep. 2018, 8 (1), 16301.',
      url: 'https://www.nature.com/articles/s41598-018-34683-2',
    },
    {
      title:
        'Mokrousov, M. et al. Amplification of Photoacoustic Effect in Bimodal Polymer Particles by Self-Quenching of Indocyanine Green. Biomed. Opt. Express 2019, 10 (9), 4775.',
      url: 'https://www.osapublishing.org/boe/fulltext.cfm?uri=boe-10-9-4775&id=417085',
    },
    {
      title:
        'Kozlova, A. et al. Magnetic Composite Submicron Carriers with Structure-Dependent MRI Contrast. Inorganics 2020, 8 (2), 11.',
      url: 'https://www.mdpi.com/2304-6740/8/2/11/htm',
    },
    {
      title:
        'Demina, P. et al. Freezing-Induced Loading of TiO2 into Porous Vaterite Microparticles: Preparation of CaCO3/TiO2 Composites as Templates to Assemble UV-Responsive Microcapsules for Wastewater Treatment. ACS Omega 2020, 5 (8), 4115–4124.',
      url: 'https://pubs.acs.org/doi/10.1021/acsomega.9b03819',
    },
    {
      title:
        'German S. et al. Advanced Technique for in situ Raman Spectroscopy Monitoring the Freezing-Induced Loading Process. Langmuir 2021, 37, 4, 1365–1371.',
      url: 'https://pubs.acs.org/doi/10.1021/acs.langmuir.0c02593',
    },
    {
      title:
        'Novoselova M. et al. Multifunctional nanostructured drug delivery carriers for cancer therapy: multimodal imaging and ultrasound induced drug release. Colloids and Surfaces B 2021, 200, 111576.',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0927776521000205',
    },
  ],
  CaCO3: [
    {
      title:
        'Yashchenok, A. et al. Nanoplasmonic smooth silica versus porous calcium carbonate bead biosensors for detection of biomarkers. Annalen der Physik Special Issue: Plasmonic Sensors 2012, 524, 723-732.',
      url: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/andp.201200158',
    },
    {
      title:
        'Abalymov, R. et al. Live-Cell Imaging by Confocal Raman and Fluorescence Microscopy Recognizes the Crystal Structure of Calcium Carbonate Particles in HeLa Cells. Biotechnology Journal, 2018, 13 (11), 1800071.',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/biot.201800071',
    },
    {
      title:
        'Parakhonskiy, B. et al. Macromolecule loading into spherical, elliptical, star-like and cubic calcium carbonate carriers. ChemPhysChem. 2014, 15, 2817-2822.',
      url: 'https://chemistry-europe.onlinelibrary.wiley.com/doi/abs/10.1002/cphc.201402136',
    },
    {
      title:
        'Yashchenok, A. et al. Polyelectrolyte multilayer microcapsules templated on spherical, elliptical and square calcium carbonate particles. J. Mater. Chem. B 2013, 1, 1223-1228. Sci. Rep. 2018, 8 (1), 16301.',
      url: 'https://pubs.rsc.org/en/content/articlelanding/2013/tb/c2tb00416j',
    },
  ],
  IronOxide: [
    {
      title:
        'German S. et al. Liposomes loaded with hydrophilic magnetite nanoparticles: Preparation and application as contrast agents for magnetic resonance imaging, Colloids and Surfaces B: Biointerfaces, Volume 135, 2015, 109-115.',
      url: 'https://doi.org/10.1016/j.colsurfb.2015.07.042',
    },
    {
      title:
        'German S. et al. Synthesis of Magnetite Hydrosols in Inert Atmosphere, Colloid Journal, 2013, Vol. 75, No. 4, 534-537.',
      url: 'https://link.springer.com/article/10.1134/S1061933X13040042',
    },
    {
      title:
        'German S. et al. In vitro and in vivo MRI visualization of nanocomposite biodegradable microcapsules with tunable contrast, Phys. Chem. Chem. Phys., 2016, 18, 32238-32246.',
      url: 'https://pubs.rsc.org/en/content/articlelanding/2016/CP/C6CP03895F',
    },
    {
      title:
        'German, S. et al. Synthesis of magnetite hydrosols and assessment of their impact on living systems at the cellular and tissue levels using MRI and morphological investigation. Nanotechnologies in Russia, 2013, Vol. 8, Nos. 7-8, 573-580.',
      url: 'https://link.springer.com/article/10.1134/S1995078013040034',
    },
    {
      title:
        'German, S. et al. High-efficiency freezing-induced loading of inorganic nanoparticles and proteins into micron- and submicron-sized porous particles. Sci. Rep. 2018, 8, 17763.',
      url: 'https://www.nature.com/articles/s41598-018-35846-x',
    },
  ],
}

const getPoducts = ({ products, shared }: GetProductsProps): Product[] => [
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'entities.navigation' })

  return {
    title: t('products'),
  }
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await fetchTranslations({
    products: 'entities.products',
    shared: 'shared',
    navigation: 'entities.navigation',
    email: 'entities.email',
  })

  if (!t) return notFound()

  const products = getPoducts({
    products: t.products,
    shared: t.shared,
  })

  const getSubject = (product: Product) => `${t.email('order')}: ${product.title}`

  const getBody = (product: Product) =>
    `→ ${getSubject(product)}
────────────────────

• ${t.email('name')}: 
• ${t.email('phone')}: 
• ${t.email('quantity')}: 
• ${t.email('company')}: 
• ${t.email('address')}: 
────────────────────

${t.email('message')}: 
`.replace(/\n/g, '%0D%0A')
  return (
    <>
      <AppHeader>{t.navigation('products')}</AppHeader>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map(product => (
          <Card
            key={product.key}
            className="p-4"
          >
            <CardContent className="flex flex-col gap-4">
              <TypographyH2>{product.title}</TypographyH2>
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={259}
                className="w-full h-auto rounded-md"
                priority
              />
              {product.description}
              {Array.isArray(product.params) && (
                <ProductsAccordion
                  values={product.params}
                  defaultValue="characteristics"
                />
              )}
              <div>
                <b>{t.shared('price')}</b>: {product.price}
              </div>

              <a
                href={`mailto:tetraquant@mail.ru?subject=${encodeURIComponent(getSubject(product))}&body=${getBody(product)}`}
              >
                <Button
                  variant="default"
                  className="w-full cursor-pointer capitalize"
                >
                  {t.shared('order')}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  )
}
