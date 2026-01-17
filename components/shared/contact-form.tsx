'use client'

import { useActionState } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { type State, submitContactForm } from '@/lib/actions'

export default function ContactForm() {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(submitContactForm, initialState)

  const t = useTranslations('shared')

  return (
    <form action={formAction}>
      {/* Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 capitalize font-semibold"
        >
          {t('name')}
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              placeholder="Enter your name"
              className="peer block w-full rounded-md borde py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>
          <div
            id="name-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.name?.map((error: string) => (
              <p
                className="mt-2 text-sm text-red-500"
                key={error}
              >
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 capitalize font-semibold"
        >
          {t('email')}
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="email-error"
            />
          </div>
          <div
            id="email-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.email?.map((error: string) => (
              <p
                className="mt-2 text-sm text-red-500"
                key={error}
              >
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Message */}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="mb-2 capitalize font-semibold"
        >
          {t('message')}
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Enter your message"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="message-error"
            />
          </div>
          <div
            id="message-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.name?.map((error: string) => (
              <p
                className="mt-2 text-sm text-red-500"
                key={error}
              >
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button type="submit">{t('send')}</Button>
      </div>
    </form>
  )
}
