import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type Value = {
  id: string
  title: string
  description: React.ReactNode
}
interface Props {
  values: Value[]
  defaultValue?: string
}
export const ProductsAccordion = ({ values, defaultValue }: Props) => (
  <Accordion
    type="single"
    collapsible
    className="w-full"
    defaultValue={defaultValue}
  >
    {values.map(({ id, title, description }) => (
      <AccordionItem
        key={id}
        value={id}
      >
        <AccordionTrigger className="cursor-pointer">{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {description}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)
