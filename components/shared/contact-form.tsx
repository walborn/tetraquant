'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const t = useTranslations('shared')

  // Client-side submission handler (e.g. to an external API)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Form submission is not available in the static demo.')
  }

  return (
    <form
      className="flex flex-col gap-4 w-full md:w-1/2"
      onSubmit={handleSubmit}
    >
      <Input
        name="name"
        placeholder={t('name')}
      />

      <Input
        name="email"
        placeholder={t('email')}
      />

      <Textarea
        name="message"
        placeholder={t('message')}
      />

      <Button type="submit">{t('send')}</Button>
    </form>
  )
}
